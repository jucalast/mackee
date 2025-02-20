import React from 'react';
import Image from 'next/image';
import styles from './Header.module.css';
import logo from '../../../public/logo Mackee.png';

const Header = () => {
  return (
    <header className={styles.header}>
      <Image src={logo} alt="Logo Mackee" className={styles.logo} width={300} height={300} />

    </header>
  );
};

export default Header;
