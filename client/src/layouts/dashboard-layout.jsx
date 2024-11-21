import { Link, NavLink, Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout() {
  const { pathname } = useLocation();

  return (
    <div className="bg-gray-100 overflow-hidden h-screen flex">
      <aside className="hidden md:w-64 bg-primary p-6 md:flex flex-col min-w-[260px]">
        <div className="mb-10">
          <Link to={"/"}>
            <img src="../assets/logo-white.svg" className="h-7" />{" "}
          </Link>
        </div>
        <nav className="flex-grow dashboard-menu overflow-y-scroll">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className={`block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary ${
                  pathname === "/dashboard" ? "active" : ""
                }`}
              >
                Dashboard
              </Link>
            </li>

            <li>
              <NavLink
                to={"/dashboard/draft-quizzes"}
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Draft Quizzes
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/published-quizzes"}
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Published Quizzes
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/dashboard/quiz-set-entry"}
                className="block py-2 px-4 rounded-lg text-gray-100 hover:bg-gray-100 hover:text-primary"
              >
                Leaderboard
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="mt-auto flex items-center">
          <img
            src="../assets/avater.webp"
            alt="Mr Hasan"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <span className="text-white font-semibold">Saad Hasan</span>
        </div>
      </aside>
      <Outlet />
    </div>
  );
}
