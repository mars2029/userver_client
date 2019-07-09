import React from "react";
import EditAccountPresenter from "./EditAccountPresenter";
import { Query, Mutation } from "react-apollo";
import { userProfile, updateProfile, updateProfileVariables } from "../../types/api";
import { USER_PROFILE } from "../../sharedQueries.query";
import { UPDATE_PROFILE } from "./EditAccountQuery.query";
import { toast } from "react-toastify";
import { RouteComponentProps } from "react-router";
import axios from "axios";

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  uploading: boolean;
  file?: boolean;
}
interface IProps extends RouteComponentProps<any> {}

class ProfileQuery extends Query<userProfile> {}

class UpdateProfileMutation extends Mutation<updateProfile, updateProfileVariables> {}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    firstName: "",
    lastName: "",
    email: "",
    profilePhoto: "",
    uploading: false
  };

  public render() {
    const { firstName, lastName, email, profilePhoto, uploading } = this.state;
    // onCompleted 는 기본적으로 서버의 API로부터 데이터를 얻었을 때만 호출이 된다. 즉 캐쉬 값을 체ㅋ
    // fetchPolicy={"cache-and-network"} -> cache를 먼저 확인하고 이게 동작하지 않으면 서버에서 값을 가져온다.
    // fetchPolicy={"cache-only"}    -> 서버에 요청하지 않는다는것.
    // fetchPolicy={"network-only"}  -> 캐쉬를 고려하지 않는다는것. 즉 네트워크로 처리한다는것.
    return (
      <ProfileQuery query={USER_PROFILE} fetchPolicy={"cache-and-network"} onCompleted={this.updateFields}>
        {() => (
          <UpdateProfileMutation
            mutation={UPDATE_PROFILE}
            refetchQueries={[{ query: USER_PROFILE }]}
            onCompleted={data => {
              const { UpdateMyProfile } = data;
              if (UpdateMyProfile.ok) {
                toast.success("Profile updated!");
              } else if (UpdateMyProfile.error) {
                toast.error(UpdateMyProfile.error);
              }
            }}
            variables={{
              email,
              firstName,
              lastName,
              profilePhoto
            }}
          >
            {(updateProfileFn, { loading }) => (
              <EditAccountPresenter
                email={email}
                firstName={firstName}
                lastName={lastName}
                profilePhoto={profilePhoto}
                loading={loading}
                onInputChange={this.onInputChange}
                onSubmit={updateProfileFn}
                uploading={uploading}
              />
            )}
          </UpdateProfileMutation>
        )}
      </ProfileQuery>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = async event => {
    const {
      target: { name, value, files }
    } = event;

    console.log("target", event.target);

    if (files) {
      this.setState({
        uploading: true
      });
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("api_key", "575424371315181");
      formData.append("upload_preset", "oegg4juc");
      formData.append("timestamp", String(Date.now() / 1000));
      const {
        data: { secure_url }
      } = await axios.post("https://api.cloudinary.com/v1_1/dnvet91za/image/upload", formData);

      if (secure_url) {
        this.setState({
          uploading: false,
          profilePhoto: secure_url
        });
      }
    }

    this.setState({
      [name]: value
    } as any);
  };

  public updateFields = (data: {} | userProfile) => {
    console.log("updateFields", data);
    if ("GetMyProfile" in data) {
      const {
        GetMyProfile: { user }
      } = data;
      if (user !== null) {
        const { firstName, lastName, email, profilePhoto } = user;
        this.setState({
          email,
          firstName,
          lastName,
          profilePhoto
        } as any);
      }
    }

    console.log("updateFields2", this.state);
  };
}

export default EditAccountContainer;
