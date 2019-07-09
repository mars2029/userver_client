import React from "react";
import styled from "styled-components";
import Header from "../../Components/Header";
import Helmet from "react-helmet";
import { Link } from "react-router-dom";
import Place from "../../Components/Places";
import { MutationFn } from "react-apollo";
import { userProfile } from "../../types/api";

const Contents = styled.div``;

const GridLink = styled(Link)`
  display: grid;
  grid-template-columns: 80px 4fr;
  grid-gap: 10px;
  margin-bottom: 10px;
`;

const Image = styled.img`
  border-radius: 50%;
  border: 1px solid black;
  width: 80px;
  height: 80px;
`;

const Keys = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;
const Key = styled.div``;

const SLink = styled(Link)`
  text-decoration: underline;
  display: block;
  margin: 20px 0;
`;

const FakeLink = styled.span`
  text-decoration: underline;
  cursor: pointer;
`;

interface IProps {
  logUserOut: MutationFn;
  loading: boolean;
  userData: userProfile | any;
}

const SettingsPresenter: React.SFC<IProps> = ({ loading, userData, logUserOut }) => (
  <Contents>
    <Helmet>
      <title>Settings | Nuber</title>
    </Helmet>
    <Header title={"Setting"} backTo={"/"} />
    <GridLink to={"/edit-account"}>
      {!loading &&
        userData &&
        userData.GetMyProfile &&
        userData.GetMyProfile.user &&
        userData.GetMyProfile.user.profilePhoto &&
        userData.GetMyProfile.user.email &&
        userData.GetMyProfile.user.fullName && (
          <React.Fragment>
            .user
            <Image src={"https://res.cloudinary.com/dnvet91za/image/upload/v1562624032/gl1xnvlroqrqcoyc1avr.jpg"} alt={"user"} />
            <Keys>
              <Key>{userData.GetMyProfile.user.fullName}</Key>
              <Key>{userData.GetMyProfile.user.email}</Key>
            </Keys>
          </React.Fragment>
        )}
    </GridLink>
    <Place fav={false} name={"name"} address={"address"} />
    <Place fav={false} name={"name"} address={"address"} />
    <Place fav={false} name={"name"} address={"address"} />
    <SLink to={"/places"}>Go To Places</SLink>
    <FakeLink onClick={logUserOut as any}>LogOut</FakeLink>
  </Contents>
);

export default SettingsPresenter;
