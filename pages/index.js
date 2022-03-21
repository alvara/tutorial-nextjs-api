import { useState } from 'react'
import useSwr, { mutate } from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {

  const {data,error} = useSwr('/api/tasks',fetcher)

  // ADD TASK
  const handleAddForm = async (e) => {
    e.preventDefault()

    // send data to API and get response
    const res = await fetch('/api/tasks',{
      method: 'POST',
      headers: { 'Content-Type':'application/json'},
      body: JSON.stringify({task: e.target.task.value})
    })

    // if successful, tell swr to revalidate tasks data and clear input
    if(res.status === 200) {
      mutate('/api/tasks')
      e.target.task.value = ''
    }

    // if error, tell user
    if(res.status === 400) {
      alert(JSON.stringify(res.statusText,null,2))
    }
  }

  // EDIT TASK
  const [editTask, setEditTask] = useState()

  // toggle edit if id is the same
  const handleToggleEdit = (id) => {
    editTask === id ? setEditTask(undefined) : setEditTask(id) 
  }

  // update task with new title input
  const handleSaveEdit = async (e, id) => {

    e.preventDefault()

    // send data to API and get response
    const res = await fetch(`/api/tasks/${id}`,{
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        title: e.target.title.value
      })
    })
    
    if(res.status === 200) {
      mutate('/api/tasks')
      setEditTask(undefined)
    }
    else {
      alert(JSON.stringify(res.statusText,null,2))
    }
  }

  // DELETE TASK
  const handleDeleteTask = async (id) => {
    const res = await fetch(`/api/tasks/${id}`,{
      method: 'DELETE'
    })
    
    if(res.status === 200) {
      mutate('/api/tasks')
    }
    else {
      alert(JSON.stringify(res.statusText,null,2))
    }
  }
    
  // catches if data error or doesnt exist yet
  if (error) return <div>Failed to load tasks</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
      <h1>API Tutorial</h1>
      <p>A Todo app using NextJS API endpoints.</p>

      {/* display list of tasks */}
      {data.map((task) => (
          <div key={task.id}>
            {editTask === task.id ? (
              // edit form
              <form onSubmit={(e) => handleSaveEdit(e, task.id, e.target.title.value)}>
                <input type="text" name="title" defaultValue={task.title} autoFocus/>
                <button type="submit" >Save</button>
              </form> 
            ) : (
              <div> {task.title} 
               <button onClick={() => handleDeleteTask(task.id)}>Trash</button>
               <button onClick={() => handleToggleEdit(task.id)}>Edit</button>
              </div>
            )}
           
           
          </div>
      ))}

      {/* form to add a task */}
      <form onSubmit={handleAddForm}>
        <input type='text' name='task' autoFocus></input> 
        <button type='submit'>Add Task</button> 
      </form>
    </>
  )
}
