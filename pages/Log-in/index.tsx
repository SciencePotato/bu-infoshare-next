import type { NextPage } from 'next'
import Image from 'next/image'
import Navbar from '../../components/navbar/navbar'
import Head from 'next/head'
import brick from '../../public/brick.png'
import styles from '../../styles/LogIn.module.scss'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const Login: NextPage = () => {
  const router = useRouter()

  const firebaseConfig = {
    apiKey: "AIzaSyD-sgjpJ5oJr1lbD7oxlgPdZbQxESPWXdw",
    authDomain: "buinfoshare.firebaseapp.com",
    databaseURL: "https://buinfoshare-default-rtdb.firebaseio.com/",
    projectId: "buinfoshare",
    storageBucket: "buinfoshare.appspot.com",
  };

  const app = initializeApp(firebaseConfig)
  const auth = getAuth()

  const logIn = () => {
    let email = document.getElementById("email") as HTMLInputElement | null
    let password = document.getElementById("password") as HTMLInputElement | null

    if (email != null && password != null) {
      signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
          const user = userCredential.user;
          router.push('/HomePage')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }
  }

  return (
      <>
        <Head>
            <title> Login </title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Navbar/>

        <main className={styles.loginPage}>
          <section>
            <div>
              <Image src={brick}/>
              <h1> Login </h1>
              <h2> Sign In and start exploring courses</h2>
            </div>
            <div>
              <input type="text" placeholder={"Login"} id="email"/>
              <input type="password" placeholder={"Password"} id="password"/>
              <div> 
                <div>
                  <Link href={"/SignUp"}>
                    <p> Don&apos;t have an account </p>
                  </Link>
                </div>
                {/* Do Nothing for now; since there isn't anything for this part */}
                <div>
                  <p> Forget your password? </p>
                </div>
              </div>
            </div>
            <button onClick={logIn}>
              Login
            </button>
          </section>
        </main>
      </>
  )
}

export default Login
