import React from "react";
import EditAccountPresenter from "./EditAccountPresenter";
import { Query, Mutation } from "react-apollo";
import { userProfile, updateProfile, updateProfileVariables } from "../../types/api";
import { USER_PROFILE } from "../../sharedQueries.query";
import { UPDATE_PROFILE } from "./EditAccountQuery.query";
import { toast } from "react-toastify";
import { RouteComponentProps } from "react-router";

interface IState {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
}
interface IProps extends RouteComponentProps<any> {}

class ProfileQuery extends Query<userProfile> {}

class UpdateProfileMutation extends Mutation<updateProfile, updateProfileVariables> {}

class EditAccountContainer extends React.Component<IProps, IState> {
  public state = {
    firstName: "",
    lastName: "",
    email: "",
    profilePhoto: ""
  };

  public render() {
    const { firstName, lastName, email, profilePhoto } = this.state;
    return (
      <ProfileQuery query={USER_PROFILE} onCompleted={this.updateFields}>
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
              />
            )}
          </UpdateProfileMutation>
        )}
      </ProfileQuery>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;

    this.setState({
      [name]: value
    } as any);
    console.log(this.state);
  };

  public updateFields = (data: {} | userProfile) => {
    console.log(data);
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

    console.log(this.state);
  };
}

export default EditAccountContainer;
