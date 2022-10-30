import type { NextPage } from 'next'
import Head from 'next/head'
import Navbar from '../../../components/navbar/navbar'
import Post from '../../../components/post/Post'
import PostQ from '../../../components/postQ/postquestion'
import CourseHeader from '../../../components/courseHeader/courseHeader'
import Leaderboard from '../../../components/leaderboard/leaderboard'
import styles from '../../../styles/CoursePage.module.scss'
import { initializeApp } from 'firebase/app'
import { getDatabase , ref, onValue } from "firebase/database"
import { useEffect, useState } from 'react'
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

const Course: NextPage<any> = ({dataArray, dataKey}) => {
    const [course, setCourse] = useState(null)
    const [currentCourse, setCurrentCourse] = useState<any>(null)
    const [currentCourseArray, setCurrentCourseArray] = useState<any>([])
    const router = useRouter()

    const getData = (path: string) => {
      return onValue(ref(database, path), (snapshot) => {
          const course = snapshot.val()
          setCourse(course)
      }, {
          onlyOnce: true
      });
    }
    
    useEffect(() => {
      if (!router.isReady) return;
      const id = router.query;
      let path = "/major"
      path += "/" + id.Major!.toString().toLowerCase() + "/courses";
      if (course === null) {
        getData(path)
      } else {
        if (id.Course!.toString().toUpperCase() in course) {
          setCurrentCourse(course[id.Course!.toString().toUpperCase()]["posts"])
        } else{
          router.push("/Error")
        }
      }
    }, [router.isReady, course])

    useEffect(() => {
        if (currentCourse === null) return;
        let tmpArray = [];

        for (const property in currentCourse) {
          let tmpObj = {
            key: property,
            value: currentCourse[property]
          }
          tmpArray.push(tmpObj)
        }

        setCurrentCourseArray(tmpArray)
    }, [currentCourse])

    return (
        <>
          <Head>
            <title> {router.isReady? router.query.Course!.toString().toUpperCase(): "Loading..."} </title>
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

    
            {/* Posts/Feed */}
            <section> 

              <CourseHeader data={course} courseNum={router.isReady? router.query.Course!.toString().toUpperCase(): "1"}></CourseHeader>

              {/* Post a Question */}

              <PostQ></PostQ>

              { currentCourseArray.length !== 0 && 
                currentCourseArray.map((object: any) =>
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
  console.log(context.params.Major)
  console.log(context.params.Course)
  
  return {
    props: {
      dataArray: {},
      dataKey: {}
    }
  }
}