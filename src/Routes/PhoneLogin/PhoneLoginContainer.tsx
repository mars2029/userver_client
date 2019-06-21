import React from "react";
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { RouteComponentProps } from "react-router-dom";

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

    return <PhoneLoginPresenter countryCode={countryCode} phoneNumber={phoneNumber} />;
  }
}

export default PhoneLoginContainer;
