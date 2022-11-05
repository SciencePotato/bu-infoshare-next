import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../../../components/navbar/navbar'
import Post from '../../../components/post/Post'
import PostQ from '../../../components/postQ/postquestion'
import CourseHeader from '../../../components/courseHeader/courseHeader'
import Leaderboard from '../../../components/leaderboard/leaderboard'
import styles from '../../../styles/CoursePage.module.scss'
import { initializeApp } from 'firebase/app'
import { getDatabase , ref, get, child } from "firebase/database"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { firebaseConfig } from '../../../utils'

const Course: NextPage<any> = ({dataArray, dataKey, curData}) => {
    const router = useRouter()
    const [tmpDataArray, setDataArray] = useState(dataArray);

    const fetchFunction = async () => {
      let path = document.location.pathname
      let pathArray = path.split("/").slice(1)
      path = "/major/" + pathArray[0].toLowerCase() + "/courses/" + pathArray[1].toUpperCase()
      const response = await fetch(`${document.location.origin}/api/read`, {
        method: 'POST',
        body: JSON.stringify({"path": path}),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(response.json().then((res) => console.log(res)))
    }

    useEffect(() => {
      if (curData === null) {router.push("/Error")}
    }, [])

    return (
        <>
          <Head>
            <title> {dataKey.toUpperCase()}: {curData !== null? curData.courseName: "Loading..."} </title>
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
    
            {/* Posts/Feed */}
            <section> 

              <CourseHeader data={curData} courseNum={dataKey.toString().toUpperCase()}></CourseHeader>

              {/* Post a Question */}

              <button onClick={fetchFunction}> Fetch </button>
              <PostQ></PostQ>

              { dataArray.length !== 0 && 
                dataArray.map((object: any) =>
                  <div key={`post${object.key}`}>
                    {/* Post ID */}
                    <div key={`key${object.key}`}> 
                      {object.key}
                    </div>
                    <div key={`title${object.key}`}>
                      {object.value.title}
                      <div key={`op${object.key}`}>
                        {object.value.op}
                      </div>
                      <div key={`content${object.key}`}>
                        {object.value.content}
                      </div>
                    </div>
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

export default Course

export async function getServerSideProps(context: any) {
  const app = initializeApp(firebaseConfig)
  const database = getDatabase(app);

  let data: any = null;

  try {
    await get(child(ref(database), '/major/' + context.params.Major + '/courses/' + context.params.Course.toString().toUpperCase())).then((snapshot) => {
        data = snapshot.val();
    }).catch((error) => {
        console.log(error)
    })
  } catch (error) {
    console.log("ewww more error")
  }

  let tmpList = []

  if (data !== null) {
    for (const property in data["posts"]) {
      let tmpObj = {
        key: property,
        value: data["posts"][property]
      }

      tmpList.push(tmpObj)
    }
  }
  
  return {
    props: {
      dataArray: tmpList,
      dataKey: context.params.Course,
      curData: data
    }
  }
}