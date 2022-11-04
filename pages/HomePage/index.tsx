import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../../components/navbar/navbar'
import styles from '../../styles/HomePage.module.scss'
import Post from '../../components/post/Post'
import Leaderboard from '../../components/leaderboard/leaderboard'
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, child } from 'firebase/database';
import React, { useEffect } from 'react';
import { firebaseConfig } from '../../utils'
import { useRouter } from 'next/router'



const Home: NextPage<any> = ({dataArray}) => {

  const router = useRouter();
  useEffect(() => {
    console.log(router?.basePath)
  }, [router.isReady])

  const postFunction = async () => {
    console.log(document.location)
    const response = await fetch(`${document.location.origin}/api/post`, {
      method: "POST"
    })
  }

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
          <button onClick={postFunction}> CLick </button>
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