import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { initializeApp } from 'firebase/app'
import { getDatabase , ref, child, get } from "firebase/database"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'


const Major: NextPage<any> = ({dataDict, dataArray, dataKey}) => {
    const router = useRouter();

    useEffect(() => {
        if (dataDict === null) {
            router.push("/Error")
        }
    }, [])

    return (
        <>
            <Head>
                <title> Majors </title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

                {
                    (dataArray === null)? <h1> Null </h1>:
                    dataArray.map((object: any) => 
                    <div key={`container${object.key}`}>
                        <div key={object.key}> {object.key} </div>
                        <div key={`content-${object.key}`}> {object.value.courseName} </div>
                    </div>
                )
            }
        </>
    )
}

export default Major

export async function getServerSideProps(context: any) {

    const firebaseConfig = {
        apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
        authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTHDOM,
        databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECTID,
        storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE,
    }

    console.log(process.env.NEXT_PUBLIC_FIREBASE_API)

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