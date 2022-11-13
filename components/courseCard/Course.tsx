import styles  from '../../styles/CourseCard.module.scss';
import Image from 'next/image'
import DownArrow from '../../public/downArrow.png'
import UpArrow from '../../public/upArrow.png'
import Like from '../../public/like.png'
import Comment from '../../public/comment.png'
import Repost from '../../public/repost.png'
import { NextPage } from 'next';
import Link from 'next/link'

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

const CourseCard: NextPage<Props> = ({data, pathID}) => {
    return (
        <>
        
            <div className={styles.post}>
             
            <div className={styles.contentContainer}>
                    <div className={styles.name}> <h2> {data.key} </h2> </div>  
                    <div className={styles.courseTitle}>  <h3>{data.value.courseName}</h3>  </div>  
                    <div className={styles.description}><h4>Description of Course: Lorem Ipsum placeholder text and placeholder paragraphs</h4></div>
                    <Link href={pathID + '/' + data.key} >
                        <button style={{"cursor": "pointer"}} className={styles.nextPage}>Go To Page</button>
                    </Link>
                </div>
            </div>
    
        </>
    )
}

export default CourseCard