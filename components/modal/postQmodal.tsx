import styles  from '../../styles/postQmodal.module.scss';
import Image from 'next/image'
import Photo from '../../public/photo.png'
import Video from '../../public/video.png'
import { NextPage } from 'next';

const postModal: NextPage<any> = ({ closeModal, tmpData, setData}) => {
        const postFunction = async () => {
        let path = document.location.pathname
        let pathArray = path.split("/").slice(1)
        path = "/major/" + pathArray[0].toLowerCase() + "/courses/" + pathArray[1].toUpperCase()

        let titleWrapper = document.getElementById("title")  as HTMLInputElement | null;
        let contentWrapper = document.getElementById("content")  as HTMLInputElement | null;

        const response = await fetch(`${document.location.origin}/api/post`, {
            method: 'POST',
            body: JSON.stringify({
                "path": path, 
                "title": (titleWrapper !== null)? titleWrapper.value: "NULL", 
                "content": (contentWrapper !== null)? contentWrapper.value: "NULL", 
                "user":(localStorage.getItem("user") !== null)? localStorage.getItem("user"): "Anynmous"}),
            headers: {
            'Content-Type': 'application/json',
            },
        })

        let data: any = null
        response.json().then((res) => {
            data = res
            let tmpList = []

            if (data !== null) {
                for (const property in data["posts"]) {
                let tmpObj = {
                    key: property,
                    value: data["posts"][property]
                }

                tmpList.push(tmpObj)
                }
            }
            setData(tmpList.reverse())
        })

        console.log(tmpData)
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

export default postModal