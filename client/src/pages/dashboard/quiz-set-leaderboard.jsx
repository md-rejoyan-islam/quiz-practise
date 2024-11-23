import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { QuizContext } from "../../context/context";
import { getPositionFromIndex } from "../../helper/helper";

export default function QuizSetLeaderboard() {
  const { getQuizAttemptsByQuizId } = useContext(QuizContext);
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [quizAttempts, setQuizAttempts] = useState([]);

  console.log(quizAttempts);

  useEffect(() => {
    getQuizAttemptsByQuizId(id).then((response) => {
      if (response.status) {
        const userAttempsResult = response?.attempts?.attempts
          ?.map((attempt) => {
            const correctAnswers = attempt.submitted_answers.filter(
              (answer) => {
                const correctAnswer = attempt.correct_answers?.find(
                  (correct) => correct?.question_id === answer?.question_id
                );
                return correctAnswer?.answer === answer?.answer;
              }
            );
            const wrongAnswer =
              attempt.submitted_answers.length - correctAnswers.length;

            return {
              user: attempt?.user,
              correctAnswer: correctAnswers.length,
              totalQuestions: attempt.submitted_answers.length,
              perQuestionMark: 5,
              totalMark: correctAnswers.length * 5,
              wrongAnswer,
            };
          })
          ?.sort((a, b) => b.totalMark - a.totalMark)
          ?.map((attempt, index) => {
            return {
              ...attempt,
              position: getPositionFromIndex(index),
            };
          });

        setQuizAttempts({
          title: response?.attempts?.quiz?.title,
          attempts: userAttempsResult,
          description: response?.attempts?.quiz?.description,
        });
        setLoading(false);
      }
    });
  }, [id]);

  if (loading) return <div>Loading...</div>;

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
          <h2 className="text-3xl font-bold py-2">
            Leaderboard for {quizAttempts?.title}
          </h2>
          <p className="pb-6">
            Here you can find the leaderboard for the {quizAttempts?.title}. You
            can view the scores and ranks of the participants.
          </p>
        </div>
      </div>
      <div className="">
        <table className="w-full border-collapse border border-gray-300 text-left">
          <thead>
            <tr className="bg-gray-200/70">
              <th className="border border-gray-300 px-4 py-2">Rank</th>
              <th className="border border-gray-300 px-4 py-2">Username</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Score</th>
            </tr>
          </thead>
          <tbody>
            {quizAttempts?.attempts?.length ? (
              quizAttempts?.attempts?.map((attempt, index) => (
                <tr className="hover:bg-gray-50" key={index}>
                  <td className="border border-gray-300 px-4 py-2">
                    {attempt?.position}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {attempt?.user?.full_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {attempt?.user?.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {attempt?.totalMark}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-red-500">
                  No attempts found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
