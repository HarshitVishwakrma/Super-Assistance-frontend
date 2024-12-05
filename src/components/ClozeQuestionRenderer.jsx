import React, { useState } from 'react';

const ClozeQuestion = ({ question }) => {
  const { correctAnswers, additionalOptions, question: questionText } = question;

  // Split the question text at each correct answer
  const questionParts = questionText.split(new RegExp(`(${correctAnswers.join('|')})`, 'g')).filter(Boolean);

  // Combine correct answers and additional options
  const allOptions = [...correctAnswers, ...additionalOptions];

  // State to track the selected answers for blanks
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(correctAnswers.length).fill(null)
  );

  // Handle selection from the options
  const handleSelect = (option, index) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[index] = option;
    setSelectedAnswers(updatedAnswers);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md m-4">
      <div className="text-lg mb-4">
        {questionParts.map((part, index) =>
          correctAnswers.includes(part) ? (
            // Render blanks dynamically for each correct answer
            <span key={index} className="inline-block mx-2">
              <select
                value={selectedAnswers[correctAnswers.indexOf(part)] || ''}
                onChange={(e) => handleSelect(e.target.value, correctAnswers.indexOf(part))}
                className="border rounded px-2 py-1"
              >
                <option value="" disabled>
                  Select an option
                </option>
                {allOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </span>
          ) : (
            // Render static parts of the question
            <span key={index}>{part}</span>
          )
        )}
      </div>

    </div>
  );
};

export default ClozeQuestion;
