import React from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { Mutation, MutationFn } from "react-apollo";
import { facebookConnectVariables, facebookConnect } from "../../types/api";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries.query";
import { RouteComponentProps } from "react-router-dom";

class LoginMutation extends Mutation<facebookConnect, facebookConnectVariables> {}

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  fbId: string;
}
interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public mutation: MutationFn<facebookConnect, facebookConnectVariables>;
  public render() {
    const { firstName, lastName, email, fbId } = this.state;
    return (
      <LoginMutation
        mutation={FACEBOOK_CONNECT}
        variables={{
          firstName,
          lastName,
          email,
          fbId
        }}
      >
        {(facebookConnect, { loading }) => {
          this.mutation = facebookConnect;
          return <SocialLoginPresenter loginCallback={this.callback} />;
        }}
      </LoginMutation>
    );
  }

  public callback = fbData => {
    this.setState({
      email: fbData.email
    });
    this.mutation();
    // mutation을 component 밖에서 가져오는 방식.
    // 즉 페이스북 갔다가 콜백 함수 호출 되면 그 시점에 미리 선언해 할당해 놓았던 뮤테이션 변수를 실행하게 하여 API가 실행 되게 한다.
    // 기존의 mutation의 경우는 안에 아예 컴포넌트 onSubmit... 들이 선언되어 처리 되었기 때문에 mutation을 밖으로 뺄 필요가 없었다
    // 이 방식은 밖으로 빼는 방식이고 다른방식은 안에 넣는 방식이다.
  };
}

export default SocialLoginContainer;
