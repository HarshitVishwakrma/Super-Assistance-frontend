// import './App.css'

import { useState } from 'react'

import CatogaryQuestions from './components/CatogaryQuestions'
import ComprehensiveQuestions from './components/ComprehensiveQuestions'
import Cloze from './components/FillupForm'
import { Toaster } from 'react-hot-toast'
import PaperPreview from './components/PaperPrevies'




function App() {

  const [activeTab, setActiveTab] = useState('Categorize');


  return (
    <>
    <Toaster>
    </Toaster>

      <div className="flex w-full  mt-[4rem] border-b-2 border-gray-200">
        <button
          className={`flex-1 text-center py-2 ${activeTab === "Categorize"
            ? "text-[#707070] border-b-2 border-[#FF7D8B] font-bold"
            : "text-gray-500"
            }`}
          onClick={() => setActiveTab("Categorize")}
        >
          Categorize
        </button>
        <button
          className={`flex-1 text-center py-2 ${activeTab === "Cloze"
            ? "text-[#707070] border-b-2 border-[#FF7D8B]  font-bold"
            : "text-gray-500"
            }`}
          onClick={() => setActiveTab("Cloze")}
        >
          Cloze
        </button>
        <button
          className={`flex-1 text-center py-2 ${activeTab === "Comprehension"
            ? "text-[#707070] border-b-2 border-[#FF7D8B]  font-bold"
            : "text-gray-500"
            }`}
          onClick={() => setActiveTab("Comprehension")}
        >
          Comprehension
        </button>
        <button
          className={`flex-1 text-center py-2 ${activeTab === "Paper"
            ? "text-[#707070] border-b-2 border-[#FF7D8B]  font-bold"
            : "text-gray-500"
            }`}
          onClick={() => setActiveTab("Paper")}
        >
          Paper preview
        </button>
      </div>


      {/* <FillBlankForm></FillBlankForm> */}

      {activeTab === 'Categorize' && <>
        <div className='flex min-h-[400px] border border-black items-center p-6 m-4 w-[80%]'>
          <CatogaryQuestions></CatogaryQuestions>
        </div>
      </>}

      {activeTab === 'Cloze' && <>
        <div className='flex min-h-[400px] border border-black items-center p-6 m-4 w-[80%]'>
        <Cloze></Cloze>
        </div>
      </>}

      {activeTab === 'Comprehension' && <>
        <div className='flex min-h-[400px] border border-black items-center p-6 m-4 w-[80%]'>
        <ComprehensiveQuestions></ComprehensiveQuestions>
        </div>
      </>}

      {activeTab === 'Paper' && <>
        <div className='flex min-h-[400px] border border-black items-center p-6 m-4 w-[80%]'>
          <PaperPreview></PaperPreview>
        </div>
      </>}

    </>
  )
}

export default App
