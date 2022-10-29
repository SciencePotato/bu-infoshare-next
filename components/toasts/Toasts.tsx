import styles from '../../styles/toast.module.scss';
import type { NextPage } from 'next';

interface dataInterface {
    toastTitle: string,
    toastContent: string,
    toastDelay: number,
    appearMs: number
}

interface Props {
  data: dataInterface;
}

const Toast: NextPage<Props> = ({ data }) => {
  return (
    <div className={styles.toastWrapper}>
        <div className={styles.wrapper}>
            { data.toastContent }
        </div>
    </div>
  )
};

export default Toast;