import React from "react";
import PropTypes from "prop-types";
// 이것은 Prop가 멍청해지는 것을 막기 위해 사용한다.
//예로 하단의 AppPresenter는 인자를 받아야 하는데 인자를 안줄경우 에러가 발생된다.
// 그러나 이것을 선언하지 않으면 모른다. 왜냐면 필요하다는것을 가르쳐 주지 않기 때문이다.

// isLoggedIn은 true, false만 리턴해야 한다. any가 아니므로 아래의 인터페이스를 지정한다.
interface IProps {
  isLoggedIn: boolean;
}

//SFC는 stateless functional component로 isLoggedIn 값은 boolean이 되게 된다.
const AppPresenter: React.SFC<IProps> = ({ isLoggedIn }) => (isLoggedIn ? <span>you are in</span> : <span>your are out</span>);

AppPresenter.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired
};

export default AppPresenter;
