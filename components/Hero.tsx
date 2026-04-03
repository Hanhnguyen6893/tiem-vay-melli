import React from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  return (
    <section className={styles.heroSection}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,700;1,500&display=swap');
      `}} />
      
      <div className={styles.container}>
        {/* Text Content */}
        <div className={styles.textContent}>
          <h2 className={styles.subtitle}>Tiệm đồ Melli Vintage Soul</h2>
          <h1 className={styles.title}>
            Nổi bật <span className={styles.titleHighlight}>nét thanh lịch</span>
          </h1>
          <p className={styles.description}>
            Chào mừng bạn đến với Melli Vintage Soul. 
            Nơi tôn vinh vẻ đẹp vượt thời gian qua những thiết kế mang đậm dấu ấn hoài cổ. 
            Hãy để chúng tôi giúp bạn tỏa sáng với phong cách cổ điển, thanh lịch và đầy cuốn hút.
          </p>
          <div className={styles.buttonGroup}>
            <button className={styles.primaryButton}>Xem bộ sưu tập</button>
            <button className={styles.secondaryButton}>Nhận tư vấn Stylist</button>
          </div>
        </div>

        {/* Image Content */}
        <div className={styles.imageContent}>
          <div className={styles.decorativeCircle1}></div>
          <div className={styles.decorativeCircle2}></div>
          <div className={`${styles.floatingElement} ${styles.dot1}`}></div>
          <div className={`${styles.floatingElement} ${styles.dot2}`}></div>
          
          <div className={styles.imageWrapper}>
            <img 
              src="https://images.unsplash.com/photo-1550614000-4b95dd2dfa8c?auto=format&fit=crop&w=800&q=80" 
              alt="Melli Vintage Soul - Nổi bật nét thanh lịch" 
              className={styles.heroImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
