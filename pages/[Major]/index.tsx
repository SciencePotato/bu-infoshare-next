import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Leaderboard from '../../components/leaderboard/leaderboard'
import Navbar from '../../components/navbar/navbar'
import PostQ from '../../components/postQ/postquestion'
import CourseHeader from '../../components/courseHeader/courseHeader'
import styles from '../../styles/CoursePage.module.scss'
import { initializeApp } from 'firebase/app'
import { getDatabase , ref, onValue, child, get } from "firebase/database"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


const Major: NextPage<any> = ({dataArray, dataKey}) => {

    console.log(dataArray)
    return (
        <>
            <Head>
                <title> {dataKey} </title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {
                (dataArray === null)? <h1> Null </h1>:
                dataArray.map((object: any) => 
                    <>
                        <div key={object.key}> {object.key} </div>
                        <div key={`content-${object.key}`}> {object.value.courseName} </div>
                    </>
                )
            }
        </>
    )
}

export default Major

export async function getServerSideProps(context: any) {

    const firebaseConfig = {
        apiKey: "AIzaSyD-sgjpJ5oJr1lbD7oxlgPdZbQxESPWXdw",
        authDomain: "buinfoshare.firebaseapp.com",
        databaseURL: "https://buinfoshare-default-rtdb.firebaseio.com/",
        projectId: "buinfoshare",
        storageBucket: "buinfoshare.appspot.com",
    }

    const app = initializeApp(firebaseConfig)
    const database = getDatabase(app);
    
    let data: any = null

    await get(child(ref(database), '/major/' + context.params.Major + '/courses/')).then((snapshot) => {
        data = snapshot.val();
    }).catch((error) => {
        console.log(error)
        return null
    })

    let tmpArray: any = []
    for (const property in data) {
        let tmpObj = {
            key: property,
            value: data[property]
        }
        tmpArray.push(tmpObj)
    }

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        if(!router.isReady) return;
        const id = router.query;
        const path = id.Major!.toString().toLowerCase()
        if (majors !== null) {
            console.log(path)
            if (path in majors) {
                // Do something here otherwise like populate stuff
                console.log(majors)
            } else {
                router.push('/Error')
            }
        }
    }, [router.isReady, majors])

    return (
        <>
            <Head>
                <title> {router.isReady? router.query.Major!.toString().toLowerCase(): "Loading..."} </title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <h1> {router.isReady? router.query.Major!.toString().toLowerCase(): "Loading..."} </h1>
        </>
    )
}