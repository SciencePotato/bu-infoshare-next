import styles  from '../../styles/Post.module.scss';
import Image from 'next/image'
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
    data: dataType | null
    pathID: string | null
}

const Post: NextPage<Props> = ({data}) => {
    return (
        <>
            <div className={styles.post}>
                {/* Upvotes */}
                <div>
                    <div> up </div>
                    <div> 0 </div>
                    <div> up </div>
                </div>
                {/* Contents */}
                <div>
                    <div className={styles.name}> <h2> Anonymous Hippo </h2> </div>
                    <div className={styles.time}> <h3> 30 mins ago </h3></div>
                    <div className={styles.title}> <h1> Questions about the difficulty </h1> </div>
                    <div className={styles.content}> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias commodi sapiente ratione voluptates eum eligendi tenetur impedit, cupiditate dolorem culpa quis amet possimus tempore ipsa quidem molestiae, totam quibusdam labore.</div>
                </div>
            </div>
            <div className={styles.postBot}>
                <div> Like </div>
                <div> Comment </div>
                <div> Repost </div>
            </div>
        </>
    )
}

export default Post