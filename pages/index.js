/* eslint-disable react/jsx-no-comment-textnodes */
/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import styles from '../styles/Home.module.css'
// mdb-react-ui-kit css file
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
// dynamically load this component to disable server side to avoid windows object error
const HomePage = dynamic(() => import( '../src/pages/Home'), {ssr: false});


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Loch Cryptocurrency App</title>
        <meta name="description" content="Loch Cryptocurrency App" />
        <link rel="icon" href="/favicon.ico" />
        <meta property="og:image" content="/loch.png" />
        // eslint-disable-next-line react/jsx-no-comment-textnodes
        <link href="https://use.fontawesome.com/releases/v5.15.1/css/all.css" rel="stylesheet" />
        // eslint-disable-next-line @next/next/no-page-custom-font
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" rel="stylesheet" />
      </Head>
        {/* Homepage */}
        <HomePage />

      <footer className={styles.footer}>
        <a
          href="https://github.com/techfortified"
          target="_blank"
          rel="noopener noreferrer"
        >
          Developed by{' Peter Kelvin Torver '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
