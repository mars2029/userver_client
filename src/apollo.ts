import ApolloClient, { Operation } from "apollo-boost";

// graphql API 작성  2.4 확인할것.
const client = new ApolloClient({
  //  request: async (operation: Operation) => { : 매번 누가 mution, query를 보낼때 여기서 가로 채서 수정하고 다시 보내는 역할을 한다.
  // 여기서는 헤더에 x-jwt를 추가해서 보내는 역할을 한다.
  // 그러므로 프로그램상에서 매번 query나 mutation을 가로챌때 localstorage에서 값을 가져온다.  (localstorage라는것은 브라우저에 있는 임시 보관 장소이다.)
  // 그리고 jwt 토큰을 가져오는데 (localStorage.getItem("jwt")) 없으면 공백으로 넣는다.  ( -redux에서는 fetch, header, token 등을 해야 하는데. 여기서는 한번 설정으로 끝이다.)

  // clientState에서 Boolean(localStorage.getItem("jwt"))이라는 부분이 있는데
  // Boolean(localStorage.getItem("jwt")) 이 부분은 localStorage.getItem("jwt") 이 없다면 undefined를 리턴하게 되고 이는 true를 리턴하게 된다.
  // 즉
  // Boolean(localStorage.getItem("jwt")) => 데이터 있으면 true 없으면 false

  // https://blog.naver.com/donggyu_00/221405507751
  // ClientState : Language를 가질수 있다, currency를 바꿀수 있다. 그리고 원하는 모든것을 가질 수 있다.
  // ClientState 는 3가지 인자를 가진다.
  //    - defaults: 사용자가 원하는 데이터를 init 시점에 아폴로 캐쉬에 넣는다/ 기본값 -
  //                설명 : isLoggedIn: Boolean(localStorage.getItem("jwt")) - jwt가 존재하지 않으면 Boolean에 의해 false, 존재하면 true가 리턴된다.
  //    - resolvers: GraphQL Query, mutation들이 cache 데이터들을 읽고 쓰기위해 부르는 함수들이다.  (obj, args, context, info) => result 형식
  //    - typeDefs : 아직 모름

  clientState: {
    defaults: {
      auth: {
        __typename: "Auth",
        isLoggedIn: Boolean(localStorage.getItem("jwt"))
      }
    },
    resolvers: {
      Mutation: {
        logUserIn: (_, { token }, { cache }) => {
          localStorage.setItem("jwt", token);
          cache.writeData({
            data: {
              auth: {
                __typename: "Auth",
                isLoggedIn: true
              }
            }
          });
          return null;
        },
        logUserOut: (_, __, { cache }) => {
          localStorage.removeItem("jwt");
          cache.writeData({
            data: {
              auth: {
                __typename: "Auth",
                isLoggedIn: false
              }
            }
          });
          return null;
        }
      }
    }
  },
  request: async (operation: Operation) => {
    operation.setContext({
      headers: {
        "X-JWT": localStorage.getItem("jwt") || ""
      }
    });
  },
  uri: "http://localhost:4000/graphql"
});

export default client;
