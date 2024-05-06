import "./App.css";
import Login from "./Login";
import Notes from "./Notes";
import { UserProvider } from "./userContext.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignUp from "./SignUp.tsx";
import Header from "./Header.tsx";
import { ThemeProvider } from "./ThemeContext.tsx";
import "react-toastify/dist/ReactToastify.css";
function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <ThemeProvider>
        <ToastContainer />
        <Header/>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </ThemeProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
