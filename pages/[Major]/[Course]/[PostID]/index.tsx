import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { initializeApp } from 'firebase/app'
import { getDatabase , ref, get, child } from "firebase/database"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../../../components/navbar/navbar'
import { firebaseConfig } from '../../../../utils'
import styles from '../../../../styles/Thread.module.scss'
import DownArrow from '../../../../public/downArrow.png'
import UpArrow from '../../../../public/upArrow.png'
import UpArrowFilled from '../../../../public/filledup.png'
import downArrowFilled from '../../../../public/filleddown.png'
import Comment from '../../../../components/comment/Comment'



const PostPage: NextPage<any> = ({dataDict, dataArray, dataKeyPath}) => {
  const router = useRouter();
  const [tmpDataArray, setTmpDataArray] = useState(dataArray)
  const [originalState, setOriginalState] = useState(dataArray)

  const [vote, setVote] = useState(dataDict.votes)
  const [upvote, setUpvote] = useState(dataDict.upvoters)
  const [downvote, setDownvote] = useState(dataDict.downvoters)
  const [currUp, setCurrup] = useState(false)
  const [currdown, setcurrdown] = useState(false)

  useEffect (() => {
    let voter:string = localStorage.getItem("user")!
    if (voter in upvote === true){
        setCurrup(upvote[voter])
    }
    if (voter in downvote === true){
        setcurrdown(downvote[voter])
    }
  })


  const postFunction = async () => {
    let path = document.location.pathname
    let pathArray = path.split("/").slice(1)
    path = "/major/" + pathArray[0].toLowerCase() + "/courses/" + pathArray[1].toUpperCase() + "/posts/" + pathArray[2].toLowerCase() + "/comment"
    
    let titleWrapper = document.getElementById("title") as HTMLInputElement | null

    if (localStorage.getItem("user") != null) {
      const response = await fetch(`${document.location.origin}/api/postComment`, {
        method: 'POST',
        body: JSON.stringify({
          "path": path,
          "content": (titleWrapper !== null)? titleWrapper.value: "NULL",
          "user": (localStorage.getItem("user")),
          "votes": 1
        }), 
        headers: {
          'Content-Type': 'application/json'
        }
      })
      
      let data: any = null
      response.json().then((res) => {
        data = res 
        let tmpList = []

        if (data !== null) {
          for (const object in data) {
            if (object !== null) tmpList.push(data[object])
          }
        }

          tmpList = tmpList.filter((object: any) => object != null)
          setTmpDataArray(tmpList)
      })
    }
  }

  const upFunction = async () => {

    console.log(upvote)
    console.log(downvote)

    let path = document.location.pathname
    let pathArray = path.split("/").slice(1)

    path = "/major/" + pathArray[0].toLowerCase() + "/courses/" + pathArray[1].toUpperCase() + "/posts/" + pathArray[2]
    
    if (localStorage.getItem("user") !== null && localStorage.getItem("user") !== dataDict.op) {

        let upvoter:string = localStorage.getItem("user")!

        if (upvoter in upvote === true){

            if (upvoter in downvote === true){

                if (upvote[upvoter] === false && downvote[upvoter] === false){
                    let voterList = upvote
                    voterList[upvoter] = true
                    setUpvote(voterList)

                    console.log(upvote)

                    const response = await fetch(`${document.location.origin}/api/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "path": path,
                            "votes": vote + 1,
                            "upvoters": upvote,
                            "downvoters": downvote
                        })
                    })
                    response.json().then((res) => {
                        
                        console.log(res)
                        setVote(res["votes"])

                    })
                    .catch((err) => {
                        console.log(err);
                    });
                } else if (upvote[upvoter] === false && downvote[upvoter] === true) {
                    
                    let voterList = upvote
                    let voterList2 = downvote
                    voterList[upvoter] = true
                    voterList2[upvoter] = false
                    setUpvote(voterList)
                    setDownvote(voterList2)

                    console.log(upvote)
                    console.log(downvote)

                    const response = await fetch(`${document.location.origin}/api/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "path": path,
                            "votes": vote + 2,
                            "upvoters": upvote,
                            "downvoters": downvote
                        })
                    })
                    response.json().then((res) => {
                        
                        console.log(res)
                        setVote(res["votes"])

                    })
                    .catch((err) => {
                        console.log(err);
                    });
                } else if (upvote[upvoter] === true && downvote[upvoter] === false) {
                    
                    let voterList = upvote
                    voterList[upvoter] = false
                    setUpvote(voterList)

                    console.log(upvote)

                    const response = await fetch(`${document.location.origin}/api/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "path": path,
                            "votes": vote - 1,
                            "upvoters": upvote,
                            "downvoters": downvote
                        })
                    })
                    response.json().then((res) => {
                        
                        console.log(res)
                        setVote(res["votes"])

                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }

            } else {

                if (upvote[upvoter] === false){
                    let voterList = upvote
                    voterList[upvoter] = true
                    setUpvote(voterList)

                    console.log(upvote)

                    const response = await fetch(`${document.location.origin}/api/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "path": path,
                            "votes": vote + 1,
                            "upvoters": upvote,
                            "downvoters": downvote
                        })
                    })
                    response.json().then((res) => {
                        
                        console.log(res)
                        setVote(res["votes"])

                    })
                    .catch((err) => {
                        console.log(err);
                    });
                } else if (upvote[upvoter] === true) {

                    let voterList = upvote
                    voterList[upvoter] = false
                    setUpvote(voterList)

                    console.log(upvote)

                    const response = await fetch(`${document.location.origin}/api/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "path": path,
                            "votes": vote - 1,
                            "upvoters": upvote,
                            "downvoters": downvote
                        })
                    })
                    response.json().then((res) => {
                        
                        console.log(res)
                        setVote(res["votes"])

                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }
            }

        } else {

            if (upvoter in downvote === true){

                if (downvote[upvoter] === true) {

                    let voterList = upvote
                    let voterList2 = downvote
                    voterList[upvoter] = true
                    voterList2[upvoter] = false
                    setUpvote(voterList)
                    setDownvote(voterList2)

                    console.log(upvote)
                    console.log(downvote)

                    const response = await fetch(`${document.location.origin}/api/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "path": path,
                            "votes": vote + 2,
                            "upvoters": upvote,
                            "downvoters": downvote
                        })
                    })
                    response.json().then((res) => {
                        console.log(res)
                        setVote(res["votes"])
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                } else {

                    let voterList = upvote
                    voterList[upvoter] = true
                    setUpvote(voterList)

                    console.log(upvote)
                    console.log(downvote)

                    const response = await fetch(`${document.location.origin}/api/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "path": path,
                            "votes": vote + 1,
                            "upvoters": upvote,
                            "downvoters": downvote
                        })
                    })
                    response.json().then((res) => {
                        console.log(res)
                        setVote(res["votes"])
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }

            } else {

                    let voterList = upvote
                    voterList[upvoter] = true
                    setUpvote(voterList)

                    console.log(upvote)
                    console.log(downvote)

                    const response = await fetch(`${document.location.origin}/api/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "path": path,
                            "votes": vote + 1,
                            "upvoters": upvote,
                            "downvoters": downvote
                        })
                    })
                    response.json().then((res) => {
                        console.log(res)
                        setVote(res["votes"])
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }

    }
  }

  const downFunction = async () => {

    let path = document.location.pathname
    let pathArray = path.split("/").slice(1)
    path = "/major/" + pathArray[0].toLowerCase() + "/courses/" + pathArray[1].toUpperCase() + "/posts/" + pathArray[2]
    if (localStorage.getItem("user") !== null && localStorage.getItem("user") !== dataDict.op) {

        let downvoter:string = localStorage.getItem("user")!

        if (downvoter in downvote === true){

            if (downvoter in upvote === true){

                if (upvote[downvoter] === false && downvote[downvoter] === false){
                    let voterList = downvote
                    voterList[downvoter] = true
                    setDownvote(voterList)

                    console.log(downvote)

                    const response = await fetch(`${document.location.origin}/api/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "path": path,
                            "votes": vote - 1,
                            "upvoters": upvote,
                            "downvoters": downvote
                        })
                    })
                    response.json().then((res) => {
                        
                        console.log(res)
                        setVote(res["votes"])

                    })
                    .catch((err) => {
                        console.log(err);
                    });
                } else if (upvote[downvoter] === true && downvote[downvoter] === false) {
                    
                    let voterList = upvote
                    let voterList2 = downvote
                    voterList[downvoter] = false
                    voterList2[downvoter] = true
                    setUpvote(voterList)
                    setDownvote(voterList2)

                    console.log(upvote)
                    console.log(downvote)

                    const response = await fetch(`${document.location.origin}/api/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "path": path,
                            "votes": vote - 2,
                            "upvoters": upvote,
                            "downvoters": downvote
                        })
                    })
                    response.json().then((res) => {
                        
                        console.log(res)
                        setVote(res["votes"])

                    })
                    .catch((err) => {
                        console.log(err);
                    });
                } else if (upvote[downvoter] === false && downvote[downvoter] === true) {
                    
                    let voterList = downvote
                    voterList[downvoter] = false
                    setDownvote(voterList)

                    console.log(downvote)

                    const response = await fetch(`${document.location.origin}/api/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "path": path,
                            "votes": vote + 1,
                            "upvoters": upvote,
                            "downvoters": downvote
                        })
                    })
                    response.json().then((res) => {
                        
                        console.log(res)
                        setVote(res["votes"])

                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }

            } else {

                if (downvote[downvoter] === false){
                    let voterList = downvote
                    voterList[downvoter] = true
                    setDownvote(voterList)

                    console.log(downvote)

                    const response = await fetch(`${document.location.origin}/api/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "path": path,
                            "votes": vote - 1,
                            "upvoters": upvote,
                            "downvoters": downvote
                        })
                    })
                    response.json().then((res) => {
                        
                        console.log(res)
                        setVote(res["votes"])

                    })
                    .catch((err) => {
                        console.log(err);
                    });
                } else if (downvote[downvoter] === true) {

                    let voterList = downvote
                    voterList[downvoter] = false
                    setDownvote(voterList)

                    console.log(downvote)

                    const response = await fetch(`${document.location.origin}/api/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "path": path,
                            "votes": vote + 1,
                            "upvoters": upvote,
                            "downvoters": downvote
                        })
                    })
                    response.json().then((res) => {
                        
                        console.log(res)
                        setVote(res["votes"])

                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }
            }

        } else {

            if (downvoter in upvote === true){

                if (upvote[downvoter] === true) {

                    let voterList = upvote
                    let voterList2 = downvote
                    voterList[downvoter] = false
                    voterList2[downvoter] = true
                    setUpvote(voterList)
                    setDownvote(voterList2)

                    console.log(upvote)
                    console.log(downvote)

                    const response = await fetch(`${document.location.origin}/api/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "path": path,
                            "votes": vote - 2,
                            "upvoters": upvote,
                            "downvoters": downvote
                        })
                    })
                    response.json().then((res) => {
                        console.log(res)
                        setVote(res["votes"])
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                } else {
                    let voterList = downvote
                    voterList[downvoter] = true
                    setDownvote(voterList)

                    console.log(upvote)
                    console.log(downvote)

                    const response = await fetch(`${document.location.origin}/api/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "path": path,
                            "votes": vote - 1,
                            "upvoters": upvote,
                            "downvoters": downvote
                        })
                    })
                    response.json().then((res) => {
                        console.log(res)
                        setVote(res["votes"])
                    })
                    .catch((err) => {
                        console.log(err);
                    });
                }
            } else {

                    let voterList = downvote
                    voterList[downvoter] = true
                    setDownvote(voterList)

                    console.log(upvote)
                    console.log(downvote)

                    const response = await fetch(`${document.location.origin}/api/update`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            "path": path,
                            "votes": vote - 1,
                            "upvoters": upvote,
                            "downvoters": downvote
                        })
                    })
                    response.json().then((res) => {
                        console.log(res)
                        setVote(res["votes"])
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }

    }
  }

  useEffect(() => {
    if(dataDict === null) router.push("/Error")
  }, [])

  useEffect(() => {
    if (tmpDataArray.length > originalState.length)
      setOriginalState(tmpDataArray.reverse())
  }, [tmpDataArray])

  return (
    <>
      <Head>
        <title> Title </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar data={(dataArray.length > originalState.length)? dataArray: originalState} tmpData={tmpDataArray} setData={setTmpDataArray} filterComment={true}/>

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
        <div className={styles.side}>
          <div> {currUp ? <Image src={UpArrowFilled} onClick={upFunction} width={35} height={35} className={styles.upvotearrow}/>: <Image src={UpArrow} onClick={upFunction} width={35} height={35} className={styles.upvotearrow}/>} </div>
          <div className={styles.score}>{vote}</div>
          <div> {currdown ? <Image src={downArrowFilled} onClick={downFunction} width={35} height={35} className={styles.downvotearrow}/>: <Image src={DownArrow} onClick={downFunction} width={35} height={35} className={styles.downvotearrow}/>} </div>
        </div>
        <div>
          <h1> {dataDict.title} </h1>
          <h2> {dataDict.op} </h2>
          <h3> {dataDict.content} </h3>
        </div>
      </div>

      <div className={styles.replyContainer}>
        <div className={styles.replyBox}>
          <textarea className={styles.reply} placeholder="What are your thoughts?" id={"title"}></textarea>
        </div>
        <button className={styles.postReply} onClick={postFunction}> Post </button>
      </div>

      
      <div className={styles.otherReply}>
      {
        tmpDataArray.length !== 0 && 
        tmpDataArray.map((object: any, idx: number) => 
            <div key={idx} className={styles.replies}>

              <Comment data={object} commentID={idx} first={true}></Comment>
              
            </div>
        )
      }
      </div>
      </section>
      {/* Leaderboard */}
        <aside>
          {/* <Leaderboard data={null}/> */}
        </aside>
      </main>
    </>
  )
}

export default PostPage

export async function getServerSideProps(context: any) {

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


  return {
    props: {
      dataArray: tmpList,
      dataDict: data,
      dataKeyPath: context.params.PostID
    }
  }
}
