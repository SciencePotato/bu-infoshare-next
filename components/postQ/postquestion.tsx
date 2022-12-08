import styles  from '../../styles/PostQ.module.scss';
import Image from 'next/image'
import Photo from '../../public/photo.png'
import Video from '../../public/video.png'
import { useState, useEffect } from 'react';
import Modal from '../../components/modal/postQmodal'
import { NextPage } from 'next';


const Post: NextPage<any> = ({tmpData, setData}) => {

    const[postqModal, setPostqmodal] = useState(false)

    return (
        <>

            <div className={styles.postContainer}>
                  <form>
                    <input type="text" onClick={() => setPostqmodal(true)} placeholder='Post a Question' className={styles.postqText} 
                    ></input>
                  </form>
                  <div>
                    {/* <div> 
                      <Image src={Video} width={30} height={30}/>  Video 
                    </div>
                    <span> <Image src={Photo} width={30} height={30}/> Photo </span> */}
                  </div>
            </div>
            {postqModal && <Modal closeModal={setPostqmodal} tmpData={tmpData} setData={setData}/>}
        </>
    )
}

export default Post