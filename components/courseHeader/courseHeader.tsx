import styles  from '../../styles/CourseHeader.module.scss';
import { NextPage } from 'next';
import Image from 'next/image'

interface Props {
    data: any;
    courseNum: string;
}

const courseHeader: NextPage<Props> = ({ data, courseNum }) => {
    return (
        <>

            <div className={styles.line}></div>

            <div className={styles.course_title}>


                {/* Course ID */}
                <div>
                    <div> {courseNum} </div>
                </div>

                {/* Course Name */}
                <div>
                    <div> {data !== null? data[courseNum].courseName : "None"} </div>
                </div>
            
            </div>
        </>
    )
}

export default courseHeader;