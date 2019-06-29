import React from "react";
import Helmet from "react-helmet";
import BackArrow from "../../Components/BackArrow";
import Input from "../../Components/Input";
import countries from "../../countries";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 30px;
  padding: 50px 20px;
`;

// 상단의 BackArrow 컴포넌트를 가져와서 상속받고 추가 css 적용 시킨다.
// 그외 추가 인자(link)는 하단에서 적용되게 된다.
// BackArrow 두번째 인자는 ?로 정의 되어 있어 선언되지 않았다.
// className은 호출되어질때 호출자에게 절대 경로를 알려주기 위해 사용한다. 이게 없으면 extend 불가능하다.

const BackArrowExtended = styled(BackArrow)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const Title = styled.h2`
  font-size: 25px;
  margin-bottom: 40px;
`;

const CountrySelect = styled.select`
  font-size: 20px;
  color: "#2c3e50";
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: white;
  border: 0;
  font-family: "Maven Pro";
  margin-bottom: 20px;
  width: 90%;
`;

const CountryOption = styled.option``;

const Form = styled.form``;

const Button = styled.button`
  box-shadow: 0 18px 35px rgba(50, 50, 93, 0.1), 0 8px 15px rgba(0, 0, 0, 0.07);
  background-color: black;
  color: white;
  padding: 20px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 50px;
  right: 50px;
  cursor: pointer;
`;

// IProps - 인자로 들어올 변수 이름들을 선언해 놓는다. 각종 이벤트들은 Container에 등록 되어 있으며 해당 함수의 obj를 넘겨 주게 된다.
interface IProps {
  countryCode: string;
  phoneNumber: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
}

// Onchange 이벤트는 두군데에서 처리한다.
// Select 문은 단순히 ContrySelect로 이름만 바꾸었기 때문에 문제 없으나.
// Input은 Input.tsx에서 따로 정의 했기 때문에 onChange와 name을 또 등록 해 줘야 한다.
// 1. Select - 현재 소스에  name={"countryCode"} onChange={onInputChange}  입력, IProps에 이벤트 등록
//
// 2. Input Text - 현재소스에   name={"phoneNumber"} onChange={onInputChange}  입력,
const PhoneLoginPresenter: React.SFC<IProps> = ({ countryCode, phoneNumber, onInputChange, onSubmit, loading }) => (
  <Container>
    <Helmet>
      <title>Phone Login | Number</title>
    </Helmet>
    <BackArrowExtended backTo={"/"} />
    <Title>Enter your mobile number</Title>
    <CountrySelect value={countryCode} name={"countryCode"} onChange={onInputChange}>
      {countries.map((country, index) => (
        <CountryOption key={index} value={country.dial_code}>
          {country.flag} {country.name} ({country.dial_code})
        </CountryOption>
      ))}
    </CountrySelect>
    <Form onSubmit={onSubmit}>
      <Input placeholder={"053 690 2129"} value={phoneNumber} name={"phoneNumber"} onChange={onInputChange} />
      <Button>
        {loading ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={"white"}>
            <path d="M13.75 22c0 .966-.783 1.75-1.75 1.75s-1.75-.784-1.75-1.75.783-1.75 1.75-1.75 1.75.784 1.75 1.75zm-1.75-22c-1.104 0-2 .896-2 2s.896 2 2 2 2-.896 2-2-.896-2-2-2zm10 10.75c.689 0 1.249.561 1.249 1.25 0 .69-.56 1.25-1.249 1.25-.69 0-1.249-.559-1.249-1.25 0-.689.559-1.25 1.249-1.25zm-22 1.25c0 1.105.896 2 2 2s2-.895 2-2c0-1.104-.896-2-2-2s-2 .896-2 2zm19-8c.551 0 1 .449 1 1 0 .553-.449 1.002-1 1-.551 0-1-.447-1-.998 0-.553.449-1.002 1-1.002zm0 13.5c.828 0 1.5.672 1.5 1.5s-.672 1.501-1.502 1.5c-.826 0-1.498-.671-1.498-1.499 0-.829.672-1.501 1.5-1.501zm-14-14.5c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2zm0 14c1.104 0 2 .896 2 2s-.896 2-2.001 2c-1.103 0-1.999-.895-1.999-2s.896-2 2-2z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={"white"}>
            <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
          </svg>
        )}
      </Button>
    </Form>
  </Container>
);

export default PhoneLoginPresenter;
