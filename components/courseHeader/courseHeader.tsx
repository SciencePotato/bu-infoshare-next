import styles  from '../../styles/CourseHeader.module.scss';
import Image from 'next/image'

export default function courseHeader() {
    return (
        <>
            <div className={styles.course_title}>
                {/* Course ID */}
                <div>
                    <div> CS 320 </div>
                </div>
                {/* Course Name */}
                <div>
                    <div> Principals of Programming Language </div>
                </div>
            
            </div>
        </>
    )
}