import "./App.css";
import Login from "./Login";
import SignIn from "./SigIn";
import Logout from "./Logout";
import NoteComponent from "./Note";
import Notes from "./Notes";
import { useState } from "react";
import { UserProvider } from "./userContext.tsx";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <UserProvider>
        <Login />
        <SignIn />
        <Logout />
        <button onClick={() => setIsOpen(true)}>Open</button>
        {isOpen && <NoteComponent />}
        <Notes />
      </UserProvider>
    </>
  );
}

export default App;
