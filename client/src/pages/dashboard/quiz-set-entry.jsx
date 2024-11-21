export default function QuizSetEntry() {
  return (
    <main className="md:flex-grow px-4 sm:px-6 lg:px-8 py-8 overflow-y-scroll">
      <div>
        <nav className="text-sm mb-4" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              <a href="#" className="text-gray-600 hover:text-buzzr-purple">
                Home
              </a>
              <svg
                className="fill-current w-3 h-3 mx-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 320 512"
              >
                <path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z" />
              </svg>
            </li>
            <li>
              <a
                href="#"
                className="text-gray-600 hover:text-buzzr-purple"
                aria-current="page"
              >
                Quizzes
              </a>
            </li>
          </ol>
        </nav>
        <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-8 lg:gap-12">
          {/* Left Column */}
          <div className="">
            <h2 className="text-3xl font-bold mb-4">Binary Tree Quiz</h2>
            <div className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-4">
              Total number of questions : 1
            </div>
            <p className="text-gray-600 mb-4">
              Test understanding of binary tree traversal methods, tree
              properties, and algorithms.
            </p>
            <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">Create Quiz</h2>
              <div>
                <label
                  htmlFor="quizTitle"
                  className="block text-sm font-medium text-foreground mb-1"
                >
                  Question Title
                </label>
                <input
                  type="text"
                  id="quizTitle"
                  name="quizTitle"
                  className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
                  placeholder="Enter quiz title"
                />
              </div>
              <p className="text-sm text-gray-600 mt-4">Add Options</p>
              <div id="optionsContainer" className="space-y-2 mt-4">
                <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                  <input
                    type="checkbox"
                    id="option0"
                    name="correctAnswer"
                    defaultValue={0}
                    className="text-primary focus:ring-0 w-4 h-4"
                  />
                  <label htmlFor="option0" className="sr-only">
                    Option 1
                  </label>
                  <input
                    type="text"
                    id="optionText0"
                    name="optionText0"
                    className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                    placeholder="Option 1"
                  />
                </div>
                {/* Option 2 */}
                <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                  <input
                    type="checkbox"
                    id="option2"
                    name="correctAnswer"
                    defaultValue={0}
                    className="text-primary focus:ring-0 w-4 h-4"
                  />
                  <label htmlFor="option0" className="sr-only">
                    Option 2
                  </label>
                  <input
                    type="text"
                    id="optionText2"
                    name="optionText2"
                    className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                    placeholder="Option 2"
                  />
                </div>
                {/* Option 2 */}
                <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                  <input
                    type="checkbox"
                    id="option3"
                    name="correctAnswer"
                    defaultValue={0}
                    className="text-primary focus:ring-0 w-4 h-4"
                  />
                  <label htmlFor="option3" className="sr-only">
                    Option 3
                  </label>
                  <input
                    type="text"
                    id="optionText3"
                    name="optionText3"
                    className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                    placeholder="Option 3"
                  />
                </div>
                {/* Option 4 */}
                <div className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white">
                  <input
                    type="checkbox"
                    id="option4"
                    name="correctAnswer"
                    defaultValue={0}
                    className="text-primary focus:ring-0 w-4 h-4"
                  />
                  <label htmlFor="option4" className="sr-only">
                    Option 4
                  </label>
                  <input
                    type="text"
                    id="optionText4"
                    name="optionText4"
                    className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                    placeholder="Option 4"
                  />
                </div>
              </div>
              <button className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors">
                Save Quiz
              </button>
            </div>
          </div>
          {/* Right Column */}
          <div className="px-4">
            {/* Question One */}
            <div className="rounded-lg overflow-hidden shadow-sm mb-4">
              <div className="bg-white p-6 !pb-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    1. Which of the following is NOT a binary tree traversal
                    method?
                  </h3>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="answer1"
                      className="form-radio text-buzzr-purple"
                      defaultChecked=""
                    />
                    <span>Inorder</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="answer1"
                      className="form-radio text-buzzr-purple"
                    />
                    <span>Preorder</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="answer1"
                      className="form-radio text-buzzr-purple"
                    />
                    <span>Postorder</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="answer1"
                      className="form-radio text-buzzr-purple"
                    />
                    <span>Crossorder</span>
                  </label>
                </div>
              </div>
              <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                <button className="text-red-600 hover:text-red-800 font-medium">
                  Delete
                </button>
                <button className="text-primary hover:text-primary/80 font-medium">
                  Edit Question
                </button>
              </div>
            </div>
            {/* Question Two */}
            <div className="rounded-lg overflow-hidden shadow-sm mb-4">
              <div className="bg-white p-6 !pb-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    2. What is the maximum number of nodes at level
                    &lsquo;L&lsquo; in a binary tree?
                  </h3>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="answer2"
                      className="form-radio text-buzzr-purple"
                      defaultChecked=""
                    />
                    <span>2^L</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="answer2"
                      className="form-radio text-buzzr-purple"
                    />
                    <span>L</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="answer2"
                      className="form-radio text-buzzr-purple"
                    />
                    <span>2^(L-1)</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="answer2"
                      className="form-radio text-buzzr-purple"
                    />
                    <span>2L</span>
                  </label>
                </div>
              </div>
              <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                <button className="text-red-600 hover:text-red-800 font-medium">
                  Delete
                </button>
                <button className="text-primary hover:text-primary/80 font-medium">
                  Edit Question
                </button>
              </div>
            </div>
            {/* Question 3 */}
            <div className="rounded-lg overflow-hidden shadow-sm mb-4">
              <div className="bg-white p-6 !pb-2">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">
                    3. What is the height of an empty binary tree?
                  </h3>
                </div>
                <div className="space-y-2">
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="answer3"
                      className="form-radio text-buzzr-purple"
                      defaultChecked=""
                    />
                    <span>0</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="answer3"
                      className="form-radio text-buzzr-purple"
                    />
                    <span>-1</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="answer3"
                      className="form-radio text-buzzr-purple"
                    />
                    <span>1</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="answer3"
                      className="form-radio text-buzzr-purple"
                    />
                    <span>Undefined</span>
                  </label>
                </div>
              </div>
              <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                <button className="text-red-600 hover:text-red-800 font-medium">
                  Delete
                </button>
                <button className="text-primary hover:text-primary/80 font-medium">
                  Edit Question
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
