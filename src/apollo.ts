import ApolloClient, { Operation } from "apollo-boost";

// graphql API 작성
const client = new ApolloClient({
  // request : 매번 누가 mution, query를 보낼때 여기서 가로 채서 수정하고 다시 보내는 역할을 한다.
  // localstorage라는것은 브라우저에 있는 임시 보관 장소이다. 여기에 jwt를 저장하고 header를 꾸며서 보내는 역할을 하는 것이다.
  // redux에서는 fetch, header, token 등을 해야 하는데. 여기서는 한번 설정으로 끝이다.

  // clientState에서 Boolean(localStorage.getItem("jwt"))이라는 부분이 있는데
  // Boolean(localStorage.getItem("jwt")) 이 부분은 localStorage.getItem("jwt") 이 없다면 undefined를 리턴하게 되고 이는 true를 리턴하게 된다.
  // 즉
  // Boolean(localStorage.getItem("jwt")) => 데이터 있으면 true 없으면 false

  // https://blog.naver.com/donggyu_00/221405507751
  // ClientState 는 3가지 인자를 가진다.
  //    - defaults: 사용자가 원하는 데이터를 init 시점에 아폴로 캐쉬에 넣는다,
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
              __typename: "Auth",
              isLoggedIn: false
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
