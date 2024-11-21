import DashboardLayout from "../../layouts/dashboard-layout";
import MainLayout from "../../layouts/main-layout";
import Dashboard from "../../pages/dashboard/dashboard";
import DraftQuizzes from "../../pages/dashboard/draft-quizzes";
import PublishedQuizzes from "../../pages/dashboard/published-quizzes";
import QuizSet from "../../pages/dashboard/quiz-set";
import QuizSetEntry from "../../pages/dashboard/quiz-set-entry";
import Leaderboard from "../../pages/main/leaderboard";
import Quiz from "../../pages/main/quiz";
import Result from "../../pages/main/result";
import NotFound from "../../pages/not-found";
import PrivateGuard from "../guard/private-guard";

const privateRoutes = [
  {
    element: (
      <PrivateGuard>
        <MainLayout />
      </PrivateGuard>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/result",
        element: <Result />,
      },
      {
        path: "/quiz",
        element: <Quiz />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <NotFound />,
    element: (
      <PrivateGuard>
        <DashboardLayout />
      </PrivateGuard>
    ),
    children: [
      {
        path: "",
        element: <Dashboard />,
      },
      {
        path: "quiz-set",
        element: <QuizSet />,
      },
      {
        path: "draft-quizzes",
        element: <DraftQuizzes />,
      },
      {
        path: "published-quizzes",
        element: <PublishedQuizzes />,
      },
      {
        path: "quiz-set-entry/:id",
        element: <QuizSetEntry />,
      },
    ],
  },
];

export default privateRoutes;
