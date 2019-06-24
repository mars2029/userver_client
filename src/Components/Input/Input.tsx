import React from "react";
import styled from "styled-components";

const Container = styled.input`
  border: none;
  border-bottom: 2px solid ${props => props.theme.greyColor};
  font-size: 20px;
  width: 100%;
  padding-bottom: 10px;
  font-weight: 500;
  transition: border-bottom 0.1s linear;
  &:-webkit-autofill {
    box-shadow: 0 0 0px 1000px white inset !important;
  }
  &:focus {
    border-bottom-color: #2c3e50;
    outline: none;
  }
  &::placeholder {
    color: ${props => props.theme.greyColor};
    font-weight: 300;
  }
`;

/*
TEXT INPUT을 위한 폼
// IProps - 인자로 들어올 변수 이름들을 선언해 놓는다. 각종 이벤트들은 Container에 등록 되어 있으며 해당 함수의 obj를 넘겨 주게 된다.
*/
interface IProps {
  placeholder?: string;
  type?: string;
  required?: boolean;
  value: string;
  name?: string;
  onChange: any; // React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) 두개중에 하나가 들어갈 수 있으므로 그냥 any로 작성하였다.
}
const Input: React.SFC<IProps> = ({ placeholder = "", type = "text", required = true, value, name = "", onChange }) => (
  <Container placeholder={placeholder} type={type} required={required} value={value} name={name} onChange={onChange} />
);

export default Input;
