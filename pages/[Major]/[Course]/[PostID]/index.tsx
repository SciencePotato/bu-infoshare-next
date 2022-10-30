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

const Home: NextPage<any> = () => {
  const [post, setPost] = useState(null);
  const router = useRouter();

  const getData = (path: string) => {
    return onValue(ref(database, path), (snapshot) => {
        const post = snapshot.val()
        setPost(post)
    }, {
        onlyOnce: true
    });
  }

  return (
    <h1> ID </h1>
  )
}

export default Home

export async function getServerSideProps(context: any) {

  return {
    props: {
      dataArray: {}
    }
  }
}
