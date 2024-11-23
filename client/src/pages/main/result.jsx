import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Link, useParams } from "react-router-dom";
import { CorrectIcon, CrossIcon } from "../../components/svg";
import { AuthContext, QuizContext } from "../../context/context";

export default function Result() {
  const { userQuizzes, getQuizById } = useContext(QuizContext);
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [quizWithResult, setQuizWithResult] = useState(null);

  const { id } = useParams();

  const correctAnswer = quizWithResult?.questions?.filter(
    (q) => q.correctAnswer === q.userAnswer
  ).length;

  const wrongAnswer = quizWithResult?.questions?.length - correctAnswer;

  const mapQuestionsWithAnswers = (questions, attemptResult) => {
    return questions.map((q) => {
      const userAnswer = attemptResult?.submitted_answers?.find(
        (answer) => answer.question_id === q.id
      )?.answer;

      return {
        ...q,
        userAnswer,
      };
    });
  };

  console.log(quizWithResult);

  useEffect(() => {
    if (!user?.id) return;
    setLoading(true);
    getQuizById(id)
      .then((response) => {
        if (response.status) {
          const attemptResult = userQuizzes
            .find((quiz) => quiz.id === id)
            ?.attempts?.attempts?.find(
              (attempt) => attempt.user.id === user.id
            );
          const totalQuestions = response.quiz.questions.length;
          const correctAnswer = response.quiz.questions.filter((q) => {
            const userAnswer = attemptResult?.submitted_answers?.find(
              (answer) => answer.question_id === q.id
            )?.answer;
            return userAnswer === q.correctAnswer;
          }).length;
          console.log(response.quiz.questions);

          const wrongAnswer = totalQuestions - correctAnswer;
          setQuizWithResult({
            title: response.quiz.title,
            description: response.quiz.description,
            id: response.quiz.id,
            questions: mapQuestionsWithAnswers(
              response.quiz.questions,
              attemptResult
            ),
            correctAnswer,
            totalQuestions,
            wrongAnswer,
            totalMark: totalQuestions * 5,
            yourMark: correctAnswer * 5,
            yourPercentage: (correctAnswer / totalQuestions) * 100,
          });
        }
      })

      .catch((error) => {
        console.log(error);
        throw new Error("Quiz not found");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id, user.id, userQuizzes]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex min-h-[calc(100vh-124px)]  overflow-hidden container mx-auto  h-fit">
      {/* Left side */}
      <div className=" hidden lg:flex lg:w-1/2 bg-primary  flex-col justify-center p-12 relative">
        <div className="text-white">
          <div>
            <h2 className="text-4xl font-bold mb-2">{quizWithResult?.title}</h2>
            <p>{quizWithResult?.description}</p>
          </div>
          <div className="my-6 flex items-center  ">
            <div className="w-1/2">
              <div className="flex gap-6 my-6">
                <div>
                  <p className="font-semibold text-2xl my-0">
                    {quizWithResult?.questions?.length}
                  </p>
                  <p className="text-gray-300">Questions</p>
                </div>
                <div>
                  <p className="font-semibold text-2xl my-0">{correctAnswer}</p>
                  <p className="text-gray-300">Correct</p>
                </div>
                <div>
                  <p className="font-semibold text-2xl my-0">{wrongAnswer}</p>
                  <p className="text-gray-300">Wrong</p>
                </div>
              </div>
              <Link
                to={`/leaderboard/${id}`}
                className=" bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white"
              >
                View Leaderboard
              </Link>
            </div>
            <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
              <div className="flex-1">
                <p className="text-2xl font-bold">
                  {quizWithResult?.yourMark}/{quizWithResult?.totalMark}
                </p>
                <p>Your Mark</p>
              </div>
              <div>
                <CircularProgressbar
                  value={quizWithResult?.yourPercentage}
                  text={`${quizWithResult?.yourPercentage?.toPrecision(3)}%`}
                  className="h-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Right side */}
      <div className=" overflow-y-scroll    md:w-1/2 flex items-center  justify-center px-8">
        <div className="h-[calc(100vh-124px)] overflow-y-scroll  py-8 w-full ">
          <div className="px-4">
            {/* Question One */}
            {quizWithResult?.questions?.map((question, index) => (
              <div
                className="rounded-lg w-full md:w-[80%] mx-auto overflow-hidden shadow-sm mb-4"
                key={index}
              >
                <div className="bg-white w-full  p-6 !pb-5">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      {index + 1}. {question?.question}
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {question?.options.map((option, index) => (
                      <div key={index}>
                        <div
                          className={clsx(
                            "flex gap-1 items-center  px-1.5 py-1 rounded-md  border",
                            question?.correctAnswer === option &&
                              "bg-green-100",
                            question?.userAnswer === option &&
                              question?.correctAnswer !== option &&
                              "bg-red-100"
                          )}
                        >
                          {question?.correctAnswer === option && (
                            <CorrectIcon />
                          )}
                          {question?.userAnswer === option &&
                            question?.correctAnswer !== option && <CrossIcon />}

                          <label className="flex items-center space-x-3">
                            <input
                              type="radio"
                              name={`${question?.id}-${index}`}
                              value={option}
                              onChange={() => {}}
                              className="form-radio text-buzzr-purple"
                              checked={question.userAnswer === option}
                            />
                            <span>{option}</span>
                          </label>
                        </div>
                        {question?.correctAnswer === option && (
                          <p className="text-green-500 text-xs">
                            Correct Answer.
                            {question?.correctAnswer ===
                              question?.userAnswer && (
                              <span>(You have selected it)</span>
                            )}
                            {question?.correctAnswer !==
                              question?.userAnswer && (
                              <span>(You did not select it!)</span>
                            )}
                          </p>
                        )}
                        {question?.userAnswer === option &&
                          question?.correctAnswer !== option && (
                            <p className="text-red-500 text-xs">
                              Wrong Answer.
                              <span>(You have selected it)</span>
                            </p>
                          )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
