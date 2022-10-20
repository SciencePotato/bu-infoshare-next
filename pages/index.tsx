import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Splash.module.scss'
import Navbar from '../components/navbar/navbar'
import brick from '../public/brick.png'
import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database"
import Link from 'next/link'
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-sgjpJ5oJr1lbD7oxlgPdZbQxESPWXdw",
  authDomain: "buinfoshare.firebaseapp.com",
  databaseURL: "https://buinfoshare-default-rtdb.firebaseio.com/",
  projectId: "buinfoshare",
  storageBucket: "buinfoshare.appspot.com",
};

const app =  initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();

// createUserWithEmailAndPassword(auth, "houchic@bu.edu", "abc123")
//   .then((userCredential) => {
//     // Signed in 
//     const user = userCredential.user;
//     // ...
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     // ..
//   });

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title> InfoShare </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar></Navbar>
      <main className={styles.splashPage}>
        <div>
          <h2> Welcome To </h2>
          <div>
            <h1> InfoShare </h1>
            <div>
              <Image src={brick} style={{"display": "inline"}} height={150}/>
            </div>
          </div>
          <h3> Thanks for visiting our site. If you are confused about your homework, and wanted to find help. You are at the right place. </h3>
          <Link href={"/Log-in"}>
            <button> Let the Magic Begin </button>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Home
