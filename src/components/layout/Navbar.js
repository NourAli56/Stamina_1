import React, {  useState } from 'react'
import logo from '../../assets/brands/logo.png'
import { Link } from 'react-router-dom'
import search from '../../assets/Icons/search-normal.svg'
import styles from './layout.module.css'
import arrowDown from '../../assets/Icons/Symbol.svg'
import ReactLoading from 'react-loading';
import {  useSelector } from 'react-redux'

export default function Navbar() {
    const { categories, loadingCategories } = useSelector(state => state.categoriesState)
    const [activeLink, setActiveLink] = useState('');
    const [showCategories, setShowCategories] = useState(false);
    const links = [
        {
            id: 1,
            name: "Home",
            url: ""
        },
        {
            id: 2,
            name: "Our Products",
            url: "ourProducts"

        },
        {
            id: 3,
            name: "About Us",
            url: "aboutUs"
        },
        {
            id: 4,
            name: "Contact Us",
            url: "contactUs"
        },
        {
            id: 5,
            name: "Spaces",
            url: "spaces"
        }

    ]

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div className={` ${styles.navbar} d-flex items-center justify-between `}>
            <img className={styles.logo} src={logo} />
            <div className={` ${styles.links} d-flex items-center`}>
                {
                    links.map((link) => (
                        <Link to='/' onClick={() => handleLinkClick(link.url)} onMouseEnter={() => { if (link.url === 'ourProducts') setShowCategories(true) }}
                            onMouseLeave={() => { if (link.url === 'ourProducts') setShowCategories(false) }}>
                            <div className='d-flex items-center gap-10' >
                                <span className={activeLink === link.url ? styles.activeLink : styles.spanLink}>{link.name}</span>
                                {
                                    link.url === 'ourProducts' && <img src={arrowDown} />
                                }

                            </div>
                        </Link>
                    ))
                }
                {showCategories && (
                    <div className={styles.categories} onMouseEnter={() => setShowCategories(true)} onMouseLeave={() => setShowCategories(false)}>
                        {
                            !loadingCategories ?
                                categories?.map((category) => (
                                    <p className={styles.category}>{category?.name}</p>
                                )) : <div className='d-flex items-center justify-center' >
                                    <ReactLoading type="cylon" color="#f79e10" height={'17%'} width={'17%'} />
                                </div>
                        }
                    </div>
                )}
            </div>
            <div className={`${styles.boxSearch} d-flex items-center gap-10`}>
                <img src={search} />
                <input placeholder='Search here ...' className={styles.inputSearch} />
            </div>
        </div>
    );
}
