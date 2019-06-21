import React from "react";
import ReactDOM from "react-dom";
import App from "./Components/App";
import { ApolloProvider } from "react-apollo";
import client from "./apollo";
import GlobalStyles from "./global-styles";

//<ThemeProivder > 는 스타일 컴포넌트를 사용하고 type1Theme를 적용시키겠다는 것
// 역할: 메인 index.tsx에서 App의 AppContainer를 호출 하면 Container는 데이터를 가공하고 arg 값을 Presenter로 넘겨준다,
// Presenter는 이를 View 화면으로 가공하고 최종적으로 index.tsx로 리턴한다..
// 이때 router 는 Url을 확인해서 이 페이지가 어디인지를 확인하고 이를 추가적으로 호출하여 값을 가져와 보여주게 된다.
// main 접속시 index.tsx -> appContainer->appPresenter->Router->mainContainer->mainPresenter -> 최종 화면 보여줌

ReactDOM.render(
  <ApolloProvider client={client}>
    <>
      <App />
      <GlobalStyles />
    </>
  </ApolloProvider>,
  document.getElementById("root") as HTMLElement
);
