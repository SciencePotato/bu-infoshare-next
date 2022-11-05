import styles  from '../../styles/Leaderboard.module.scss';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue } from 'firebase/database';
import { useEffect, useState } from 'react';
import { NextPage } from 'next';

interface dataType {
    userName: string
    points: string
}

interface Props{
    data: dataType[] | null
}

const Leaderboard: NextPage<Props> = ({data}) => {
    const [leaderboardDict, setLeaderboardDict] = useState<any>(null);
    const [leaderboardArray, setLeaderboardArray] = useState<any>([])

    const fetchFunction = async () => {
        const response = await fetch(`${document.location.origin}/api/read`, {
            method: 'POST',
            body: JSON.stringify({"path": "leaderboard"}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        response.json().then((res) => {setLeaderboardDict(res); console.log(res)})
    }

    useEffect(() => {
        fetchFunction()
    }, [])

    useEffect(() => {
        if (leaderboardDict === null) return;
        else {
            let tmpArray = [];
            const length = Object.keys(leaderboardDict).length
            for (let i = 0; i < length; i ++) {
                tmpArray.push(leaderboardDict[i])
            }
            setLeaderboardArray(tmpArray)
        }

        console.log(leaderboardDict)
    }, [leaderboardDict])

    return (
        <>

            <div className={styles.containerTitle}>

                {/* Leaderboard title */}
                <div className={styles.title1}>LeaderBoard</div>

                {/* Score container */}
                <div className={styles.containerScores}> 

                    {/* Scores */}
                    { (leaderboardArray.length !== 0)? 
                      leaderboardArray.map((object: any, idx: number) => 
                        <div className={styles.container1} key={idx}>
                            <div className={styles.rank} key={(idx + 1) * 100}> {idx + 1} </div>
                            <div className={styles.username} key={(idx + 1) * 1000}> {object.userName} </div>
                            <div className={styles.points} key={(idx + 1) * 10000}> {object.points} </div>
                        </div>):

                        <div className={styles.container1}>
                            <div className={styles.username}> Leaderboard Coming soon </div>
                        </div>
                    }
                </div>
            </div>
        </>
    )
}

export default Leaderboard