import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useGetTasksQuery, useDeleteTaskMutation, useUpdateTaskMutation } from '../api/apiSlice'

export function TaskList() {

  const { data: tasks, isError, isLoading, error } = useGetTasksQuery()
  const [deleteTask] = useDeleteTaskMutation()
  const [updateTask] = useUpdateTaskMutation()

  if (isLoading) return <div>Loading...</div>
  else if (isError) return <div>Error: {error.message}</div>

  return (
    <div className="w-4/6 self-center">
      <header className="flex justify-between items-center py-4">
        <h1>Tasks ({tasks.length})</h1>

        <Link
          to="/create-task"
          className="bg-indigo-600 px-2 py-1 rounded-sm text-sm shadow-sm"
        >
          Create Task
        </Link>
      </header> 
      <div 
        data-testid="tasks-list"
        className="grid grid-cols-3 gap-3">
        {
          tasks.map(task => {

            const handleDelete = async () => {

              const result = await deleteTask(task.id)
              
              result.error 
              ? toast.error("Task could not be deleted")
              : toast.success("Task deleted successfully")
            }

            const handleCompleted = async (e) => {

              const result = await updateTask({...task, completed: e.target.checked})

              result.error 
              ? toast.error("Task could not be updated")
              : toast.success("Task updated successfully")
            }

            return (
              <div className="bg-neutral-800 p-4 rounded-md" key={task.id}>

                <header className="flex justify-between">
                  <h3 className="text-lg font-bold">
                    {task.title}
                  </h3>
                  <div className="flex gap-x-2">
                    <Link
                        to={`/edit-task/${task.id}`}
                        className="bg-zinc-600 px-2 py-1 text-xs rounded-md self-center"
                      >
                        Edit
                    </Link>
                    <button 
                      className="bg-red-600 px-2 py-1 text-xs rounded-md"
                      onClick={handleDelete}>
                        Delete
                    </button>
                  </div>
                </header>

                <p>{task.description}</p>
                <p className="text-xs text-slate-400">
                    {task.id}
                </p>
                <input 
                  className="mt-2 mr-2"
                  type="checkbox" 
                  id={task.id}
                  checked={task.completed}
                  onChange={handleCompleted} />
                <label 
                  className="text-sm"
                  htmlFor={task.id}>
                    Completed
                </label>
              
              </div>
            )
          })
        }
      </div>
    </div>
  )
}