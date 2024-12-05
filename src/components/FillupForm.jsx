import React, { useState } from 'react';
import { X, Plus, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

function Cloze() {
  const [sentence, setSentence] = useState('');
  const [answers, setAnswers] = useState([]);
  const [additionalOptions, setAdditionalOptions] = useState([]);

  const handleWordClick = (word, index) => {
    const uniqueWord = `${word}_${index}`;
    if (answers.includes(uniqueWord)) {
      setAnswers(answers.filter(ans => ans !== uniqueWord));
    } else {
      setAnswers([...answers, uniqueWord]);
    }
  };

  const removeAnswer = (wordToRemove) => {
    setAnswers(answers.filter(ans => ans !== wordToRemove));
  };

  const handleAddOption = () => {
    setAdditionalOptions([...additionalOptions, '']);
  };

  const updateAdditionalOption = (index, value) => {
    const newOptions = [...additionalOptions];
    newOptions[index] = value;
    setAdditionalOptions(newOptions);
  };

  const removeAdditionalOption = (index) => {
    setAdditionalOptions(additionalOptions.filter((_, i) => i !== index));
  };

  const createQuizQuestion = () => {
    console.log('funciton triggred')
    const originalAnswers = answers.map(ans => ans.split('_')[0]);

    console.log('request')

    const sendQuizToBackend = async () => {
      try {
        const response = await fetch('http://localhost:3000/clozeQuestion', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: sentence,
            correctAnswers: originalAnswers,
            additionalOptions: additionalOptions,
          }),
        });

        if (!response.ok) {
          console.error(`Error: ${response.status} - ${response.statusText}`);
          return;
        }

        const result = await response.json(); // Ensure backend sends JSON
        console.log('Quiz sent successfully:', result);
        setSentence("");
        setAnswers([]);
        setAdditionalOptions([]);
        toast.success('Question created succefully.')
      } catch (error) {
        toast.error('Please fill all the details')
        console.error('Error sending quiz:', error);
      }
    };


    sendQuizToBackend();
  };

  const renderSentenceWithBlanks = () => {
    const sentenceWords = sentence.split(' ');
    const selectedIndexes = answers.map(ans => parseInt(ans.split('_')[1]));

    return sentenceWords.map((word, index) =>
      selectedIndexes.includes(index) ? '_'.repeat(word.length) : word
    ).join(' ');
  };

  return (
    <div className="w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-900">
          Fill in the Blanks Quiz Creator
        </h1>
        <p className="mt-2 text-gray-600">
          Create an interactive fill-in-the-blanks question by clicking on words to convert them into blanks
        </p>
      </div>

      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Enter your sentence here..."
            value={sentence}
            onChange={(e) => setSentence(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 bg-white 
                         text-gray-900 placeholder-gray-500
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />


          <div className="p-4 bg-gray-50 rounded-lg min-h-[80px]">
            <div className="flex flex-wrap gap-2">
              {sentence.split(' ').map((word, index) => {
                if (word.length > 0) {

                  return (
                    <button
                      key={`${word}_${index}`}
                      onClick={() => handleWordClick(word, index)}
                      className={`px-3 py-1.5 rounded-md transition-all duration-200 
                        ${answers.includes(`${word}_${index}`)
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                        } hover:bg-blue-50`}
                    >
                      {word}
                    </button>
                  )
                } else {
                  return <></>
                }
              })}
            </div>
          </div>

        </div>


        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Preview</h3>
            <p className="p-4 bg-gray-50 rounded-lg text-gray-700">
              {renderSentenceWithBlanks() || "Your question preview will appear here"}
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Selected Words</h3>
            <div className="flex flex-wrap gap-2">
              {answers.map((answer, index) => {
                const [word] = answer.split('_');
                return (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full
                                 bg-blue-100 text-blue-700"
                  >
                    {word}
                    <button
                      onClick={() => removeAnswer(answer)}
                      className="p-0.5 hover:bg-blue-200 rounded-full"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                );
              })}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900">Additional Options</h3>
              <button
                onClick={handleAddOption}
                className="inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md
                             bg-gray-100 text-gray-700
                             hover:bg-gray-200 transition-colors duration-200"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Option
              </button>
            </div>

            <div className="space-y-2">
              {additionalOptions.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateAdditionalOption(index, e.target.value)}
                    placeholder="Enter additional option..."
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 
                                 bg-white text-gray-900
                                 placeholder-gray-500
                                 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() => removeAdditionalOption(index)}
                    className="p-2 text-gray-500 hover:text-red-500
                                 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {answers.length === 0 && (
            <div className="flex items-start gap-2 p-4 bg-yellow-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-yellow-600" />
              <p className="text-sm text-yellow-700">
                Click on words in your sentence to convert them into blanks
              </p>
            </div>
          )}

          <button
            className={`w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200
                          ${answers.length === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
            disabled={answers.length === 0}
            onClick={createQuizQuestion}
          >
            Create Quiz
          </button>
        </div>

      </div>
    </div>
  );
}

export default Cloze;
