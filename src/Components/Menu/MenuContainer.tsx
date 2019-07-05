import React from "react";
import MenuPresenter from "./MenuPresenter";
import { Query, Mutation } from "react-apollo";
import { userProfile, toggleDriving } from "../../types/api";
import { USER_PROFILE } from "../../sharedQueries.query";
import { TOGGLE_DRIVING } from "./MenuQuery.query";
import { toast } from "react-toastify";

class ProfileQuery extends Query<userProfile> {}

class ToggleDrivingMutation extends Mutation<toggleDriving> {}

// refetchQueries={[{ query: USER_PROFILE }]}   : (두개의 쿼리가 실행됨 :ToggleDriving ,GetMyProfile 그리고 자체에서 캐쉬 덮어씌움  )  클릭 이벤트가 발생하면 Mutation이 실행 되어 진다. 그 후 refetchQueries로 전체 USER_PROFILE 쿼리를 실행해서 업데이트 시킨다.
// update={(cache, { data }) => { ... } : (한개 쿼리가 실행됨 :ToggleDriving 그리고 필요한 캐쉬만 적용시킴  ) 클릭 이벤트가 발생하면 Mutation이 실행 되어 진다. 이후 캐쉬에서 이 값을 가지고 와서 토글 값을 대입하고 캐쉬를 업데이트 시킨다
// 즉 두 차이점은 API에서 Query 결과를 다시 가져오냐.. 아니면 캐쉬 값만 바꿔 적용 시키냐의 차이이다
class MenuContainer extends React.Component {
  public render() {
    return (
      <ToggleDrivingMutation mutation={TOGGLE_DRIVING} refetchQueries={[{ query: USER_PROFILE }]}>
        {(toggleDriving, { loading }) => <ProfileQuery query={USER_PROFILE}>{({ data, loading }) => <MenuPresenter data={data} loading={loading} toggleDriving={toggleDriving} />}</ProfileQuery>}
      </ToggleDrivingMutation>
    );
  }
}

export default MenuContainer;
