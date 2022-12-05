import styles  from '../../styles/MajorCard.module.scss';
import Link from 'next/link'

import { NextPage } from 'next';

interface commentType {
    content: string,
    user: string
}

interface dataType {
    title: string,
    op: string,
    content: string,
    comment: commentType [] | null
}

interface Props {
    /*data: dataType | null */
    data: any,
    pathID: string 
}

const MajorCard: NextPage<Props> = ({data, pathID}) => {

    let major = data.key;

    if (major == "computerscience") {
        major = "Computer Science"
    } else if (major == "datascience") {
        major = "Data Science"
    } else if (major == "computerengineering") {
        major = "Computer Engineering"
    } else if (major == "acting") {
        major = "Acting/ Theatre Arts"
    } else if (major == "aerospace") {
        major = "Aerospace Engineering"
    } else if (major == "africanamericanstudies") {
        major = "African American Studies"
    } else if (major == "americanstudies") {
        major = "American Studies"
    } else if (major == "asianstudies") {
        major = "Asian Studies"
    } else if (major == "behaviorandhealth") {
        major = "Behavior and Health"
    } else if (major == "biomedical") {
        major = "Biomedical Engineering"
    } else if (major == "cinema") {
        major = "Cinema & Media Studies"
    } else if (major == "civilization") {
        major = "Classical Civilization"
    } else if (major == "literature") {
        major = "Comparative Literature"
    } else if (major == "composition") {
        major = "Composition & Theory"
    } else if (major == "costume") {
        major = "Costume Design"
    } else if (major == "environment") {
        major = "Environmental Science"
    } else if (major == "electrical") {
        major = "Electrical Engineering"
    } else if (major == "european") {
        major = "European Studies"
    } else if (major == "film") {
        major = "Film & Television"
    } else if (major == "graphic") {
        major = "Graphic Design"
    } else if (major == "health") {
        major = "Health Science"
    } else if (major == "hospitality") {
        major = "Hospitality Administration"
    } else if (major == "physiology") {
        major = "Human Physiology"
    } else if (major == "ir") {
        major = "International Relations"
    } else if (major == "latinamerican") {
        major = "Latin American Studies"
    } else if (major == "lightingdesign") {
        major = "Lighting Design"
    } else if (major == "manufacturing") {
        major = "Manufacturing Engineering"
    } else if (major == "marine") {
        major = "Marine Science"
    } else if (major == "mechanical") {
        major = "Mechanical Engineering"
    } else if (major == "media") {
        major = "Media Science"
    } else if (major == "physicaltherapy") {
        major = "Physical Therapy"
    } else if (major == "political") {
        major = "Political Science"
    } else if (major == "publicrelations") {
        major = "Public Relations"
    } else if (major == "middleeast") {
        major = "Middle East South Asian Literatures"
    } else if (major == "theatreprod") {
        major = "Theater Production"
    } else if (major == "theatrearts") {
        major = "Theatre Arts"
    } else if (major == "sounddesign") {
        major = "Sound Design"
    } else if (major == "stagemanagement") {
        major = "Stage Management"
    } else if (major == "scenedesign") {
        major = "Scene Design"
    } else if (major == "scienceeducation") {
        major = "Science Education"
    } else if (major == "speech") {
        major = "Speech, Language & Hearing Sciences"
    } else {
        major = major.charAt(0).toUpperCase() + major.slice(1).toLowerCase()
    }

    return (
        <>
        
            <div className={styles.post}>
             
                <div className={styles.contentContainer}>
                    <div className={styles.name}> <h2> {major} </h2> </div> 
                    <div className={styles.school}><h3>College of Arts and Science</h3></div>
                    <div className={styles.description}><h4>Description of Major: Lorem Ipsum placeholder text and placeholder paragraphs</h4></div>
                    <Link href={pathID} >
                        <button style={{"cursor": "pointer"}} className={styles.nextPage}>Go To Page</button>
                    </Link>
                </div>
            </div>
        
        </>
    )
}

export default MajorCard