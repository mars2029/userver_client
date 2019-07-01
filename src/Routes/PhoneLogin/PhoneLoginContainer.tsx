import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { Mutation } from "react-apollo";
import { PHONE_SIGN_IN } from "./PhoneQueries.query";
import { startPoneVerification, startPoneVerificationVariables } from "../../types/api";
// P: props, S: state, SS: ANY
// 로그인 페이지이므로 any props가 없다고 여겨지므로 안에는 아무것도 없다.
interface IProps extends RouteComponentProps<any> {}
interface IState {
  countryCode: string;
  phoneNumber: string;
}
//startPoneVerification는 뮤테이션 실행 후 리턴해 오는 데이터, startPoneVerificationVariables는 인자들
class PhoneSignInMutation extends Mutation<startPoneVerification, startPoneVerificationVariables> {}

class PhoneLoginContainer extends React.Component<IProps, IState> {
  public state = {
    countryCode: "+82",
    phoneNumber: "1234565"
  };
  public render() {
    //console.log(this.state.countryCode);
    const { countryCode, phoneNumber } = this.state;
    const { history } = this.props;

    console.log("PL", this.props);
    console.log("PL - history", history);
    //  update={this.afterSubmit}   => onCompleted로 변경됨.
    return (
      <PhoneSignInMutation
        mutation={PHONE_SIGN_IN}
        variables={{ phoneNumber: `${countryCode}${phoneNumber}` }}
        onCompleted={data => {
          const { StartPhoneVerification } = data;
          const phone = `${countryCode}${phoneNumber}`;
          // 리턴 값이 True 이면 ok 아니면 에러를 보여주게 한다.
          // 리턴값은 mutation 실행시 서버에서 메시지를 보내기 때문에 보내고 난 후 ok가 보내지면 history를 넣고 redirect를 하는것이다.
          if (StartPhoneVerification.ok) {
            toast.success("SMS Sent! redirecting you...");

            setTimeout(() => {
              history.push({
                pathname: "/verify-phone",
                state: {
                  phone
                }
              });
            }, 2000);
          } else {
            toast.error(StartPhoneVerification.error);
          }
        }}
      >
        {// Mutation의 Children으로 Component를 인자로 보낼 수 없다. Function을 넘겨야 한다.
        // Function에는 3가지 인자가 있는데 첫번째는 name, 두번째 인자는 Loading이다.
        //
        // Mutation할때마다 이 쿼리는 내 Background에 하단 컴포넌트 함수를 보내게 된다.
        // Mutation 함수 안에 onSubmit 이벤트를 입력 한 이유는????
        // 밖에서 처리가 가능하다 - 그런데 사용 한 이유는 무엇인가?
        // Mutation이 실행할때 OnSubmit도 체크 하고 싶었기 때문이다.
        // 그냥 함수에 인자값을 넣은 것이다.
        (mutation, { loading }) => {
          const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
            event.preventDefault();

            const phone = `${countryCode}${phoneNumber}`;
            // 패턴이 일치하는지 test로 체크가 가능하다.
            const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(phone);

            // 폰 번호가 유효하면 하단의 Mutation 함수가 실행 될 것이다.
            if (isValid) {
              mutation();
            } else {
              toast.error("Please write a valid phone number!");
            }
          };

          return <PhoneLoginPresenter countryCode={countryCode} phoneNumber={phoneNumber} onInputChange={this.onInputChange} onSubmit={onSubmit} loading={loading} />;
        }}
      </PhoneSignInMutation>
    );
  }

  // select 와 input을 위한 element 부분
  //[name] 부분에는 target:{name} 부분이 처리가 되기 때문에  Input Element or SelectElement가 들어가게 된다.
  // 그리고 변경 이벤트가 발생 될 경우 state를 변경하게 된다.
  public onInputChange: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement> = event => {
    const {
      target: { name, value }
    } = event;
    //해당 이벤트의 이름과 값을 넘길 것이다.
    //console.log(name);
    //console.log(value);

    this.setState({
      [name]: value
    } as any);

    // 해당 State를 볼 수 있다.
    //console.log("state", this.state);
  };

  // 상단에서 onsubmit을 체크 하므로 패스한다.
  // public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
  //   event.preventDefault();
  //   const { countryCode, phoneNumber } = this.state;
  //   console.log(countryCode, phoneNumber);

  //   // 패턴이 일치하는지 test로 체크가 가능하다.
  //   const isValid = /^\+[1-9]{1}[0-0]{7,11}$/.test(`${countryCode}${phoneNumber}`);

  //   if (isValid) {
  //     return;
  //   } else {
  //     toast.error("Please write a valid phone number!");
  //   }
  // };

  // MutationUpdate 시 처리가 가능하다..
  // public afterSubmit: MutationUpdaterFn = (cache, result: any) => {
  //   const data: startPoneVerification = result.data;
  //   const { StartPhoneVerification } = data;

  //   // 리턴 값이 True 이면 ok 아니면 에러를 보여주게 한다.
  //   if (StartPhoneVerification.ok) {
  //     console.log(data);
  //     return;
  //   } else {
  //     toast.error(StartPhoneVerification.error);
  //   }
  // };
}

export default PhoneLoginContainer;
