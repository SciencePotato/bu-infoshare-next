import styles  from '../../styles/postQmodal.module.scss';

import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { tmpdir } from 'os';

const CourseModal: NextPage<any> = ({ closeModal, tmpData, setData}) => {

    const [existing, setExisting] = useState<string[]>([]); 
    
    useEffect(() => {

        const original = []

        for (let i = 0; i < tmpData.length; i++) {
            original.push(tmpData[i].key)
          }
        setExisting(original)
    }, [])
        
    const postFunction = async () => {

        let path = document.location.pathname
        let pathArray = path.split("/").slice(1)
        path = "/major/" + pathArray[0].toLowerCase()

        let titleWrapper = document.getElementById("courseTag")  as HTMLInputElement
        let contentWrapper = document.getElementById("courseName")  as HTMLInputElement;
        console.log(titleWrapper)

        if ((localStorage.getItem("user") !== null) && (existing.includes(titleWrapper.value) === false) && (titleWrapper !== null && contentWrapper !== null)) {
            
            const response = await fetch(`${document.location.origin}/api/postCourse`, {
                method: 'POST',
                body: JSON.stringify({
                    "path": path, 
                    "courseID": titleWrapper.value, 
                    "courseName": contentWrapper.value
                }),
                headers: {
                'Content-Type': 'application/json',
                },
            })

            let data: any = null
            response.json().then((res) => {
                data = res
                console.log(data)
                let tmpList = []

                if (data !== null) {
                    for (const property in data["courses"]) {
                    let tmpObj = {
                        key: property,
                        value: data["courses"][property]
                    }

                    tmpList.push(tmpObj)
                    }
                }
                tmpList = tmpList.filter((object: any) => object.value != null)
                setData(tmpList)
            })}

        closeModal(false)
    }

    return (
        <>
        <div className={styles.modal}>
            <div className={styles.postqModal}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <div className={styles.modalTitle}>Add a Course</div>
                        <button className={styles.close} onClick={() => closeModal(false)}>&times;</button>
                    </div>

                    <hr className={styles.modalLine}></hr>

                    <div className={styles.titleContainer}>
                        <textarea className={styles.postTitle} placeholder="Course Tag (ex: CS101, SM131)" id={"courseTag"}></textarea>
                    </div>

                    <hr className={styles.modalLine}></hr>

                    <div className={styles.modalBody}>
                        <textarea className={styles.modalQuestion} placeholder="Course Name" id={"courseName"}></textarea>
                    </div>

                    <div className={styles.modalFooter}>

                        <div className={styles.options}>
                            {/* <span className={styles.videoButton}> <Image src={Video} width={30} height={30}/> </span>
                            <span className={styles.photoButton}> <Image src={Photo} width={30} height={30}/> </span> */}
                            <button className={styles.postButton} onClick={postFunction}> Add </button>
                        </div>

                    </div>
                </div>
            </div>
           

        </div>
        </>
    )
}

export default CourseModal