import useSwr from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {

  const {data,error} = useSwr('/api/tasks',fetcher)

  // catches for error or no data yet
  if (error) return <div>Failed to load tasks</div>
  if (!data) return <div>Loading...</div>

  return (
    <>
        <h1>API Tutorial</h1>
        <p>A Todo app using NextJS API endpoints.</p>

        {/* display list of tasks */}
        {data.map((task) => (
            <div key={task.id}>{task.title}</div>
        ))}
    </>
  )
}
