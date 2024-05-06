import "./App.css";
import Login from "./Login";
import Notes from "./Notes";
import { UserProvider } from "./userContext.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import SignUp from "./SignUp.tsx";
import Header from "./Header.tsx";
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [theme, setTheme] = useState<string>("light");

  const handleChangeTheme = () => {
    setTheme((prevTheme: string) => prevTheme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector('html')?.classList.add("dark");
    }
    else {
      document.querySelector('html')?.classList.remove("dark");
    }
  }, [theme]);

  return (
    <BrowserRouter>
      <UserProvider>
        <ToastContainer />
        <Header changeTheme={handleChangeTheme} theme={theme} />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/notes" element={<Notes />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
