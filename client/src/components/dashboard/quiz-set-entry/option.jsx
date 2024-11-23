import clsx from "clsx";
import PropTypes from "prop-types";

export default function Option({
  label,
  checkboxId,
  children,
  error,
  correctAnswer,
  setCorrectAnswer,
  value,
}) {
  return (
    <div
      className={clsx(
        "flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white",
        error && "ring-1 ring-red-500"
      )}
    >
      <input
        type="checkbox"
        id={checkboxId}
        name="correctAnswer"
        defaultValue={0}
        className="text-primary focus:ring-0 w-4 h-4"
        onChange={() => setCorrectAnswer(value)}
        checked={correctAnswer ? correctAnswer === value : false}
      />
      <label htmlFor={checkboxId} className="sr-only">
        {label}
      </label>
      {children}
    </div>
  );
}

Option.propTypes = {
  label: PropTypes.string.isRequired,
  checkboxId: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  error: PropTypes.object,
  correctAnswer: PropTypes.string,
  setCorrectAnswer: PropTypes.func,
  value: PropTypes.string,
};
