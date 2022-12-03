import { NextPage } from 'next';
import DownArrow from '../../public/downArrow.png'
import UpArrow from '../../public/upArrow.png'
import UpArrowFilled from '../../public/filledup.png'
import DownArrowFilled from '../../public/filleddown.png'
import styles  from '../../styles/Comment.module.scss';
import Image from 'next/image'
import { useEffect, useState } from 'react'



interface Props {
    /*data: dataType | null */
    data: any,
    commentID: number,
    first: boolean
}

const Comment: NextPage<Props> = ({data, commentID, first}) => {

    const [vote, setVote] = useState(data.votes)
    const [upvote, setUpvote] = useState(data.upvoters)
    const [downvote, setDownvote] = useState(data.downvoters)

    const [one, SetOne] = useState(first)

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

    useEffect(() => {
        console.log(commentID)
        if (one === true) {
            setVote(data.votes)
        }
    })

    const upFunction = async () => {

        SetOne(false)

        console.log(upvote)
        console.log(downvote)

        let path = document.location.pathname
        let pathArray = path.split("/").slice(1)

        path = "/major/" + pathArray[0].toLowerCase() + "/courses/" + pathArray[1].toUpperCase() + "/posts/" + pathArray[2] + "/comment/" + String(commentID+1)
        console.log(path)
        if (localStorage.getItem("user") !== null && localStorage.getItem("user") !== data.user) {

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

        SetOne(false)

        let path = document.location.pathname
        let pathArray = path.split("/").slice(1)
        console.log(path)
        path = "/major/" + pathArray[0].toLowerCase() + "/courses/" + pathArray[1].toUpperCase() + "/posts/" + pathArray[2] + "/comment/" + String(commentID+1)
        console.log(path)
        if (localStorage.getItem("user") !== null && localStorage.getItem("user") !== data.user) {

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


    return (
        <div className={styles.container}>
            <div className={styles.side}>
                <div> {currUp ? <Image src={UpArrowFilled} onClick={upFunction} width={30} height={30} className={styles.upvotearrow}/>: <Image src={UpArrow} onClick={upFunction} width={30} height={30} className={styles.upvotearrow}/>} </div>
                <div className={styles.score}>{vote}</div>
                <div> {currdown ? <Image src={DownArrowFilled} onClick={downFunction} width={35} height={35} className={styles.downvotearrow}/>: <Image src={DownArrow} onClick={downFunction} width={35} height={35} className={styles.downvotearrow}/>} </div>
            </div>
            <div>
                <h1> {data.user} </h1>
                <h2> {data.content} </h2>
            </div>
        </div>
    )

}

export default Comment