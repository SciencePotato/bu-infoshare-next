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
    const [voters, setVoters] = useState(data.value.voters)

    const upFunction = async () => {

        console.log(voters)

        let path = document.location.pathname
        let pathArray = path.split("/").slice(1)

        path = "/major/" + pathArray[0].toLowerCase() + "/courses/" + pathArray[1].toUpperCase() + "/posts/" + `${data.key}`
        
        if (localStorage.getItem("user") !== null) {
            const response = await fetch(`${document.location.origin}/api/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "path": path,
                    "votes": vote + 1
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

    const downFunction = async () => {

        let path = document.location.pathname
        let pathArray = path.split("/").slice(1)

        path = "/major/" + pathArray[0].toLowerCase() + "/courses/" + pathArray[1].toUpperCase() + "/posts/" + `${data.key}`
        
        if (localStorage.getItem("user") !== null) {
            const response = await fetch(`${document.location.origin}/api/update`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "path": path,
                    "votes": vote - 1
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
                <div> <Image src={Like} width={30} height={30}/> Like </div>
                
                    <div> <Image src={Comment} width={30} height={30}/> Comment </div>
                
                <div> <Image src={Repost} width={30} height={30}/> Repost </div>
            </div>
        </div>
        </>
    )
}

export default Post