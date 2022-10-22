import styles  from '../../styles/CourseHeader.module.scss';
import Image from 'next/image'

export default function courseHeader() {
    return (
        <>

            <div className={styles.line}></div>

            <div className={styles.course_title}>


                {/* Course ID */}
                <div>
                    <div> CS 320 </div>
                </div>

                {/* Course Name */}
                <div>
                    <div> Concepts of Programming Languages </div>
                </div>
            
            </div>
        </>
    )
}