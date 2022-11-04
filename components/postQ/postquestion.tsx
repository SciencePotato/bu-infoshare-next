import styles  from '../../styles/PostQ.module.scss';
import Image from 'next/image'
import Photo from '../../public/photo.png'
import Video from '../../public/video.png'
import { useState } from 'react';
import Modal from '../../components/modal/postQmodal'
import { firebaseConfig } from '../../utils';
import { getDatabase, ref, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';


export default function Post() {

    const[postqModal, setPostqmodal] = useState(false)

    // Take in a Path, maxNum
    const app = initializeApp(firebaseConfig)
    const database = getDatabase(app);

    set(ref(database, 'maxPost'), {
      num: 512
    });

    return (
        <>

            <div className={styles.postContainer}>
                  <form>
                    <input type="text" onClick={() => setPostqmodal(true)} placeholder='Post a Question' className={styles.postqText} 
                    ></input>
                  </form>
                  <div>
                    <div> 
                      <Image src={Video} width={30} height={30}/>  Video 
                    </div>
                    <span> <Image src={Photo} width={30} height={30}/> Photo </span>
                  </div>
            </div>
            {postqModal && <Modal closeModal={setPostqmodal} />}
        </>
    )
}