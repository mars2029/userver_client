import React from "react";
import { RouteComponentProps } from "react-router-dom";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { verifyPhoneVariables, verifyPhone } from "../../types/api";
import { Mutation } from "react-apollo";
import { VERIFY_PHONE } from "./VerifyPhoneQueries.local";
import { toast } from "react-toastify";

interface IState {
  verificationKey: string;
  phoneNumber: string;
}
interface IProps extends RouteComponentProps<any> {}

class VerifyMutation extends Mutation<verifyPhone, verifyPhoneVariables> {}

class VerifyPhoneContainer extends React.Component<IProps, IState> {
  // state를 이렇게 사용하지 않고 constructor 안에서 사용하게 한다.
  // public state = {
  //   key: "",
  //   phoneNumber:""
  //  };

  constructor(props: IProps) {
    super(props);

    if (!props.location.state) {
      props.history.push("/");
    }
    console.log("VPCon1", this.state);
    this.state = {
      verificationKey: "",
      phoneNumber: props.location.state.phone
    };

    console.log("VPCon2", this.state);
  }
  public render() {
    // Mutation의 Children으로 Component를 인자로 보낼 수 없다. Function을 넘겨야 한다.
    // Function에는 3가지 인자가 있는데 첫번째는 name, 두번째 인자는 Loading이다.
    //
    // Mutation할때마다 이 쿼리는 내 Background에 하단 컴포넌트 함수를 보내게 된다.
    // Mutation 함수 안에 onSubmit 이벤트를 입력 한 이유는????
    // 밖에서 처리가 가능하다 - 그런데 사용 한 이유는 무엇인가?
    // Mutation이 실행할때 OnSubmit도 체크 하고 싶었기 때문이다.

    // 괄호는 리턴을 자동적으로 한다.

    const { verificationKey, phoneNumber } = this.state;

    return (
      <VerifyMutation
        mutation={VERIFY_PHONE}
        variables={{ key: verificationKey, phoneNumber: phoneNumber }}
        onCompleted={data => {
          const { CompletePhoneVerification } = data;
          if (CompletePhoneVerification.ok) {
            toast.success("You're verified, loggin in now");
          } else {
            toast.error(CompletePhoneVerification.error);
          }
        }}
      >
        {(mutation, { loading }) => <VerifyPhonePresenter onSubmit={mutation} onChange={this.onInputChange} verificationKey={verificationKey} loading={loading} />}
      </VerifyMutation>
    );
  }

  public onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default VerifyPhoneContainer;
