import styles  from '../../styles/Nav.module.scss';
import logo from '../../public/infoshare.png';
import Link from 'next/link';
import Image from 'next/image'
import { useEffect, useState } from 'react';
import { NextPage } from 'next';

const Navbar: NextPage<any> = ({data, tmpData, setData, filterPost, filterComment}) => {
    const [userRef, setUserRef] = useState<string | null>(null);

    useEffect(() => {
        const user = localStorage.getItem('user')
        setUserRef(user)
    }, [])

    const renderData = (input: any) => {
        let newData = null
        if  (filterComment) {
            newData = data.filter((object: any) => 
                object.content.toString().toUpperCase().indexOf(input.toUpperCase()) != -1
            )
        } else {
            newData = data.filter((object:any) => object.key.toString().toUpperCase().indexOf(input.toUpperCase()) != -1)
            if (filterPost === true) {
                newData = data.filter((object: any) => 
                    object.value.content.toString().toUpperCase().indexOf(input.toUpperCase()) != -1 ||
                    object.value.title.toString().toUpperCase().indexOf(input.toUpperCase()) != -1
                )
            }
        }

        setData(newData)
    }

    return (
        <>
            <nav className={styles.nav}>
                {
                    (userRef === null)? 
                    <Link href={"/"}>
                        <div>
                            <Image src={logo}/>
                        </div>
                    </Link>:
                    <Link href={"/HomePage"}>
                        <div>
                            <Image src={logo}/>
                        </div>
                    </Link>
                }

                <div>
                    <input type={"text"} placeholder={"Search post"} onChange={(e) => renderData(e.target.value)}> 
                    </input>
                </div>

                <div>
                    <Link href={"/HomePage"}>
                        <div> HomePage </div>
                    </Link>
                    { (userRef === null) ?
                        <Link href={"/"}>
                            <div> </div>
                        </Link>: 
                        <Link href={"/"}>
                            <div> LogOut </div>
                        </Link>
                    }
                    { (userRef === null) ?
                        <Link href={"/Log-in"}>
                            <div> Login </div>
                        </Link>: 
                        <Link href={"/Profile"}>
                        <div> Profile </div>
                        </Link>
                    }
                </div>
            </nav>
        </>
    )
}

export default Navbar