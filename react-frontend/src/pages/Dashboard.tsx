import { useSelector } from "react-redux";
import {
  logOut,
  selectCurrentToken,
  selectCurrentUser,
} from "../features/auth/authSlice";
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const welcome = user ? `Welcome ${user}!` : "Welcome!";
  const tokenAbbr = `${token.slice(0, 9)}...`;
  const dispatch = useDispatch();

  function test() {
    dispatch(logOut());
  }

  return (
    <>
      <h1>Dashboard</h1>
      <p>{welcome}</p>
      <p>Token: {tokenAbbr}</p>
      <button onClick={test}>Log Out</button>
    </>
  );
};

export default Dashboard;
