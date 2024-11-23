import clsx from "clsx";
import { useContext } from "react";
import SingleQuizSet from "../../components/home/single-quiz-set";
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
              <SingleQuizSet key={quiz.id} quiz={quiz} user={user} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
