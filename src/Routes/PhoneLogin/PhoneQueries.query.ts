import { gql } from "apollo-boost";

//쿼리 전송
export const PHONE_SIGN_IN = gql`
  mutation startPoneVerification($phoneNumber: String!) {
    StartPhoneVerification(phoneNumber: $phoneNumber) {
      ok
      error
    }
  }
`;
