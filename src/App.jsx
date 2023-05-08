import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { TaskList } from "./components/TaskList"
import { TaskForm } from "./components/TaskForm"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <div className="bg-zinc-900 h-screen text-white">
      <div className="flex justify-center h-full">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<TaskList />} />
            <Route path="/create-task" element={<TaskForm />} />
            <Route path="/edit-task/:id" element={<TaskForm />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Toaster />
    </div> 
  )
}

export default App