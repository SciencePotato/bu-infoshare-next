import styles  from '../../styles/postQmodal.module.scss';
import Image from 'next/image'
import Photo from '../../public/photo.png'
import Video from '../../public/video.png'

export default function postModal({ closeModal }: {closeModal: any}) {
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

                    <div className={styles.modalBody}>
                        <textarea className={styles.modalQuestion} placeholder="Enter your question here.." ></textarea>
                    </div>

                    <div className={styles.modalFooter}>

                        <div className={styles.options}>
                            <span className={styles.videoButton}> <Image src={Video} width={30} height={30}/> </span>
                            <span className={styles.photoButton}> <Image src={Photo} width={30} height={30}/> </span>
                            <button className={styles.postButton}>Post</button>
                        </div>

                        

                    </div>

                </div>
            </div>
           

        </div>
        </>
    )
}