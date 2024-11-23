import DashboardLayout from "../../layouts/dashboard-layout";
import MainLayout from "../../layouts/main-layout";
import Dashboard from "../../pages/dashboard/dashboard";
import DraftQuizzes from "../../pages/dashboard/draft-quizzes";
import PublishedQuizzes from "../../pages/dashboard/published-quizzes";
import QuizSet from "../../pages/dashboard/quiz-set";
import QuizSetEntry from "../../pages/dashboard/quiz-set-entry";
import QuizSetLeaderboard from "../../pages/dashboard/quiz-set-leaderboard";
import Leaderboard from "../../pages/main/leaderboard";
import Quiz from "../../pages/main/quiz";
import Result from "../../pages/main/result";
import NotFound from "../../pages/not-found";
import AdminPrivateGuard from "../guard/admin-private-guard";
import UserPrivateGuard from "../guard/user-private-guard";

const privateRoutes = [
  {
    element: (
      <UserPrivateGuard>
        <MainLayout />
      </UserPrivateGuard>
    ),
    errorElement: <NotFound />,
    children: [
      {
        path: "/result/:id",
        element: <Result />,
      },
      {
        path: "/quiz/:id",
        element: <Quiz />,
      },
      {
        path: "/leaderboard/:id",
        element: <Leaderboard />,
      },
    ],
  },
  {
    path: "/dashboard",
    errorElement: <NotFound />,
    element: (
      <AdminPrivateGuard>
        <DashboardLayout />
      </AdminPrivateGuard>
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
      {
        path: "leaderboard/:id",
        element: <QuizSetLeaderboard />,
      },
    ],
  },
];

export default privateRoutes;
