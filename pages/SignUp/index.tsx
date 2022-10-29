import type { NextPage } from 'next'
import Navbar from '../../components/navbar/navbar'
import Head from 'next/head'
import brick from '../../public/brick.png'
import Image from 'next/image'
import Router, { useRouter } from 'next/router'
import Link from 'next/link'
import styles from '../../styles/SignUp.module.scss'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { useState } from 'react'
import { initializeApp } from 'firebase/app'
import Toast from '../../components/toasts/Toasts'

interface toastType {
    toastTitle: string,
    toastContent: string,
    toastDelay: number,
    appearMs: number
}

const SignUp: NextPage = () => {
  const [toastData, setToastData] = useState<toastType>({toastTitle: "None", toastContent: "Lorem", toastDelay: 500, appearMs: 500});
  const router = useRouter()

  const firebaseConfig = {
    apiKey: "AIzaSyD-sgjpJ5oJr1lbD7oxlgPdZbQxESPWXdw",
    authDomain: "buinfoshare.firebaseapp.com",
    databaseURL: "https://buinfoshare-default-rtdb.firebaseio.com/",
    projectId: "buinfoshare",
    storageBucket: "buinfoshare.appspot.com",
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  
  const signUp = () => {
    let email = document.getElementById("email") as HTMLInputElement | null;
    let password = document.getElementById("password") as HTMLInputElement | null;
    let passwordVer = document.getElementById("passwordVer") as HTMLInputElement | null;
    let error = false;
     
    // We need function to verify if Email exists or not
    if (email != null && password != null && passwordVer != null) {
      if (email.value === "" || password.value === "" || passwordVer.value === "") error = true;
      if (password.value != passwordVer.value) error = true;
      
      if (error) {
        console.log("Error")
        return;
      } else {
        createUserWithEmailAndPassword(auth, email?.value, password?.value) 
          .then((userCredential) => {
            const user = userCredential.user
            router.push("/HomePage")
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            console.log(errorMessage)
          }) 
      }
    }
    
  }
    
  return (
      <>
        <Head>
            <title> Sign Up </title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <Toast data={toastData}/>

        <Navbar/>

        <main className={styles.signUpPage}>
          <section>
            <div>
              <Image src={brick}/>
              <h1> Sign In</h1>
              <h2> Sign In and start exploring courses</h2>
            </div>
            <div>
              <input type="text" placeholder={"Email"} id={"email"}/>
              <input type="password" placeholder={"Password"} id={"password"}/>
              <input type="password" placeholder={"Re-enter Password"} id={"passwordVer"}/>
              <div> 
                <div>
                  <Link href={"/Log-in"}>
                    <p style={{"cursor": "pointer"}}> I have an account </p>
                  </Link>
                </div>
              </div>
            </div>
            <button onClick={signUp}>
              Sign Up
            </button>
          </section>
        </main>
      </>
  )
}

export default SignUp
