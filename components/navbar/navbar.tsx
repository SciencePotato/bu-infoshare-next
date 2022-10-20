import styles  from '../../styles/Nav.module.scss';
import logo from '../../public/infoshare.png';
import Link from 'next/link';
import Image from 'next/image'

export default function Navbar () {
    return (
        <>
            <nav className={styles.nav}>
                {/* Logo flex: 1 */}
                <Link href={"/"}>
                    <div>
                        <Image src={logo}/>
                    </div>
                </Link>

                {/* Search flex: 6 */}
                <div>
                </div>

                {/* Others flex: 1-2? */}
                <div>
                    <div> Course </div>
                    <div> Majors </div>
                    <div> Login </div>
                </div>
            </nav>
        </>
    )
}