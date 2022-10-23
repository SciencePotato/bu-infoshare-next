import styles  from '../../styles/postQmodal.module.scss';


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
                            <span className={styles.videoButton}> Video </span>
                            <span className={styles.photoButton}> Photo </span>
                            <button className={styles.postButton}>Post</button>
                        </div>

                        

                    </div>

                </div>
            </div>
           

        </div>
        </>
    )
}