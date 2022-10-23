import styles  from '../../styles/Leaderboard.module.scss';
import Image from 'next/image'

export default function Leaderboard() {
    return (
        <>

            <div className={styles.containerTitle}>

                {/* Leaderboard title */}

                <div className={styles.title1}>LeaderBoard</div>

                {/* Score container */}

                <div className={styles.containerScores}> 

                    {/* Scores */}

                    <br></br>

                    <div className={styles.container1}>
                        <div className={styles.rank}> 1 </div>
                        <div className={styles.username}> Macy </div>
                        <div className={styles.points}> 106 </div>
                    </div>

                    <div className={styles.container2}>
                        <div className={styles.rank}> 2 </div>
                        <div className={styles.username}> Hou </div>
                        <div className={styles.points}> 80 </div>
                    </div>

                    <div className={styles.container3}>
                        <div className={styles.rank}> 3 </div>
                        <div className={styles.username}> Joe </div>
                        <div className={styles.points}> 67 </div>
                    </div>

                    <div className={styles.container4}>
                        <div className={styles.rank}> 4 </div>
                        <div className={styles.username}> Jeff </div>
                        <div className={styles.points}> 54 </div>
                    </div>

                    <div className={styles.container5}>
                        <div className={styles.rank}> 5 </div>
                        <div className={styles.username}> Nick </div>
                        <div className={styles.points}> 33 </div>
                    </div>

                    <div className={styles.container6}>
                        <div className={styles.rank}> 6 </div>
                        <div className={styles.username}> Bob </div>
                        <div className={styles.points}> 21 </div>
                    </div>

                    
                    <br></br>
                
                </div>
            
            </div>
        </>
    )
}