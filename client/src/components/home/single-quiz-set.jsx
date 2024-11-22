import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function SingleQuizSet({ quiz, user }) {
  const loggedInUserAttempt = quiz?.attempts?.attempts?.some(
    (attempt) => attempt.user.id === user.id
  );

  return (
    <Link
      to={loggedInUserAttempt ? `/result/${quiz.id}` : `/quiz/${quiz.id}`}
      state={{
        from: loggedInUserAttempt ? `/result/${quiz.id}` : `/quiz/${quiz.id}`,
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
      {loggedInUserAttempt && (
        <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
          <div>
            <h1 className="text-3xl font-bold">Already Participated</h1>
            <p className="text-center">Click to view your leaderboard</p>
          </div>
        </div>
      )}
      <img
        // src={quiz?.thumbnail}
        alt={quiz?.title}
        className="w-full h-full object-cover rounded mb-4"
      />
    </Link>
  );
}

SingleQuizSet.propTypes = {
  quiz: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};
