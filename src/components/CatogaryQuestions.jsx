import { useState } from "react";
import CategoryList from "./CategoryList";
import ReorderableInputList from "./DragAndDropInputs";
import {toast} from 'react-hot-toast'

export default function CatogaryQuestions() {

    const [categories, setCategories] = useState([
        { id: '1', text: '' },
        { id: '2', text: '' },
    ]);

    const [options, setOptions] = useState([
        { id: '1', text: '', category: '' }
    ])

    const [question, setQuestion] = useState('');

    const handleQuestionSubmit = async () => {
        const categoriesToSubmit = categories.map(category =>{
            return category.text;
        })
        console.log(categoriesToSubmit)
        try {
            // submit the question to the backend.
            const response = await fetch('http://localhost:3000/categoryQuestion', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    question: question,
                    options: options,
                    categories: categoriesToSubmit
                })
            })

            if (!response.ok) {
                throw new Error('something went wrong!');
            }

            const responseData = await response.json();
            console.log(response)
            setOptions([
                { id: '1', text: '', category: '' }
            ]);
            setCategories([
                { id: '1', text: '' },
                { id: '2', text: '' },
            ])
            toast('Question added')
        } catch (error) {
            toast.error('Failed to add question. Please fill all the fields properly.')
            console.log(error);
        }

    }

    return (
        <>
            <div className="w-full  mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 p-4">
                <h1 className="font-bold text-2xl flex justify-between items-center">
                    Category Questions
                </h1>

                <div>
                    <div className="m-4 border border-black w-full p-4">
                        <input type="text" name="description" placeholder="Enter question description" value={question} onChange={(e) => { setQuestion(e.target.value) }} />
                    </div>
                    <div>
                        <CategoryList setItems={setCategories} items={categories}></CategoryList>
                    </div>
                    <ReorderableInputList items={options} setItems={setOptions} categories={categories}></ReorderableInputList>
                </div>
                <button
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors duration-200
                          ${categories[0].text.length === 0 || options[0].text.length === 0
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 text-white hover:bg-blue-600'
                        }`}
                    onClick={handleQuestionSubmit}
                    disabled={categories[0].text.length === 0 || options[0].text.length === 0}
                >
                    Create Quiz
                </button>
            </div>
        </>
    )
}