import { useContext } from "react";
import { Link } from "react-router-dom";
import QuizCard from "../../components/dashboard/quiz-card";
import { QuizContext } from "../../context/context";

export default function PublishedQuizzes() {
  const { adminQuizzes } = useContext(QuizContext);

  const publishedQuizzes = adminQuizzes.filter(
    (quiz) => quiz.status === "published"
  );

  return (
    <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8 overflow-y-scroll">
      <div className="md:max-w-[550px]">
        {/* Left Column */}
        <div>
          <Link
            to={"/dashboard"}
            className="inline-flex items-center text-sm text-gray-600 mb-6 hover:text-buzzr-purple"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              ></path>
            </svg>
            Back to home
          </Link>
          <h2 className="text-3xl font-bold py-2">Published Quizzes</h2>
          <p className="pb-6">
            Here you can find all the quizzes that are published. You can view
            them, add questions and draft them.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {publishedQuizzes?.length ? (
          publishedQuizzes?.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} />
          ))
        ) : (
          <div className="col-span-4">
            <h2 className="text-2xl font-semibold text-red-400">
              No published quizzes found
            </h2>
          </div>
        )}
      </div>
    </main>
  );
}
