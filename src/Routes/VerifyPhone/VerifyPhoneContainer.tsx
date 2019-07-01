import React from "react";
import { RouteComponentProps } from "react-router-dom";
import VerifyPhonePresenter from "./VerifyPhonePresenter";
import { verifyPhoneVariables, verifyPhone } from "../../types/api";
import { Mutation } from "react-apollo";
import { VERIFY_PHONE } from "./VerifyPhoneQueries.query";
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

    // 하단의 VerifyMutation의 인자로  key는 state에서 오게 돌것이다.
    // 하단의 onCompleted 는 Mutation의 인자 값으로 Complete시 Mutation리턴값으로 쿼리의 성공 실패들을 보여주게 된다.
    // update 는 우리한테 cache를 줄거고 api에서 리턴된 data를 줄것이다.

    // update를 VerifyPhonePresenter에 추가 할 수 도 있다. - 아래 방식
    //  이 방식으로 캐쉬 업데이트 사용이 가능하다.
    //  update={(cache, { data }) => {
    //  cache.writeData({
    //   data: {
    //     auth: {
    //       __typename: "Auth",
    //       isLoggedIn: false
    //     }
    //   }
    // });
    //}

    // 그러나 위 방식은 다른 인터페이스~ 예로 페이스 북 로그인에도 중복 rewrite해 줘야 한다. 그렇기에 우리는 apollo.ts에 resolver들을 다시 사용할 수 있으므로 이 방식은 사용 하지 않는다.
    //
    // 사용방법 2가지
    // 1. 우리 component를 다른 mutation으로 꾸미는것.
    // 2. 다른 Mutation을 추가한다.
    // Mutation위에 Mutation을 하나 더 입혀서 처리를 수행하게 한다. 토큰을 넘겨주는 인자가 필요하므로 <Mutation variables=""~~> 가 되겠지만
    //
    // 상단의 뮤테이션은 로그인
    //logUserIn => () 이 부분은 화살표 함수로 logUserIn을 인자로 받는 함수 이다..
    // 그렇기에 logUserIn이 있던 없던 하단 인자들은 자동으로 동작 할 것이고 두번째 뮤테이션이 컴플릿 되고 data를 리턴하면
    return (
      <VerifyMutation
        mutation={VERIFY_PHONE}
        variables={{ key: verificationKey, phoneNumber: phoneNumber }}
        onCompleted={data => {
          const { CompletePhoneVerification } = data;
          if (CompletePhoneVerification.ok) {
            if (CompletePhoneVerification.token) {
            }
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
