import styles  from '../../styles/Post.module.scss';
import Image from 'next/image'

export default function Post() {
    return (
        <>
            <div className={styles.post}>
                Hello
            </div>
            <div className={styles.postBot}>
                <div> Like </div>
                <div> Comment </div>
                <div> Repost </div>
            </div>
        </>
    )
}