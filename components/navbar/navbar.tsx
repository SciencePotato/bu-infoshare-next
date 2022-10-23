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
                    <input type={"text"} placeholder={"Search post"}> 
                    </input>
                </div>

                {/* Others flex: 1-2? */}
                <div>
                    <div> Courses </div>
                    <div> Majors </div>
                    <Link href={"/Log-in"}>
                        <div> Login </div>
                    </Link>
                </div>
            </nav>
        </>
    )
}