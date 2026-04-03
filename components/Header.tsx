"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Hiệu ứng bắt sự kiện Scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      {/* Import Font Playfair & Inter nếu chưa có */}
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,700;1,500&display=swap');
      `}} />

      {/* 1. Logo */}
      <a href="/" className={styles.logo}>
        Melli Vintage Soul
      </a>

      {/* 3. Navigation Menu */}
      <nav className={styles.nav}>
        <a href="/" className={styles.navLink}>Trang chủ</a>
        <a href="/san-pham" className={styles.navLink}>Bộ sưu tập</a>
        <a href="#services" className={styles.navLink}>Dịch vụ</a>
        <a href="#contact" className={styles.navLink}>Liên hệ</a>
      </nav>

      {/* 5. Icon Giỏ Hàng từ lucide-react */}
      <div className={styles.actions}>
        <button className={styles.cartButton} aria-label="Giỏ hàng">
          <ShoppingCart size={26} strokeWidth={1.5} />
          <span className={styles.badge}>2</span>
        </button>
      </div>
    </header>
  );
}
