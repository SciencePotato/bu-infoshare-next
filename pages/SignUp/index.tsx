import type { NextPage } from 'next'
import Navbar from '../../components/navbar/navbar'
import Head from 'next/head'
import brick from '../../public/brick.png'
import Image from 'next/image'
import styles from '../../styles/SignUp.module.scss'

const SignUp: NextPage = () => {
  return (
      <>
        <Head>
            <title> Sign Up</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar/>

        <main className={styles.signUpPage}>
          <section>
            <div>
              <Image src={brick}/>
              <h1> Sign In</h1>
              <h2> Sign In and start exploring courses</h2>
            </div>
            <div>
              <input type="text" placeholder={"Login"}/>
              <input type="password" placeholder={"Password"}/>
              <input type="password" placeholder={"Re-enter Password"}/>
              <div> 
                <div>
                  <p> I have an account </p>
                </div>
              </div>
            </div>
            <button>
              Sign Up
            </button>
          </section>
        </main>
      </>
  )
}

export default SignUp
