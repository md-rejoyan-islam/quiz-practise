import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext, QuizContext } from "../../context/context";

export default function Quiz() {
  const { getQuizById, attemptQuiz } = useContext(QuizContext);
  const { user } = useContext(AuthContext);
  const [myQuiz, setMyQuiz] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const [currentQuestion, setCurrentQuestion] = useState(1);

  const handleSubmit = () => {
    const answers = myQuiz.questions.reduce((acc, c) => {
      acc[c.id] = c.myAnswer;
      return acc;
    }, {});
    attemptQuiz({
      id: myQuiz.id,
      data: { answers },
      navigate,
    });
  };

  const pertification = myQuiz?.questions?.filter(
    (q) => q.myAnswer !== null
  ).length;
  const remaining = myQuiz?.questions?.filter(
    (q) => q.myAnswer === null
  ).length;

  useEffect(() => {
    setLoading(true);
    getQuizById(id)
      .then((response) => {
        if (response.status) {
          setMyQuiz({
            ...response.quiz,

            total: response.quiz.questions.length,
            questions: response.quiz.questions.map((q) => ({
              ...q,
              myAnswer: null,
            })),
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
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full  container mx-auto min-h-[calc(100vh-124px)] p-5">
      {/* Left Column */}
      <div className="lg:col-span-1 bg-white rounded-md p-6 h-[100%] flex flex-col ">
        <div>
          <h2 className="text-4xl font-bold mb-4">{myQuiz?.title}</h2>
          <p className="text-gray-600 mb-4">{myQuiz?.description}</p>
          <div className="flex flex-col">
            <div className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
              Total number of questions : {myQuiz?.total}
            </div>
            <div className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
              Participation : {pertification}
            </div>
            <div className="w-fit bg-gray-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
              Remaining : {remaining}
            </div>
          </div>
        </div>
        <div className="mt-auto flex items-center">
          <img
            src="/assets/avater.webp"
            alt="Mr Hasan"
            className="w-10 h-10 rounded-full mr-3 object-cover"
          />
          <span className="text-black font-semibold">{user?.full_name}</span>
        </div>
      </div>
      {/* Right Column */}
      <div className="lg:col-span-2 bg-white h-full">
        {myQuiz?.questions?.length && (
          <div className="bg-white p-6 !pb-2 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-semibold">
                {currentQuestion}.{" "}
                {myQuiz?.questions[currentQuestion - 1].question}
              </h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Option 1 */}
              {myQuiz?.questions[currentQuestion - 1].options.map(
                (option, index) => (
                  <label
                    className="flex items-center space-x-3 py-3 px-4 bg-primary/5 rounded-md text-lg"
                    key={currentQuestion + "" + index}
                  >
                    <input
                      type="radio"
                      name={`answer-${currentQuestion}`}
                      value={option}
                      onChange={() => {
                        setMyQuiz((prev) => {
                          const newQuestions = [...prev.questions];
                          newQuestions[currentQuestion - 1].myAnswer = option;
                          return {
                            ...prev,
                            questions: newQuestions,
                          };
                        });
                      }}
                      defaultChecked={
                        myQuiz?.questions[currentQuestion - 1].myAnswer ===
                        option
                      }
                      className="form-radio text-buzzr-purple"
                    />
                    <span>{option}</span>
                  </label>
                )
              )}
            </div>
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="w-1/2 text-center disabled:opacity-70 disabled:hover:bg-primary ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
                disabled={currentQuestion === 1}
              >
                Back
              </button>

              {currentQuestion === myQuiz.total ? (
                <button
                  onClick={handleSubmit}
                  className="w-1/2 text-center disabled:opacity-70 disabled:hover:bg-primary ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
                  disabled={remaining !== 0}
                  title={
                    remaining
                      ? `You have ${remaining} questions left`
                      : "Submit the quiz"
                  }
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={() => setCurrentQuestion(currentQuestion + 1)}
                  className="w-1/2 text-center disabled:opacity-70 disabled:hover:bg-primary ml-auto block bg-primary text-white py-2 px-4 rounded-md hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary mb-6 font-semibold my-8"
                  disabled={currentQuestion === myQuiz.total}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
