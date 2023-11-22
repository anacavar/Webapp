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
  // const token = useSelector(selectCurrentToken);

  const testFunction = async (e: any) => {
    // const token = useSelector(selectCurrentToken); // ovo je izazvalo errror!!
    try {
      // console.log("jesam");
      const testResponse = await axios.get("http://localhost:3000/auth/test", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(testResponse.data);
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
      <button onClick={testFunction}>Test Authorization Header</button>
    </>
  );
};

export default Dashboard;
