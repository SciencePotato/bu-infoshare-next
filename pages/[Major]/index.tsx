import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
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

const Major: NextPage = () => {
    const [majors, setMajors] = useState(null)
    const router = useRouter()

    const getData = () => {
        return onValue(ref(database, '/major'), (snapshot) => {
            const major = snapshot.val()
            setMajors(major)
        }, {
            onlyOnce: true
        });
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
        <h1> Major </h1>
    )
}

export default Major