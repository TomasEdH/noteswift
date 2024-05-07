import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../userContext";
import { UserContextType } from "../types";
import { FaSquarespace } from "react-icons/fa6";
import { FiMoon } from "react-icons/fi";
import { FiSun } from "react-icons/fi";
import { ThemeContext } from "../ThemeContext";

export default function Header() {
  const { user, setUser } = useContext(UserContext) as UserContextType;
  const { theme, toggleTheme } = useContext(ThemeContext);

  useEffect(() => {
    if (theme === "dark") {
      document.querySelector("html")?.classList.add("dark");
    } else {
      document.querySelector("html")?.classList.remove("dark");
    }
  }, [theme]);

  console.log(user);

  const getInitials = (name: string) => {
    let initials = "";

    if (name) {
      initials = name[0].toUpperCase();
    }

    return initials;
  };

  const capitalize = (name: string) => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  const COOKIE_EXPIRED =
    "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";

  const logOut = () => {
    fetch("http://localhost:1235/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        document.cookie = COOKIE_EXPIRED;
        window.location.reload();
        setUser(null);
        console.log(data);
      });
  };

  return (
    <div className="pt-10 flex justify-around">
      <div className="flex items-center gap-x-2">
        <FaSquarespace size={30} />
        <h2 className="text-3xl font-medium mb-0.5">Note<span className="text-primary">s</span>wift</h2>
      </div>
      <div className="flex items-center gap-x-5">
        <button onClick={toggleTheme}>
          {theme === "light" ? <FiMoon size={20} /> : <FiSun size={20} />}
        </button>
        {user?.user && (
          <div className="flex items-center gap-x-3">
            <div className="flex uppercase text-xl font-medium items-center justify-center w-10 h-10 rounded-full bg-primary">
              {getInitials(user.user.name)}
            </div>
            {user.user?.name ? (
              <div>
                <p className="font-medium">
                  Welcome, {capitalize(user.user.name)}
                </p>
                <button className="hover:underline " onClick={logOut}>
                  Logout
                </button>
              </div>
            ) : null}
          </div>
        )}
        {!user?.user && (
          <div>
            <Link
              to="/login"
              className="dark:text-white bg-primary/85 hover:bg-primary focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="dark:text-white bg-primary/85 hover:bg-primary focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
