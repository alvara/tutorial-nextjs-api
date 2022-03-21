import useSwr, { mutate } from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {

  const {data,error} = useSwr('/api/tasks',fetcher)
  
  // catches for error or no data yet
  if (error) return <div>Failed to load tasks</div>
  if (!data) return <div>Loading...</div>

  // send request to add task
  const handleAddTask = async (e) => {
    // prevent form from refreshing page 
    e.preventDefault()

    // prepare data for the body
    const data = JSON.stringify({task: e.target.task.value})

    // send data to our API and get response
    const res = await fetch('/api/tasks',{
      method: 'POST',
      headers: { 'Content-Type':'application/json'},
      body: data
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

  return (
    <>
      <h1>API Tutorial</h1>
      <p>A Todo app using NextJS API endpoints.</p>

      {/* display list of tasks */}
      {data.map((task) => (
          <div key={task.id}>{task.title}</div>
      ))}

      {/* form to add a task */}
      <form method='POST' action='/api/tasks' onSubmit={handleAddTask}>
        <input type='text' name='task' autoFocus></input> 
        <button type='submit'>Add Task</button> 
      </form>
    </>
  )
}
