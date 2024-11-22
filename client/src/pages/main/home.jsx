import clsx from "clsx";
import { useContext } from "react";
import { Link } from "react-router-dom";
import UserBanner from "../../components/home/user-banner";
import { AuthContext, QuizContext } from "../../context/context";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { userQuizzes } = useContext(QuizContext);

  return (
    <div className="container mx-auto ">
      {user && <UserBanner name={user?.full_name} />}
      <main
        className={clsx(
          "bg-white px-6 py-7 rounded-md h-full  ",
          !user && "min-h-[calc(100vh-124px)]"
        )}
      >
        <section>
          <h3 className="text-2xl font-bold mb-6">Participate In Quizees</h3>
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {userQuizzes?.map((quiz) => (
              <Link
                to={`/quiz/${quiz.id}`}
                state={{
                  from: `/quiz/${quiz.id}`,
                }}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer bg-gray-700"
                key={quiz.id}
              >
                <div className="group-hover:scale-105 absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
                  <h1 className=" text-5xl" style={{ fontFamily: "Jaro" }}>
                    {quiz?.title}
                  </h1>
                  <p className="mt-2 text-lg">{quiz?.description}</p>
                </div>
                <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
                  <div>
                    <h1 className="text-3xl font-bold">Already Participated</h1>
                    <p className="text-center">
                      Click to view your leaderboard
                    </p>
                  </div>
                </div>
                <img
                  // src={quiz?.thumbnail}
                  alt={quiz?.title}
                  className="w-full h-full object-cover rounded mb-4"
                />
              </Link>
            ))}
            <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer ">
              <div className="absolute transition-all text-white  text-center top-1/2 -translate-y-1/2 px-4">
                <h1 className=" text-5xl" style={{ fontFamily: "Jaro" }}>
                  JavaScript Basic Quiz
                </h1>
                <p className="mt-2 text-lg">
                  Test your knowledge of JavaScript basics with quizzes that
                  cover essential concepts, syntax, and foundational programming
                  skills
                </p>
              </div>
              <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
                <div>
                  <h1 className="text-3xl font-bold">Already Participated</h1>
                  <p className="text-center">You got 20 out of 50</p>
                </div>
              </div>
              <img
                src="/assets/backgrounds/1.jpeg"
                alt="JavaScript Hoisting"
                className="w-full h-full object-cover rounded mb-4 "
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
