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

interface IProps {
  countryCode: string;
  phoneNumber: string;
}

// countries는
const PhoneLoginPresenter: React.SFC<IProps> = ({ countryCode, phoneNumber }) => (
  <Container>
    <Helmet>
      <title>Phone Login | Number</title>
    </Helmet>
    <BackArrowExtended backTo={"/"} />
    <Title>Enter your mobile number</Title>
    <CountrySelect value={countryCode}>
      {countries.map((country, index) => (
        <CountryOption key={index} value={country.dial_code}>
          {country.flag} {country.name} ({country.dial_code})
        </CountryOption>
      ))}
    </CountrySelect>
    <Form>
      <Input placeholder={"053 690 2129"} value={phoneNumber} />
      <Button>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={"white"}>
          <path d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z" />
        </svg>
      </Button>
    </Form>
  </Container>
);

export default PhoneLoginPresenter;
