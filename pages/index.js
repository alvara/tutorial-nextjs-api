import styles from '../styles/Home.module.css'

export default function Home() {
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
  
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by {'Vercel '}
        </a>
      </footer>
    </div>
  )
}
