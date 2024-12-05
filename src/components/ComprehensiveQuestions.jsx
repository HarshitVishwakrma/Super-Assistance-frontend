import React, { useState } from "react";
import toast from "react-hot-toast";

function ComprehensiveQuiz() {
  const [paragraph, setParagraph] = useState("");
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: [""], selectedOption: null },
    ]);
  };

  const updateQuestion = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const addOption = (questionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  const updateOption = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const selectOption = (questionIndex, optionIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].selectedOption = optionIndex;
    setQuestions(updatedQuestions);
  };

  const sendQuizToBackend = async () => {
    try {
      const formattedQuestions = questions.map((q) => ({
        ...q,
        correctAnswer: q.options[q.selectedOption],
      }));

      const response = await fetch("https://superassistantbackend.vercel.app/comprehensiveQuestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paragraph, questions: formattedQuestions }),
      });

      const result = await response.json();
      console.log("Quiz sent successfully:", result);
      setParagraph('');
      setQuestions([]);
      toast.success('Question added succefully.')
    } catch (error) {
      toast.error('Please fill all the details.')
      console.error("Error sending quiz:", error);
    }
  };

  return (
      <div className="w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold text-gray-800">
            Comprehensive Quiz Creator
          </h1>
          <p className="mt-2 text-gray-600">
            Enter a paragraph and create multiple-choice questions with
            selectable answers.
          </p>
        </div>

        <div className="p-6 space-y-6">
          {/* Paragraph Input */}
          <textarea
            value={paragraph}
            onChange={(e) => setParagraph(e.target.value)}
            placeholder="Enter your paragraph here..."
            className="w-full h-32 px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 
                       text-gray-800 placeholder-gray-500
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />

          {/* Questions */}
          {questions.map((question, questionIndex) => (
            <div key={questionIndex} className="space-y-4">
              <input
                type="text"
                placeholder={`Question ${questionIndex + 1}`}
                value={question.question}
                onChange={(e) =>
                  updateQuestion(questionIndex, e.target.value)
                }
                className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 
                           text-gray-800 placeholder-gray-500
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
              />

              {/* Options */}
              <div className="space-y-2">
                {question.options.map((option, optionIndex) => (
                  <div key={optionIndex} className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) =>
                        updateOption(questionIndex, optionIndex, e.target.value)
                      }
                      className="flex-1 px-4 py-2 rounded-lg border border-gray-300 bg-gray-100 
                                 text-gray-800 placeholder-gray-500
                                 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                    />
                    <button
                      onClick={() => selectOption(questionIndex, optionIndex)}
                      className={`p-2 rounded-lg ${
                        question.selectedOption === optionIndex
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {question.selectedOption === optionIndex ? "✓" : "Set"}
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addOption(questionIndex)}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md
                           bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors duration-200"
              >
                Add Option
              </button>

              {/* Correct Option Display */}
              {question.selectedOption !== null && (
                <p className="mt-2 text-sm text-green-600">
                  Correct Option: {question.options[question.selectedOption]}
                </p>
              )}
            </div>
          ))}

          <button
            onClick={addQuestion}
            className="w-full px-4 py-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200"
          >
            Add Question
          </button>

          <button
            onClick={sendQuizToBackend}
            className="w-full px-4 py-2 rounded-lg font-medium bg-green-500 text-white hover:bg-green-600 transition-colors duration-200"
          >
            Submit Quiz
          </button>
        </div>
      </div>
  );
}

export default ComprehensiveQuiz;
