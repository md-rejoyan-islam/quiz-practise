import clsx from "clsx";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { QuizContext } from "../../context/context";
import DialogBox from "../dialog-box";
import Field from "../form/field";

export default function QuizCard({ quiz }) {
  const { deleteQuiz, editQuiz } = useContext(QuizContext);
  const handleDeleteQuiz = (id) => {
    Swal.fire({
      text: "Do you want to delete this quiz set?",
      title: "Are you sure ?",
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      denyButtonText: `Delete`,
    }).then((result) => {
      if (result.isDenied) {
        deleteQuiz({
          id,
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

  const [isoOpenModal, setIsOpenModal] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      status: "draft",
      id: "",
      Questions: [],
    },
  });

  const onEditQuiz = (data) => {
    editQuiz({
      id: data.id,
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
      },
    }).then((response) => {
      if (response.status) {
        setIsOpenModal(false);
      }
    });
  };

  return (
    <>
      <div
        className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 group  hover:scale-105 transition-all  duration-300"
        key={quiz.id}
      >
        <div className="text-buzzr-purple mb-4 transition-all">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M20 7.5v9l-4 2.25l-4 2.25l-4 -2.25l-4 -2.25v-9l4 -2.25l4 -2.25l4 2.25z" />
            <path d="M12 12l4 -2.25l4 -2.25" />
            <path d="M12 12l0 9" />
            <path d="M12 12l-4 -2.25l-4 -2.25" />
            <path d="M20 12l-4 2v4.75" />
            <path d="M4 12l4 2l0 4.75" />
            <path d="M8 5.25l4 2.25l4 -2.25" />
          </svg>
        </div>
        <Link
          to={"/dashboard/quiz-set-entry/" + quiz.id}
          className="font-semibold text-lg mb-2  transition-all"
        >
          {quiz?.title}
        </Link>
        <p className="text-gray-600 text-sm  transition-all">
          {quiz?.description}
        </p>
        <div className="pt-3 ">
          <p className="text-sm text-gray-500">
            {quiz?.Questions?.length} questions
          </p>

          <div className="">
            <div className="flex gap-2">
              <button
                className={clsx(
                  "bg-buzzr-purple bg-gray-700 hover:bg-gray-600 text-white px-2 text-ms py-1.5 rounded-md mt-2 w-full"
                )}
                onClick={() => {
                  setValue("title", quiz.title);
                  setValue("description", quiz.description);
                  setValue("status", quiz.status);
                  setValue("id", quiz.id);
                  setValue("Questions", quiz.Questions);
                  setIsOpenModal(true);
                }}
              >
                Edit
              </button>
              <button
                className={clsx(
                  "bg-buzzr-purple bg-red-500 hover:bg-red-400 text-white px-2 text-sm py-1.5 rounded-md mt-2 w-full"
                )}
                onClick={() => handleDeleteQuiz(quiz.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
      <DialogBox
        isOpen={isoOpenModal}
        setIsOpen={setIsOpenModal}
        title="Edit Quiz"
      >
        <form onSubmit={handleSubmit(onEditQuiz)}>
          <Field label="Quiz title" id="title">
            <input
              type="text"
              id="title"
              name="title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
              placeholder="Quiz"
              {...register("title", {
                required: "Quiz title is required",
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </Field>
          <Field label="Quiz Description" id="description">
            <textarea
              id="description"
              name="description"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
              placeholder="Quiz"
              rows={4}
              {...register("description", {
                required: "Quiz description is required",
              })}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </Field>

          <div className="pb-4">
            <label htmlFor="status">
              Status
              {watch("Questions")?.length === 0 &&
                " (Add questions to publish)"}
            </label>
            <select
              className="w-full px-3 py-2 border bg-white border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple disabled:opacity-60"
              id="status"
              defaultValue={watch("status")}
              {...register("status")}
              disabled={
                watch("Questions")?.length === 0 || watch("Questions") === null
              }
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>

          <div className="flex gap-2 items-center">
            <button
              type="button"
              className="w-full block text-center bg-red-200  border py-2 px-4 rounded-md hover:bg-red-300/90 focus:outline-none "
              onClick={() => setIsOpenModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Next
            </button>
          </div>
        </form>
      </DialogBox>
    </>
  );
}

QuizCard.propTypes = {
  quiz: PropTypes.object.isRequired,
};
