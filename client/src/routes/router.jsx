import { createBrowserRouter } from "react-router-dom";
import privateRoutes from "./private/private-route";
import publicRoutes from "./public/public-route";

const router = createBrowserRouter(
  [
    //   {
    //     path: "/",
    //     element: "main lay",
    //         errorElement: <Error />
    //     },

    ...publicRoutes,
    ...privateRoutes,
  ],
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionErrorRevalidation: true,
      v7_fetcherPersist: true,
    },
  }
);

export default router;
