import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./userContext";
import { UserContextType } from "./types";

export default function Header() {
  const { user, setUser } = useContext(UserContext) as UserContextType;
  const getInitials = (name: string) => {
    let initials = ''

    if (name) {
      initials = name[0].toUpperCase()
    }

    return initials
  }
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
    <div>
      {user && (
        <div>
          <button onClick={logOut}>Logout</button>
          {user.user.name && (
            <div>
                {getInitials(user.user.name)}
            </div>
          )}
        </div>
      )}
      {!user && (
        <div>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      )}
    </div>
  );
}
