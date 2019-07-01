import React from "react";
import { graphql } from "react-apollo";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries.local";
import { type1Theme } from "../../type1Theme";
import { ThemeProvider } from "styled-components";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

// 하단의 에러가 발생하면 any type을 변수 뒤에다 넣어라.
// Property 'data' is optional in type 'PropsWithChildren<Partial<DataProps<{}, {}>> & Partial<MutateProps<{}, {}>>>' but required in type '{ data: any; }'.  TS2345

//<ThemeProivder > 는 스타일 컴포넌트를 사용하고 type1Theme를 적용시키겠다는 것
// 역할: 메인 index.tsx에서 App의 AppContainer를 호출 하면 Container는 데이터를 가공하고 arg 값을 Presenter로 넘겨준다,
// Presenter는 이를 View 화면으로 가공하고 최종적으로 index.tsx로 리턴한다..
// 이때 router 는 Url을 확인해서 이 페이지가 어디인지를 확인하고 이를 추가적으로 호출하여 값을 가져와 보여주게 된다.
// main 접속시 index.tsx -> appContainer->appPresenter->Router->mainContainer->mainPresenter -> 최종 화면 보여줌

// ?  React.Fragment란???
// 여러개의 엘리먼트를 하나로 그룹화 하는것.
const AppContainer: any = ({ data }) => (
  <React.Fragment>
    <ThemeProvider theme={type1Theme}>
      <AppPresenter isLoggedIn={data.auth.isLoggedIn} />
    </ThemeProvider>
    <ToastContainer draggable={true} position={"bottom-center"} />
  </React.Fragment>
);
//const AppContainer: any = ({ data }) => <div>{JSON.stringify(data)}</div>;

export default graphql(IS_LOGGED_IN)(AppContainer);
