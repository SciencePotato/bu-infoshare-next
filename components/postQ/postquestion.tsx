import styles  from '../../styles/PostQ.module.scss';
import Image from 'next/image'
import { useState } from 'react';
import Modal from '../../components/modal/postQmodal'


export default function Post() {

    const[postqModal, setPostqmodal] = useState(false)

    return (
        <>

            <div className={styles.postContainer}>
                  <form>
                    <input type="text" onClick={() => setPostqmodal(true)} placeholder='Post a Question' className={styles.postqText} 
                    ></input>
                  </form>
                  <div>
                    <span> Video </span>
                    <span> Photo </span>
                  </div>
            </div>
            {postqModal && <Modal closeModal={setPostqmodal} />}
        </>
    )
}