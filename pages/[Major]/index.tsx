import type { NextPage } from 'next'
import Head from 'next/head'
import { initializeApp } from 'firebase/app'
import { getDatabase , ref, child, get } from "firebase/database"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { firebaseConfig } from '../../utils'
import Navbar from '../../components/navbar/navbar'
import Coursecard from '../../components/courseCard/Course'
import styles from '../../styles/MajorPage.module.scss'
import React from 'react'
import Leaderboard from '../../components/leaderboard/leaderboard'



const Major: NextPage<any> = ({dataDict, dataArray, dataKey}) => {
    const router = useRouter();
    const [tmpDataArray, setDataArray] = useState(dataArray);
    
    useEffect(() => {
        if (dataDict === null) {router.push("/Error")}
    }, [])

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
          <div>
          
          {/* Post a Question */}

          {
                (dataArray === null)? <h1> Null </h1>:
                tmpDataArray.map((object: any) => 
                <div key={object.key}>

                    <Coursecard data={object} pathID={"1"}></Coursecard>

                </div>
                    /*<div key={object.key}> {object.key} </div>
                    <div key={`content-${object.key}`}> {object.value.courseName} </div>
                    */
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

export default Major

export async function getServerSideProps(context: any) {

    const app = initializeApp(firebaseConfig)
    const database = getDatabase(app);
    
    let data: any = null

    await get(child(ref(database), '/major/' + context.params.Major + '/courses/')).then((snapshot) => {
        data = snapshot.val();
    }).catch((error) => {
        console.log(error)
    })

    let tmpArray: any = []
    for (const property in data) {
        let tmpObj = {
            key: property,
            value: data[property]
        }
        tmpArray.push(tmpObj)
    }

    return {
        props: {
            dataDict: data,
            dataArray: tmpArray,
            dataKey: context.params.Major
        }
    }
}