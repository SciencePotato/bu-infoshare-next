import styles  from '../../styles/Post.module.scss';
import Image from 'next/image'
import DownArrow from '../../public/downArrow.png'
import UpArrow from '../../public/upArrow.png'
import Like from '../../public/like.png'
import Comment from '../../public/comment.png'
import Repost from '../../public/repost.png'
import { NextPage } from 'next';
import Link from 'next/link'
import { useEffect, useState } from 'react'



interface commentType {
    content: string,
    user: string
}

interface dataType {
    title: string,
    op: string,
    content: string,
    comment: commentType [] | null
}

interface Props {
    /*data: dataType | null */
    data: any,
    pathID: string 
}

const Post: NextPage<Props> = ({data, pathID}) => {

    const [vote, setVote] = useState(data.value.votes)
    const [upvote, setUpvote] = useState(data.value.upvoters)
    const [downvote, setDownvote] = useState(data.value.downvoters)

    const upFunction = async () => {

        let path = document.location.pathname
        let pathArray = path.split("/").slice(1)

        path = "/major/" + pathArray[0].toLowerCase() + "/courses/" + pathArray[1].toUpperCase() + "/posts/" + `${data.key}`
        
        if (localStorage.getItem("user") !== null) {

            let upvoter:string = localStorage.getItem("user")!

            if (upvoter in upvote === true){

                if (upvoter in downvote === true){

                    if (upvote[upvoter] === false && downvote[upvoter] === false){
                        let voterList = upvote
                        voterList[upvoter] = true
                        setUpvote(voterList)

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
                            setVote(res["votes"])
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    } else if (upvote[upvoter] === true && downvote[upvoter] === false) {
                        
                        let voterList = upvote
                        voterList[upvoter] = false
                        setUpvote(voterList)

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
                            setVote(res["votes"])
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    } else if (upvote[upvoter] === true) {

                        let voterList = upvote
                        voterList[upvoter] = false
                        setUpvote(voterList)

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
                            setVote(res["votes"])
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    } else {

                        let voterList = upvote
                        voterList[upvoter] = true
                        setUpvote(voterList)

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
        path = "/major/" + pathArray[0].toLowerCase() + "/courses/" + pathArray[1].toUpperCase() + "/posts/" + `${data.key}`
        if (localStorage.getItem("user") !== null) {

            let downvoter:string = localStorage.getItem("user")!

            if (downvoter in downvote === true){

                if (downvoter in upvote === true){

                    if (upvote[downvoter] === false && downvote[downvoter] === false){
                        let voterList = downvote
                        voterList[downvoter] = true
                        setDownvote(voterList)

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
                            setVote(res["votes"])

                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    } else if (upvote[downvoter] === false && downvote[downvoter] === true) {
                        
                        let voterList = downvote
                        voterList[downvoter] = false
                        setDownvote(voterList)

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
                            setVote(res["votes"])

                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    } else if (downvote[downvoter] === true) {

                        let voterList = downvote
                        voterList[downvoter] = false
                        setDownvote(voterList)

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
                            setVote(res["votes"])
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                    } else {
                        let voterList = downvote
                        voterList[downvoter] = true
                        setDownvote(voterList)

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
                            setVote(res["votes"])
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                }
            }

        }
    }


    return (
        <>
        <div>
        
            <div className={styles.post}>
                {/* Upvotes */}
                <div>
                    <div> <Image src={UpArrow} onClick={upFunction}/> </div>
                    <div> {vote} </div>
                    <div> <Image src={DownArrow} onClick={downFunction}/> </div>
                </div>
                {/* Contents */}
                <Link href={pathID}>
                <div style={{"cursor": "pointer"}}>
                    <div className={styles.name}> <h2> {data.value.op} </h2> </div>
                    <div className={styles.time}> <h3> 30 mins ago </h3></div>
                    <div className={styles.title} > <h1> {data.value.title} </h1> </div>
                    <div className={styles.content}>{data.value.content} </div>
                </div>
                </Link>
            </div>
           
            <div className={styles.postBot}>
                <div> 
                    <div>
                        <Image src={Like} width={30} height={30}/> <p>Like </p>
                    </div>
                </div>
                
                <div> 
                    <div>
                        <Image src={Comment} width={30} height={30}/> <p> Comment</p>
                    </div>
                </div>

                <div> 
                    <div>
                        <Image src={Repost} width={30} height={30}/> <p> Repost </p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Post