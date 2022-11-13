import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { initializeApp } from 'firebase/app'
import { getDatabase , ref, get, child } from "firebase/database"
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../../../components/navbar/navbar'
import { firebaseConfig } from '../../../../utils'
import styles from '../../../../styles/Thread.module.scss'
import Leaderboard from '../../../../components/leaderboard/leaderboard'
import DownArrow from '../../../../public/downArrow.png'
import UpArrow from '../../../../public/upArrow.png'



const PostPage: NextPage<any> = ({dataDict, dataArray}) => {
  const router = useRouter();

  useEffect(() => {
    if(dataDict === null) router.push("/Error")
  }, [])

  return (
    <>
      <Head>
        <title> Title </title>
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

      <section>

      <div className={styles.original}>


        <h1> {dataDict.title} </h1>
        <h2> {dataDict.op} </h2>
        <h3> {dataDict.content} </h3>

        <div className={styles.replyContainer}>
          <textarea className={styles.reply} placeholder="What are your thoughts?" id={"title"}></textarea>
        </div>

        <button className={styles.postReply}>Post</button>

      </div>

      
      <div className={styles.otherReply}>
      {
        dataArray.length !== 0 && 
        dataArray.map((object: any, idx: number) => 
            <div key={`container-${idx}`} className={styles.replies}>
              <h1 key={`user}${idx}`}> {object.user} </h1>
              <h2 key={`content-${idx}`}> {object.content} </h2>
            </div>
        )
      }
      </div>
      </section>
      {/* Leaderboard */}
        <aside>
          <Leaderboard data={null}/>
        </aside>
      </main>
    </>
  )
}

export default PostPage

export async function getServerSideProps(context: any) {
  console.log(context.params.Major)
  console.log(context.params.Course)
  console.log(context.params.PostID)

  const app = initializeApp(firebaseConfig)
  const database = getDatabase(app);

  let data: any = null;

  try {
    await get(child(ref(database), '/major/' + context.params.Major + '/courses/' 
      + context.params.Course.toString().toUpperCase() + "/posts/"
      + context.params.PostID)).then((snapshot) => {
        data = snapshot.val();
    }).catch((error) => {
        console.log(error)
    })
  } catch (error) {
    console.log("ewww more error")
  }

  let tmpList: any = []
  if (data !== null) {
    for (const object in data["comment"]) {
      if (object !== null) tmpList.push(data["comment"][object])
    }
  }

  console.log(tmpList)

  return {
    props: {
      dataArray: tmpList,
      dataDict: data
    }
  }
}
