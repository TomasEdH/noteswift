import "./App.css";
import Login from "./Login";
import Logout from "./Logout";
import Notes from "./Notes";
import { UserProvider } from "./userContext.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignUp from "./SignUp.tsx";
import Header from "./Header.tsx";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <UserProvider>
        <ToastContainer />
        <Header/>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
