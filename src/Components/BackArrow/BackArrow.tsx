import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  transform: scale(0.8);
`;

interface IProps {
  backTo: string;
  className?: string;
}

// className은 호출되어질때 호출자에게 절대 경로를 알려주기 위해 사용한다. 이게 없으면 extend 불가능하다.
const BackArrow: React.SFC<IProps> = ({ backTo, className }) => (
  <Container className={className}>
    <Link to={backTo}>
      <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
        <path d="M20 .755l-14.374 11.245 14.374 11.219-.619.781-15.381-12 15.391-12 .609.755z" />
      </svg>
    </Link>
  </Container>
);

export default BackArrow;
