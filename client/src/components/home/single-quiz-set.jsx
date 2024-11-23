import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function SingleQuizSet({ quiz, user }) {
  const loggedInUserAttempt = quiz?.attempts?.attempts?.some(
    (attempt) => attempt?.user?.id === user?.id
  );

  return (
    <Link
      to={loggedInUserAttempt ? `/result/${quiz.id}` : `/quiz/${quiz.id}`}
      state={{
        from: loggedInUserAttempt ? `/result/${quiz.id}` : `/quiz/${quiz.id}`,
      }}
      className="rounded-lg  shadow-lg hover:shadow-xl transition-shadow max-h-[450px] h-full min-h-[390px] w-full  group cursor-pointer bg-gray-700 flex items-center justify-center relative overflow-hidden z-10  "
      key={quiz.id}
    >
      <div className="group-hover:scale-105 transition-all text-white  text-center  px-6 relative">
        <h1 className=" text-5xl px-4 text-wrap" style={{ fontFamily: "Jaro" }}>
          {quiz?.title}
        </h1>
        <p className="mt-2 text-lg">{quiz?.description}</p>
      </div>
      {loggedInUserAttempt && (
        <div className="hidden absolute inset-0 transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
          <div>
            <h1 className="text-3xl font-bold">Already Participated</h1>
            {/* <p className="text-center">You got 20 out of 50</p> */}
            <p className="text-center">Click to view your result</p>
          </div>
        </div>
      )}
      <img
        src={quiz?.thumbnail}
        alt={quiz?.title}
        className="w-full h-full -z-10 object-cover rounded  absolute inset-0 opacity-40"
      />
    </Link>
  );
}

SingleQuizSet.propTypes = {
  quiz: PropTypes.object.isRequired,
  user: PropTypes.object,
};
