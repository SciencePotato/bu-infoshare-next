import styles  from '../../styles/createCourse.module.scss';
import { useState, useEffect } from 'react';
import Modal from '../../components/modal/courseCoursemodal'
import { NextPage } from 'next';


const Createcourse: NextPage<any> = ({tmpData, setData}) => {

    const[courseModal, setCoursemodal] = useState(false)

    return (
        <>
            <div className={styles.postContainer}>
                <div>
                  <form>
                    <input type="text" onClick={() => setCoursemodal(true)} placeholder='Add a Course' className={styles.postqText} 
                    ></input>
                  </form>
                </div>
                  <div>
                    {/* <div> 
                      <Image src={Video} width={30} height={30}/>  Video 
                    </div>
                    <span> <Image src={Photo} width={30} height={30}/> Photo </span> */}
                  </div>
            </div>
            {courseModal && <Modal closeModal={setCoursemodal} tmpData={tmpData} setData={setData}/>}
        </>
    )
}

export default Createcourse