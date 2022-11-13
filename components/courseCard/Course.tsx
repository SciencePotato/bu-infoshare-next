import styles  from '../../styles/CourseCard.module.scss';
import Image from 'next/image'
import DownArrow from '../../public/downArrow.png'
import UpArrow from '../../public/upArrow.png'
import Like from '../../public/like.png'
import Comment from '../../public/comment.png'
import Repost from '../../public/repost.png'
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
    pathID: string | null
}

const CourseCard: NextPage<Props> = ({data}) => {
    return (
        <>
            <div className={styles.post}>
             
                <div>
                    <div className={styles.name}> <h2> {data.key} </h2> </div>  
                    <div className={styles.courseTitle}>  {data.value.courseName}  </div>  
                </div>
            </div>
            
        </>
    )
}

export default CourseCard