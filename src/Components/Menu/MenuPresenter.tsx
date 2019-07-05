import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { userProfile, toggleDriving } from "../../types/api";
import { MutationFn } from "react-apollo";

const Container = styled.div`
  height: 100%;
`;

const Header = styled.div`
  background-color: black;
  height: 20%;
  margin-bottom: 30px;
  padding: 0 15px;
  color: white;
`;

const SLink = styled(Link)`
  font-size: 22px;
  display: block;
  margin-left: 15px;
  margin-bottom: 25px;
  font-weight: 400;
`;

const Image = styled.img`
  height: 80px;
  width: 80px;
  background-color: grey;
  border-radius: 40px;
  overflow: hidden;
`;

const Name = styled.h2`
  font-size: 22px;
  color: white;
  margin-bottom: 10px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Rating = styled.h5`
  font-size: 18px;
  color: white;
`;

const Text = styled.span`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-gap: 10px;
  height: 100%;
  align-items: center;
`;

interface IToggleProps {
  isDriving: boolean;
}

// 하단에서 ToggleDriving이라는 컴포넌트가 있고 이를 통해 값을 전달한다. 이때 props를 사용하게 된다.
const ToggleDriving = styled<any>("button")`
  -webkit-appearance: none;
  background-color: ${props => (props.isDriving ? props.theme.yellowColor : props.theme.greenColor)};
  width: 100%;
  color: white;
  font-size: 18px;
  border: 0;
  padding: 15px 0px;
  cursor: pointer;
`;

interface IProps {
  data?: userProfile;
  loading: boolean;
  toggleDriving: MutationFn<toggleDriving>;
}

const MenuPresenter: React.SFC<IProps> = ({ data, loading, toggleDriving }) => (
  <Container>
    {!loading && data && data.GetMyProfile.user && data.GetMyProfile.user.fullName && (
      <React.Fragment>
        <Header>
          <Grid>
            <Link to={"/edit-account"}>
              <Image src={data.GetMyProfile.user.profilePhoto || "https://lh3.googleusercontent.com/-CTwXMuZRaWw/AAAAAAAAAAI/AAAAAAAAAUg/8T5nFuIdnHE/photo.jpg"} />
            </Link>
            <Text>
              <Name>{data.GetMyProfile.user.fullName}</Name>
              <Rating>4.5</Rating>
            </Text>
          </Grid>
        </Header>
        <SLink to="/trips">Your Trips</SLink>
        <SLink to="/settings">Settings</SLink>
        <ToggleDriving isDriving={data.GetMyProfile.user.isDriving} onClick={toggleDriving}>
          {data.GetMyProfile.user.isDriving ? "Stop driving" : "Start driving"}
        </ToggleDriving>
      </React.Fragment>
    )}
  </Container>
);

export default MenuPresenter;
