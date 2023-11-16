import { useSelector } from "react-redux";
import {
  logOut,
  selectCurrentToken,
  selectCurrentUser,
} from "../features/auth/authSlice";
import axios from "axios";

const Dashboard = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const welcome = user ? `Welcome ${user}!` : "Welcome!";
  const tokenAbbr = `${token.slice(0, 9)}...`;

  const testFunction = async (e: any) => {
    e.preventDefault();

    const token = useSelector(selectCurrentToken);
    try {
      const testResponse = await axios.get("http://localhost:3000/auth/test", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch {
      console.log("error");
    }
  };

  return (
    <>
      <h1>Dashboard</h1>
      <p>{welcome}</p>
      <p>Token: {tokenAbbr}</p>
      <button onClick={logOut}>Log Out</button>
      {/* <button onClick={testFunction}>Test Authorization Header</button> */}
    </>
  );
};

export default Dashboard;
