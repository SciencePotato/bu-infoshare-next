import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../../components/navbar/navbar'
import styles from '../../styles/HomePage.module.scss'
import Post from '../../components/post/Post'
import Leaderboard from '../../components/leaderboard/leaderboard'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'


const firebaseConfig = {
    apiKey: "AIzaSyD-sgjpJ5oJr1lbD7oxlgPdZbQxESPWXdw",
    authDomain: "buinfoshare.firebaseapp.com",
    databaseURL: "https://buinfoshare-default-rtdb.firebaseio.com/",
    projectId: "buinfoshare",
    storageBucket: "buinfoshare.appspot.com",
}

const app = initializeApp(firebaseConfig)
const database = getDatabase(app);


const Home: NextPage = () => {
  const [data, setData] = useState<any>(null)
  const [dataArray, setDataArray] = useState<any>([])

  const getData = () => {
      return onValue(ref(database, '/major'), (snapshot) => {
          const major = snapshot.val()
          setData(major)
      }, {
          onlyOnce: true
      });
  }


  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (data === null) return;
    let tmpArray = []

    for (const property in data) {

      let tmpObj = {
        key: property,
        value: data[property]
      }

      tmpArray.push(tmpObj)
    }

    setDataArray(tmpArray)
  }, [data])

  return (
    <>
      <Head>
        <title> Home Page </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>

      <main className={styles.home}>
        {/* Tags */}
        <aside>
          <h2> Tags </h2>
          <div>
            {/* List of stuff -> Make this into custom Component that takes in Logo + Text? */}
            <div> Homework Help </div>
            <div> Mentor Help </div>
            <div> Internship Help </div>
          </div>
        </aside>

        {/* Posts */}
        <section>
          {/* Post a Question */}
          <Post data={null} pathID={"1"}/>
          { dataArray.length !== 0 && 
            dataArray.map((object: any) => 
              <div key={object.key}>
                {object.key}
              </div>
            )

          }
        </section>

        {/* Leaderboard */}
        <aside>
          <Leaderboard></Leaderboard>
        </aside>
      </main>
    </>
  )
}

export default Home
