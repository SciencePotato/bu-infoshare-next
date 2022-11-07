import styles  from '../../styles/Post.module.scss';
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

const Post: NextPage<Props> = ({data}) => {
    return (
        <>
            <div className={styles.post}>
                {/* Upvotes */}
                <div>
                    <div> <Image src={UpArrow}/> </div>
                    <div> 0 </div>
                    <div> <Image src={DownArrow}/> </div>
                </div>
                {/* Contents */}
                <div>
                    <div className={styles.name}> <h2> {data.value.op} </h2> </div>
                    <div className={styles.time}> <h3> 30 mins ago </h3></div>
                    <div className={styles.title} > <h1> {data.value.title} </h1> </div>
                    <div className={styles.content}>{data.value.content} </div>
                </div>
            </div>
            <div className={styles.postBot}>
                <div> <Image src={Like} width={30} height={30}/> Like </div>
                <div> <Image src={Comment} width={30} height={30}/> Comment </div>
                <div> <Image src={Repost} width={30} height={30}/> Repost </div>
            </div>
        </>
    )
}

export default Post