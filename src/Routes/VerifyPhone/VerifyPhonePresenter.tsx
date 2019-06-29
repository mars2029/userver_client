import React from "react";
import { MutationFn } from "react-apollo";
import Helmet from "react-helmet";
import Button from "../../Components/Button";
import Form from "../../Components/Form";
import Header from "../../Components/Header";
import Input from "../../Components/Input";
import styled from "styled-components";
import { verifyPhone, verifyPhoneVariables } from "../../types/api";

const Container = styled.div``;

// 기존 Component Form을 확장하여 사용하게 한다.
// 기존에는 const Title = styled.span`` 이런 형식으로 했었다. 그러나 기존 Form을 확장 하는 경우 이므로  const ExtendedForm = styled(Form)``  이와 같이 사용한다.
const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 20px;
`;

interface IProps {
  verificationKey: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: MutationFn<verifyPhone, verifyPhoneVariables>;
  loading: boolean;
}

const VerifyPhonePresenter: React.SFC<IProps> = ({ verificationKey, onChange, onSubmit, loading }) => (
  <Container>
    <Helmet>
      <title>Verify Phone | Number</title>
    </Helmet>
    <Header backTo={"/phone-login"} title={"Verify Phone Number"} />
    <ExtendedForm submitFn={onSubmit}>
      <ExtendedInput value={verificationKey} placeholder={"Enter Verification Code"} onChange={onChange} name={"verificationKey"} />
      <Button disabled={loading} value={loading ? "Verifying" : "Submit"} onClick={null} />
    </ExtendedForm>
  </Container>
);

export default VerifyPhonePresenter;
