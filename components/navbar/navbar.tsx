import styles  from '../../styles/Nav.module.scss';
import logo from '../../public/infoshare.png';
import Image from 'next/image'

export default function Navbar () {
    return (
        <>
            <nav className={styles.nav}>
                {/* Logo flex: 1 */}
                <div>
                    <Image src={logo}/>
                </div>

                {/* Search flex: 6 */}
                <div>
                </div>

                {/* Others flex: 1-2? */}
                <div>
                    <div> Courses </div>
                    <div> Majors </div>
                    <div> Sign out </div>
                </div>
            </nav>
        </>
    )
}