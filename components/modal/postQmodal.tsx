import styles  from '../../styles/postQmodal.module.scss';
import Image from 'next/image'
import Photo from '../../public/photo.png'
import Video from '../../public/video.png'
import { NextPage } from 'next';
import { useState } from 'react';

const PostModal: NextPage<any> = ({ closeModal, tmpData, setData}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const postFunction = async () => {
        if (isSubmitting) return;
        setError(null);
        setIsSubmitting(true);
        try {
            const pathArray = document.location.pathname.split("/").slice(1);
            const path = "/major/" + pathArray[0].toLowerCase() + "/courses/" + pathArray[1].toUpperCase();
            const titleWrapper = document.getElementById("title") as HTMLTextAreaElement | null;
            const contentWrapper = document.getElementById("content") as HTMLTextAreaElement | null;
            const user = localStorage.getItem("user");

            if (user !== null) {
                const response = await fetch(`${document.location.origin}/api/post`, {
                    method: 'POST',
                    body: JSON.stringify({
                        path,
                        votes: 1,
                        title: titleWrapper !== null ? titleWrapper.value : "NULL",
                        content: contentWrapper !== null ? contentWrapper.value : "NULL",
                        user,
                    }),
                    headers: { 'Content-Type': 'application/json' },
                });
                if (!response.ok) throw new Error("Post request failed");
                const data = await response.json();
                if (!data || !data.posts || typeof data.posts !== "object") {
                    throw new Error("Invalid post response");
                }
                const tmpList = [];
                for (const property in data.posts) {
                    if (data.posts[property] != null) {
                        tmpList.push({ key: property, value: data.posts[property] });
                    }
                }
                setData(tmpList.reverse());
                closeModal(false);
            } else {
                setError("Please sign in before posting a question.");
            }
        } catch {
            setError("Unable to post your question. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <>
        <div className={styles.modal}>
            <div className={styles.postqModal}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <div className={styles.modalTitle}>Post a Question</div>
                        <button className={styles.close} onClick={() => closeModal(false)}>&times;</button>
                    </div>

                    <hr className={styles.modalLine}></hr>

                    <div className={styles.titleContainer}>
                        <textarea className={styles.postTitle} placeholder="Title" id={"title"}></textarea>
                    </div>

                    <hr className={styles.modalLine}></hr>

                    <div className={styles.modalBody}>
                        <textarea className={styles.modalQuestion} placeholder="What question do you have?" id={"content"}></textarea>
                    </div>

                    <div className={styles.modalFooter}>
                        {error && <p role="alert">{error}</p>}

                        <div className={styles.options}>
                            {/* <span className={styles.videoButton}> <Image src={Video} width={30} height={30}/> </span>
                            <span className={styles.photoButton}> <Image src={Photo} width={30} height={30}/> </span> */}
                            <button className={styles.postButton} onClick={postFunction} disabled={isSubmitting}>
                                {isSubmitting ? "Posting..." : "Post"}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
           

        </div>
        </>
    )
}

export default PostModal