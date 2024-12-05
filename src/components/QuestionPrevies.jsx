import React from 'react';
import CategoryQuestion from './QuestionRenderer';
import ClozeQuestion from './ClozeQuestionRenderer';

const QuestionRenderer = ({ question }) => {
    switch (question.type) {
        case "category":
            return (
              <CategoryQuestion question={question}></CategoryQuestion>
            );

        case "cloze":
            return (
               <ClozeQuestion question={question}></ClozeQuestion>
            );

        case "comprehensive":
            return (
                <div className=" m-4">
                    <p className="bg-gray-100 p-4 rounded">{question.paragraph}</p>
                    {question.questions.map((q, index) => (
                        <div key={index} className="mt-4">
                            <h3 className="font-semibold">{q.question}</h3>
                            {q.options.map((option, i) => (
                                <div key={i}>
                                    <label>
                                        <input
                                            type="radio"
                                            name={`${question.id}-${index}`}
                                            value={option}
                                            className="mr-2"
                                        />
                                        {option}
                                    </label>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            );

        default:
            return null; // Fallback for unknown question types
    }
};

export default QuestionRenderer;
