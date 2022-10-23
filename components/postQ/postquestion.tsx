import styles  from '../../styles/PostQ.module.scss';
import Image from 'next/image'

export default function Post() {
    return (
        <>
            <div className={styles.postQ}>
                  <div> Post a Question</div>
                  <div>
                    <span> Video </span>
                    <span> Photo </span>
                  </div>
              </div>
        </>
    )
}