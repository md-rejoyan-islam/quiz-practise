import PropTypes from "prop-types";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { QuizContext } from "../../../context/context";
import DialogBox from "../../dialog-box";
import QuestionAddForm from "./question-add-form";
export default function Question({ question, index }) {
  const { deleteQuestion } = useContext(QuizContext);

  console.log(question);

  const [isoOpenModal, setIsOpenModal] = useState(false);

  const handleDeleteQuestion = () => {
    Swal.fire({
      text: "Do you want to delete this question?",
      title: "Are you sure ?",
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      denyButtonText: `Delete`,
    }).then((result) => {
      if (result.isDenied) {
        deleteQuestion({
          quizId: question.quizId,
          questionId: question.id,
        }).then((response) => {
          if (response.status) {
            if (result.isDenied) {
              Swal.fire("Deleted!", "", "success");
            }
          } else {
            Swal.fire(response?.error, "", "error");
          }
        });
      }
    });
  };

  return (
    <div className="rounded-lg overflow-hidden shadow-sm mb-4">
      <div className="bg-white p-6 !pb-2">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">
            {index + 1}. {question?.question}
          </h3>
        </div>
        <div className="space-y-2">
          {question?.options.map((option, i) => (
            <label className="flex items-center space-x-3" key={i}>
              <input
                type="radio"
                className="form-radio text-buzzr-purple"
                name={`answer${index}`}
                checked={question.correctAnswer === option}
                onChange={() => console.log("clicked")}
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex space-x-4 bg-primary/10 px-6 py-2">
        <button
          className="text-red-600 hover:text-red-800 font-medium"
          onClick={handleDeleteQuestion}
        >
          Delete
        </button>
        <button
          className="text-primary hover:text-primary/80 font-medium"
          onClick={() => setIsOpenModal(true)}
        >
          Edit Question
        </button>
      </div>

      <DialogBox
        isOpen={isoOpenModal}
        setIsOpen={setIsOpenModal}
        title="Edit Question"
      >
        <QuestionAddForm
          id={question.id}
          defaultOptions={question?.options}
          defaultAnswer={question.correctAnswer}
          defaultQuestion={question.question}
          type="edit"
          setIsOpenModal={setIsOpenModal}
        />
      </DialogBox>
    </div>
  );
}

Question.propTypes = {
  question: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};
