import React from "react";
import styled from "styled-components";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import PhotoInput from "../../Components/PhotoInput";
import Button from "../../Components/Button";

import Header from "../../Components/Header";
import Helmet from "react-helmet";

const Container = styled.div``;

const ExtendedForm = styled(Form)`
  padding: 0px 40px;
`;

const ExtendedInput = styled(Input)`
  margin-bottom: 30px;
`;

interface IProps {
  firstName: string;
  lastName: string;
  email: string;
  profilePhoto: string;
  onSubmit: any;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  loading: boolean;
  uploading: boolean;
}

const EditAccountPresenter: React.SFC<IProps> = ({ firstName, lastName, email, onSubmit, profilePhoto, onInputChange, loading, uploading }) => (
  <Container>
    <Helmet>
      <title>Edit Account | Number</title>
    </Helmet>
    <Header title={"Edit Account"} backTo={"/"} />
    <ExtendedForm submitFn={onSubmit}>
      <PhotoInput uploading={uploading} fileUrl={profilePhoto} onChange={onInputChange} />
      <ExtendedInput value={firstName} required={true} type={"text"} placeholder={"First Name"} onChange={onInputChange} name={"firstName"} />
      <ExtendedInput value={lastName} type={"text"} placeholder={"Last Name"} onChange={onInputChange} name={"lastName"} />
      <ExtendedInput value={email} type={"email"} placeholder={"Email"} onChange={onInputChange} name={"email"} />
      <Button onClick={null} value={loading ? "Loading" : "Update"} />
    </ExtendedForm>
  </Container>
);

export default EditAccountPresenter;
