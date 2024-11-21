import MainLayout from "../../layouts/main-layout";
import Home from "../../pages/main/home";
import Login from "../../pages/main/login";
import Registration from "../../pages/main/registration";
import NotFound from "../../pages/not-found";
import PublicGuard from "../guard/public-guard";

const publicRoutes = [
  {
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <PublicGuard>
            <Login />,
          </PublicGuard>
        ),
      },
      {
        path: "/registration",
        element: (
          <PublicGuard>
            <Registration />,
          </PublicGuard>
        ),
      },
    ],
  },
];

export default publicRoutes;
