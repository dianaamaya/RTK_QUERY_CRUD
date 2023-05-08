import React, { useEffect } from 'react'
import { v4 as uuid } from 'uuid'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { useForm } from "react-hook-form";
import { useGetTasksQuery, useCreateTaskMutation, useUpdateTaskMutation } from '../api/apiSlice'

export function TaskForm() {

    const {
      register,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm()
    const { data: tasks } = useGetTasksQuery()
    const [updateTask] = useUpdateTaskMutation()
    const [createTask] = useCreateTaskMutation()
    const navigate = useNavigate()
    const params = useParams()

    const onSubmit = handleSubmit(async (data) => {
      if (params.id) {
        const result = await updateTask({...data, id: params.id})
        result.error
        ? toast.error("Task could not be updated")
        : toast.success("Task updated successfully");
      } else {
        const result = await createTask ({
          ...data,
          id: uuid(),
        })
        result.error
        ? toast.error("Task could not be created")
        : toast.success("Task created successfully");
      }
      navigate("/")
    })

    useEffect(() => {
      const taskFound = tasks?.find((task) => task.id === params.id);
      if (taskFound) {
        setValue("title", taskFound.title)
        setValue("description", taskFound.description)
        setValue("completed", taskFound.completed)
      } 
    }, [setValue, params, tasks]);

  return (
    <form 
      onSubmit={onSubmit} 
      className="bg-zinc-800 max-w-sm p-4 self-center">

        <h1 className="block text-lg font-bold pb-6 text-center">
          {params.id ? "Edit task" : "Add task"}
        </h1>

        <label 
          className="block text-sm font-bold pb-2">
          Task:
        </label>
        <input 
          type="text" 
          name="title" 
          {...register("title", { required: true })}
          className="block w-full p-2 rounded-md bg-zinc-600 mb-2"/>
        {errors.title && (
          <span className="block text-red-400 mb-2">
            This field is required
          </span>
        )}

        <label 
          className="block text-sm font-bold pb-2">
            Description:
        </label>
        <textarea 
          type="text" 
          name="description" 
          {...register("description", { required: true })}
          className="block w-full p-2 rounded-md bg-zinc-600 mb-2"/>
        {errors.description && (
          <span className="block text-red-400 mb-2">
            This field is required
          </span>
        )}

        <label 
          className="inline-flex text-sm font-bold">
            Completed:
        </label>
        <input 
          type="checkbox" 
          name="completed"
          {...register("completed")}
          className="rounded-md bg-zinc-600 m-2" />

        <button 
          className="bg-indigo-600 px-2 py-1 mt-4 block ml-auto rounded-sm">
            Save
        </button>

    </form>
  )
}
