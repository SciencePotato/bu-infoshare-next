import styles  from '../../styles/postQmodal.module.scss';
import Image from 'next/image'
import Photo from '../../public/photo.png'
import Video from '../../public/video.png'
import { useState, useEffect } from 'react';

export default function postModal({ closeModal }: {closeModal: any}) {
    const[title, setTitle] = useState<string>()
    const[content, setContent] = useState<string>()
    const [userRef, setUserRef] = useState<string | null>(null);

    useEffect(() => {
        const user = localStorage.getItem('user')
        setUserRef(user)
    }, [])
    

    const postFunction = async () => {
      let path = document.location.pathname
      let pathArray = path.split("/").slice(1)
      path = "/major/" + pathArray[0].toLowerCase() + "/courses/" + pathArray[1].toUpperCase()
      const response = await fetch(`${document.location.origin}/api/post`, {
        method: 'POST',
        body: JSON.stringify({"path": path, "title": title, "content": content, "user": (userRef !== null)? userRef: "Anynmous"}),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(response.json().then((res) => console.log(res)))
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
                        <textarea className={styles.postTitle} placeholder="Title" onChange={(e) => setTitle(e.target.value)}></textarea>
                    </div>

                    <hr className={styles.modalLine}></hr>

                    <div className={styles.modalBody}>
                        <textarea className={styles.modalQuestion} placeholder="What question do you have?" onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>

                    <div className={styles.modalFooter}>

                        <div className={styles.options}>
                            <span className={styles.videoButton}> <Image src={Video} width={30} height={30}/> </span>
                            <span className={styles.photoButton}> <Image src={Photo} width={30} height={30}/> </span>
                            <button className={styles.postButton} onClick={postFunction}> Post </button>
                        </div>

                    </div>
                </div>
            </div>
           

        </div>
        </>
    )
}