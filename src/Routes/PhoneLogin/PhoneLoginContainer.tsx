import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
// P: props, S: state, SS: ANY
// 로그인 페이지이므로 any props가 없다고 여겨지므로 안에는 아무것도 없다.
interface IProps extends RouteComponentProps<any> {}
interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhoneLoginContainer extends React.Component<IProps, IState> {
  public state = {
    countryCode: "+82",
    phoneNumber: "12345"
  };
  public render() {
    //console.log(this.state.countryCode);
    const { countryCode, phoneNumber } = this.state;

    return <PhoneLoginPresenter countryCode={countryCode} phoneNumber={phoneNumber} onInputChange={this.onInputChange} onSubmit={this.onSubmit} />;
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

  public onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
    event.preventDefault();
    const { countryCode, phoneNumber } = this.state;
    console.log(countryCode, phoneNumber);

    // 패턴이 일치하는지 test로 체크가 가능하다.
    const isValid = /^\+[1-9]{1}[0-0]{7,11}$/.test(`${countryCode}${phoneNumber}`);

    if (isValid) {
      return;
    } else {
      toast.error("Please write a valid phone number!");
    }
  };
}

export default PhoneLoginContainer;
