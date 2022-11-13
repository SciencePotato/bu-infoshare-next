import styles  from '../../styles/MajorCard.module.scss';
import Image from 'next/image'
import DownArrow from '../../public/downArrow.png'
import UpArrow from '../../public/upArrow.png'
import Like from '../../public/like.png'
import Comment from '../../public/comment.png'
import Repost from '../../public/repost.png'
import Link from 'next/link'


import { NextPage } from 'next';

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

const MajorCard: NextPage<Props> = ({data, pathID}) => {

    let major = data.key;

    if (major == "computerscience") {
        major = "Computer Science"
    } else if (major == "datascience") {
        major = "Data Science"
    } else if (major == "computerengineering") {
        major = "Computer Engineering"
    } else {
        major = major.charAt(0).toUpperCase() + major.slice(1).toLowerCase()
    }

    return (
        <>
        <Link href={pathID} >
            <div style={{"cursor": "pointer"}} className={styles.post}>
             
                <div>
                    <div className={styles.name}> <h2> {major} </h2> </div>  
                </div>
            </div>
        </Link>
        </>
    )
}

export default MajorCard