import PropType from "prop-types";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { QuizContext } from "../../../context/context";
import Field from "../../form/field";
import ShowFieldError from "../../show-field-error";
import Option from "./option";
const options = [
  {
    id: 1,
    label: "Option 1",
    name: "option1",
    placeholder: "Enter option 1",
    message: "Option 1 is required",
  },
  {
    id: 2,
    label: "Option 2",
    name: "option2",
    placeholder: "Enter option 2",
    message: "Option 2 is required",
  },
  {
    id: 3,
    label: "Option 3",
    name: "option3",
    placeholder: "Enter option 3",
    message: "Option 3 is required",
  },
  {
    id: 4,
    label: "Option 4",
    name: "option4",
    placeholder: "Enter option 4",
    message: "Option 4 is required",
  },
];

export default function QuestionAddForm({
  id,
  defaultOptions,
  defaultAnswer = "",
  defaultQuestion = "",
  type = "add",
  setIsOpenModal,
}) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      question: defaultQuestion,
      option1: defaultOptions ? defaultOptions[0] : "",
      option2: defaultOptions ? defaultOptions[1] : "",
      option3: defaultOptions ? defaultOptions[2] : "",
      option4: defaultOptions ? defaultOptions[3] : "",
    },
  });

  const [correctAnswer, setCorrectAnswer] = useState(defaultAnswer);
  const { addQuestion, updateQuestion } = useContext(QuizContext);

  const onSubmit = (data) => {
    if (!correctAnswer) return toast.error("Please select correct answer");
    else data.correctAnswer = correctAnswer;

    // all options are store in array
    Object.keys(data).forEach((key) => {
      if (key.includes("option")) {
        data.options = data.options || [];
        data.options.push(data[key]);
        delete data[key];
      }
    });

    // request data
    const requestData = {
      data,
      reset,
      id,
      setCorrectAnswer,
      setIsOpenModal,
    };

    if (type === "add") {
      delete requestData.setIsOpenModal;
      addQuestion(requestData);
    } else if (type === "edit") {
      delete requestData.reset;
      updateQuestion(requestData);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Field id="quizTitle" label="Question Title">
        <input
          type="text"
          className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground  focus:outline-none ring-transparent  ring focus-within:ring-primary/80"
          placeholder="Enter quiz title"
          {...register("question", {
            required: "Question title is required",
          })}
        />
        <ShowFieldError errors={errors} name="question" />
      </Field>
      <Field id="options" label="Add Options">
        <div id="optionsContainer" className="space-y-2 mt-4">
          {options.map((option, index) => (
            <div key={option.id}>
              <Option
                label={option.label}
                checkboxId={`option${index + 1}`}
                error={errors[option.name]}
                correctAnswer={correctAnswer}
                value={watch(option.name)}
                setCorrectAnswer={setCorrectAnswer}
              >
                <input
                  type="text"
                  className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                  placeholder={option.placeholder}
                  {...register(option.name, {
                    required: `${option.label} is required`,
                  })}
                />
              </Option>
              <ShowFieldError errors={errors} name={option.name} />
            </div>
          ))}
        </div>
      </Field>

      <button
        type="submit"
        className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
      >
        Save Quiz
      </button>
    </form>
  );
}

QuestionAddForm.propTypes = {
  id: PropType.string.isRequired,
  defaultOptions: PropType.array,
  defaultAnswer: PropType.string,
  defaultQuestion: PropType.string,
  type: PropType.string.isRequired,
  setIsOpenModal: PropType.func,
};
