import "./App.css";
import Login from "./Login";
import SignIn from "./SigIn";
import Logout from "./Logout";
import { UserProvider } from "./userContext.tsx";

function App() {
  return (
    <>
      <UserProvider>
        <Login />
        <SignIn />
        <Logout/>
      </UserProvider>
    </>
  );
}

export default App;
