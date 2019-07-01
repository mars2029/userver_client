import { gql } from "apollo-boost";

//@client means it doesn't send result to api but sends to cache
// 클라이언트의 local state에서 가져오고 있으므로 @client 를 꼭 붙여주어야 한다고 한다.
// 해당 auth는 온라인 API에 있지 않고 로컬에 있는 auth를 의미한다. 그러므로 @client를 붙여줘야 한다. 아니면 온라인 API를 검색하게 된다.

export const IS_LOGGED_IN = gql`
  {
    auth {
      isLoggedIn @client
    }
  }
`;
