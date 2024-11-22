import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../context/context";

export default function Header() {
  const { user, authLogout } = useContext(AuthContext);

  // handle logout
  const handleLogout = () => {
    authLogout();
  };

  return (
    <header className="flex justify-between items-center   border container mx-auto h-[62px]">
      <Link to={"/"}>
        <img src="/assets/logo.svg" className="h-7" />
      </Link>
      <ul className="flex gap-2 items-center ul-menu">
        <li>
          <NavLink
            to={"/"}
            className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
            style={{ fontFamily: "Jaro" }}
          >
            Home
          </NavLink>
        </li>

        {user?.id && (
          <>
            {" "}
            <li>
              <NavLink
                to={"/result"}
                className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
                style={{ fontFamily: "Jaro" }}
              >
                Result
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/leaderboard"}
                className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
                style={{ fontFamily: "Jaro" }}
              >
                Leaderboard
              </NavLink>
            </li>
          </>
        )}

        <li>
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
              style={{ fontFamily: "Jaro" }}
            >
              Logout
            </button>
          ) : (
            <NavLink
              to={"/login"}
              className="px-4 py-2 rounded hover:bg-primary hover:text-white transition-colors"
              style={{ fontFamily: "Jaro" }}
            >
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </header>
  );
}
