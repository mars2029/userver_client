import React from "react";
import SocialLoginPresenter from "./SocialLoginPresenter";
import { Mutation } from "react-apollo";
import { facebookConnectVariables, facebookConnect } from "../../types/api";
import { FACEBOOK_CONNECT } from "./SocialLoginQueries.query";
import { RouteComponentProps } from "react-router-dom";
import { LOG_USER_IN } from "../../sharedQueries.local";
import { toast } from "react-toastify";

class LoginMutation extends Mutation<facebookConnect, facebookConnectVariables> {}

interface IState {
  firstName: string;
  lastName: string;
  email?: string;
  fbId: string;
}
interface IProps extends RouteComponentProps<any> {}

class SocialLoginContainer extends React.Component<IProps, IState> {
  public state = {
    firstName: "",
    lastName: "",
    email: "",
    fbId: ""
  };

  // 순서 : 0.초기 소스 바인딩 시 facebookMutation 객체 생성 그리고 콜백 함수도 정의 함
  // 1. 로그인 폼에서 클릭시 onClicked 이벤트가 발생/ 2. presenter에서 페이스북에 접근 후 정보를 가져와 미리 선언된 facebookMutation의 Callback 함수에 값을 전달.
  // 3. facebookMutation은 페이스북에서 데이터를 가지고 온 뒤 loginCallback 에서 실행됨. 여기서 회원로그인 정보가 입력 된다.
  // 회원 정보가 존재하면 토큰을 생성하여 리턴하고 존재하지 않으면 DB에 해당 정보를 저장 후 토큰을 리턴한다.
  // 4. Callback 함수 호출 후 리턴된 토큰 값은 onCompleted 를 통해서 값이 리턴 되면 FacebookConnect.token 으로 토큰 값을 가져와 LogUserIn({...}) 를 호출 하게 된다.
  // 5. 여기서 Mutation - LOG_USER_IN을 실행하게 되는데 관련 인자값으로 variables: { token: FacebookConnect.token } 로 값을 넘겨 지게 된다.
  // 6. 그리고 Mutation은 최종적으로 jwt를 생성해서 저장하게 된다

  public facebookMutation;
  public render() {
    return (
      <Mutation mutation={LOG_USER_IN}>
        {logUserIn => (
          <LoginMutation
            mutation={FACEBOOK_CONNECT}
            onCompleted={data => {
              const { FacebookConnect } = data;
              // <LoginMutation/> 이게 실행 되고 해당 결과가 OK 이면 최상단 Mutation을 실행.
              if (FacebookConnect.ok) {
                logUserIn({
                  variables: {
                    token: FacebookConnect.token
                  }
                });
              } else {
                toast.error(FacebookConnect.error);
              }
            }}
          >
            {(facebookMutation, { loading }) => {
              this.facebookMutation = facebookMutation;
              return <SocialLoginPresenter loginCallback={this.loginCallback} />; //1. 페이스북으로부터 데이터 가져온다.
            }}
          </LoginMutation>
        )}
      </Mutation>
    );
  }

  public loginCallback = response => {
    // this.setState({
    //   email: fbData.email
    // });
    //this.mutation();
    // mutation을 component 밖에서 가져오는 방식.
    // 즉 페이스북 갔다가 콜백 함수 호출 되면 그 시점에 미리 선언해 할당해 놓았던 뮤테이션 변수를 실행하게 하여 API가 실행 되게 한다.
    // 기존의 mutation의 경우는 안에 아예 컴포넌트 onSubmit... 들이 선언되어 처리 되었기 때문에 mutation을 밖으로 뺄 필요가 없었다
    // 이 방식은 밖으로 빼는 방식이고 다른방식은 안에 넣는 방식이다.

    const { name, first_name, last_name, email, id, accessToken } = response;
    if (accessToken) {
      toast.success(`Welcome ${name}!`);
      console.log(response);
      //2. Mutation 실행- 서버측... 이 말은 <LoginMutation/> 이게 실행 되었다는 의미
      this.facebookMutation({
        variables: {
          email,
          fbId: id,
          firstName: first_name,
          lastName: last_name
        }
      });
    } else {
      toast.error("Could not log you in 😔");
    }
  };
}

export default SocialLoginContainer;
