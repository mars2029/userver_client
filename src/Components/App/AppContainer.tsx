import React from "react";
import { graphql } from "react-apollo";
import AppPresenter from "./AppPresenter";
import { IS_LOGGED_IN } from "./AppQueries";

// 하단의 에러가 발생하면 any type을 변수 뒤에다 넣어라.
// Property 'data' is optional in type 'PropsWithChildren<Partial<DataProps<{}, {}>> & Partial<MutateProps<{}, {}>>>' but required in type '{ data: any; }'.  TS2345

const AppContainer: any = ({ data }) => <AppPresenter isLoggedIn={data.auth.isLoggedIn} />;

//const AppContainer: any = ({ data }) => <div>{JSON.stringify(data)}</div>;

export default graphql(IS_LOGGED_IN)(AppContainer);
