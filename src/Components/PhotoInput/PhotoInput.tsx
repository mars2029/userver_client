import React from "react";
import styled from "styled-components";

const Container = styled.div``;

//레이블 안에 이미지를 넣는 이유 : 로딩시 파일이미지가 공백이 발생하여 깜빡이게 되는데 이를 막기 위해 넣는다
const Image = styled.label`
  cursor: pointer;
  border: 4px solid black;
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  & img {
    width: 80px;
    height: 80px;
  }
`;

const Input = styled.input`
  color: white;
  opacity: 0;
  height: 1px;
  &:focus {
    outline: none;
  }
`;

interface IProps {
  uploading: boolean;
  fileUrl: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const PhotoInput: React.SFC<IProps> = ({ uploading, fileUrl, onChange }) => {
  console.log("uploading", uploading);

  return (
    <Container>
      <Input id={"photo"} type="file" accept="image/*" onChange={onChange} />
      <Image htmlFor="photo">
        {uploading && "⏰"}
        {!uploading && <img src={fileUrl} alt={"user"} />}
      </Image>
    </Container>
  );
};

export default PhotoInput;
