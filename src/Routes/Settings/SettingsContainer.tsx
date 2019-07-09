import React from "react";
import SettingsPresenter from "./SettingsPresenter";
import { Mutation, Query } from "react-apollo";
import { LOG_USER_OUT } from "../../sharedQueries.local";
import { USER_PROFILE } from "../../sharedQueries.query";
import { userProfile } from "../../types/api";

class MiniProfileQuery extends Query<userProfile> {}

class SettingsContainer extends React.Component {
  public render() {
    return (
      <Mutation mutation={LOG_USER_OUT} onCompleted={this.onComp}>
        {logUserOut => <MiniProfileQuery query={USER_PROFILE}>{({ data, loading }) => <SettingsPresenter loading={loading} userData={data} logUserOut={logUserOut} />}</MiniProfileQuery>}
      </Mutation>
    );
  }

  public onComp() {
    console.log("compelete User_Out");
  }
}

export default SettingsContainer;
