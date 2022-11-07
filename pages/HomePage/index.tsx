import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../../components/navbar/navbar'
import styles from '../../styles/HomePage.module.scss'
import Post from '../../components/post/Post'
import Coursecard from '../../components/courseCard/Course'
import Leaderboard from '../../components/leaderboard/leaderboard'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, child } from 'firebase/database';
import React, { useEffect, useState }from 'react';
import { firebaseConfig } from '../../utils'

const Home: NextPage<any> = ({dataArray}) => {
   const [tmpDataArray, setDataArray] = useState(dataArray)

  const fetchFunction = async () => {
    console.log(document.location)
    const response = await fetch(`${document.location.origin}/api/read`, {
      method: 'POST',
      body: JSON.stringify({"path": "leaderboard"}),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    console.log(response.json().then((res) => console.log(res)))
  }

  const postFunction = async () => {
    const response = await fetch(`${document.location.origin}/api/post`, {
      method: 'POST',
      body: JSON.stringify({"Potato": "1"}),
      headers: {
        'Content-Type': 'data',
      },
    })
    console.log(response.json().then((res) => console.log(res)))
  }

  return (
    <>
      <Head>
        <title> Home Page </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar data={dataArray} tmpData={tmpDataArray} setData={setDataArray}/>

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
          <button onClick={postFunction}> Post </button>
          <button onClick={fetchFunction}> Fetch </button>
          {/* Post a Question */}

          { tmpDataArray.length !== 0 && 
            tmpDataArray.map((object: any) => 
              <Coursecard key={object.key} data={object} pathID={"1"}></Coursecard>
            )

          }
        </section>

        {/* Leaderboard */}
        <aside>
          <Leaderboard data={null}/>
        </aside>
      </main>
    </>
  )
}

export default React.memo(Home)

export async function getServerSideProps() {

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

  return {
    props: {
      dataArray: tmpArray,
    }
  }
}