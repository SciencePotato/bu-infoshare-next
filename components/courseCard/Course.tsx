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

    let course = data.key;

    if (course == "computerscience") {
        course = "Computer Science"
    } else if (course == "datascience") {
        course = "Data Science"
    } else if (course == "computerengineering") {
        course = "Computer Engineering"
    } else {
        course = course.charAt(0).toUpperCase() + course.slice(1).toLowerCase()
    }

    return (
        <>
            <div className={styles.post}>
             
                <div>
                    <div className={styles.name}> <h2> {course} </h2> </div>  
                </div>
            </div>
            
        </>
    )
}

export default CourseCard