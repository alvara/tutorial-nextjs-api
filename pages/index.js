import styles from '../styles/Home.module.css'
import useSwr from 'swr'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Home() {

  const {data,error} = useSwr('/api/tasks',fetcher)

  // catches for error or no data yet
  if (error) return <div>Failed to load tasks</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className={styles.container}>


      <main className={styles.main}>
        <h1 className={styles.title}>
          NextJS API Tutorial
        </h1>

        <p className={styles.description}>
          A Todo app using NextJS API endpoints.
        </p>

        <div>
          {data.map((task) => (
             <div key={task.id}>{task.title}</div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by {'Vercel'}
        </a>
      </footer>
    </div>
  )
}
