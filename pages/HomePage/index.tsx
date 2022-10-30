import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../../components/navbar/navbar'
import styles from '../../styles/HomePage.module.scss'
import Post from '../../components/post/Post'
import Leaderboard from '../../components/leaderboard/leaderboard'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, get, child } from 'firebase/database';
import React, { useEffect, useState } from 'react';

const Home: NextPage<any> = ({dataArray}) => {
  console.log(process.env.FIREBASE_API)
  console.log(process.env.FIREBASE_AUTHDOM)
  console.log(process.env.FIREBASE_DB_URL)
  console.log(process.env.FIREBASE_PROJECTID)
  console.log(process.env.FIREBASE_STORAGE)


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

export default React.memo(Home)

export async function getStaticProps() {

  // const firebaseConfig = {
  //     apiKey: process.env.FIREBASE_API,
  //     authDomain: process.env.FIREBASE_AUTHDOM,
  //     databaseURL: process.env.FIREBASE_DB_URL,
  //     projectId: process.env.FIREBASE_PROJECTID,
  //     storageBucket: process.env.FIREBASE_STORAGE,
  // }

  const firebaseConfig = {
    apiKey: "AIzaSyD-sgjpJ5oJr1lbD7oxlgPdZbQxESPWXdw",
    authDomain: "buinfoshare.firebaseapp.com",
    databaseURL: "https://buinfoshare-default-rtdb.firebaseio.com/",
    projectId: "buinfoshare",
    storageBucket: "buinfoshare.appspot.com",
  };

  const app = initializeApp(firebaseConfig)
  const database = getDatabase(app);

  let data:any  = null;

  await get(child(ref(database), '/major')).then((snapshot) => {
    data = snapshot.val();
  }).catch((error) => {
    console.log(error)
    return null
  })

  let tmpArray:any = []

  for (const property in data) {
    let tmpObj = {
      key: property,
      value: data[property]
    }

    tmpArray.push(tmpObj)
  }

  console.log(process.env.FIREBASE_API)

  return {
    props: {
      dataArray: tmpArray
    }
  }
}