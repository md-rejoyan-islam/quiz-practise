import clsx from "clsx";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext, QuizContext } from "../../context/context";
import { getPositionFromIndex } from "../../helper/helper";

export default function Leaderboard() {
  const { userQuizzes } = useContext(QuizContext);
  const { user } = useContext(AuthContext);

  const { id } = useParams();

  const leaderboardQuiz = userQuizzes.find((quiz) => quiz.id === id);

  const userAttempsResult = leaderboardQuiz?.attempts?.attempts
    ?.map((attempt) => {
      const correctAnswers = attempt.submitted_answers.filter((answer) => {
        const correctAnswer = attempt.correct_answers?.find(
          (correct) => correct?.question_id === answer?.question_id
        );
        return correctAnswer?.answer === answer?.answer;
      });
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

  const userAttemResult = userAttempsResult?.find(
    (result) => result.user.id === user.id
  );

  if (!leaderboardQuiz)
    return (
      <div>
        <h1>Quiz not found</h1>
      </div>
    );

  return (
    <>
      <main className="min-h-[calc(100vh-124px)] flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
          <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="bg-primary rounded-lg p-6 text-white">
              <div className="flex flex-col items-center mb-6">
                <img
                  src="/assets/avater.webp"
                  alt="Profile Pic"
                  className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"
                />
                <h2 className="text-2xl font-bold">{user?.full_name}</h2>
                <p className="text-xl">{userAttemResult?.position} Position</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-sm opacity-75">Mark</p>
                  <p className="text-2xl font-bold">
                    {userAttemResult?.totalMark}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-75">Correct</p>
                  <p className="text-2xl font-bold">
                    {userAttemResult?.correctAnswer}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm opacity-75">Wrong</p>
                  <p className="text-2xl font-bold">
                    {userAttemResult?.wrongAnswer}
                  </p>
                </div>
              </div>
            </div>
            {/* Right Column */}
            <div>
              <h1 className="text-2xl font-bold">Leaderboard</h1>
              <p className="mb-6">{leaderboardQuiz?.title}</p>
              <ul className="space-y-4">
                {userAttempsResult?.map((result, index) => (
                  <li
                    className={clsx(
                      "flex items-center justify-between  rounded-md px-1 py-1",
                      user.id === result.user.id && " bg-green-100"
                    )}
                    key={index}
                  >
                    <div className="flex items-center">
                      <img
                        src="/assets/avater.webp"
                        alt="SPD Smith"
                        className="object-cover w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">
                          {result?.user?.full_name}
                          {user.id === result.user.id && (
                            <span className="text-green-500"> (You)</span>
                          )}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {result?.position}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="mr-2">{result?.totalMark}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
