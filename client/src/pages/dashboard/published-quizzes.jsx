import clsx from "clsx";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { QuizContext } from "../../context/context";

export default function PublishedQuizzes() {
  const { quizzes } = useContext(QuizContext);

  const publishedQuizzes = quizzes.filter(
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
        {publishedQuizzes?.map((quiz) => (
          <div
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group  hover:scale-105 transition-all  duration-300"
            key={quiz.id}
          >
            <div className="text-buzzr-purple mb-4 transition-all">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={24}
                height={24}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-8 w-8"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25z" />
                <path d="M12 12l4 -2.25l4 -2.25" />
                <path d="M12 12l0 9" />
                <path d="M12 12l-4 -2.25l-4 -2.25" />
                <path d="M20 12l-4 2v4.75" />
                <path d="M4 12l4 2l0 4.75" />
                <path d="M8 5.25l4 2.25l4 -2.25" />
              </svg>
            </div>
            <Link
              to={"/dashboard/quiz-set-entry/" + quiz.id}
              className="font-semibold text-lg mb-2  transition-all"
            >
              {quiz?.title}
            </Link>
            <p className="text-gray-600 text-sm  transition-all">
              {quiz?.description}
            </p>
            <div className="pt-3 ">
              <p className="text-sm text-gray-500">
                {quiz?.Questions?.length} questions
              </p>

              <button
                className={clsx(
                  "bg-buzzr-purple bg-primary text-white px-4 py-2 rounded-lg mt-2 w-full",
                  quiz.Questions.length === 0 &&
                    "cursor-not-allowed disabled:opacity-50"
                )}
                disabled={quiz.Questions.length === 0}
                title={
                  quiz.Questions.length === 0 && "Add questions to publish"
                }
              >
                Published Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
