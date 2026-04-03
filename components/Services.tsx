import React from 'react';
import { Sparkles, Scissors, Gift } from 'lucide-react';
import styles from './Services.module.css';

export default function Services() {
  const servicesData = [
    {
      id: 1,
      title: 'Tư vấn Stylist',
      description: 'Giúp Nàng chọn váy hợp dáng người.',
      icon: <Sparkles size={38} strokeWidth={1.5} />,
    },
    {
      id: 2,
      title: 'Chỉnh sửa may đo',
      description: 'Dịch vụ sửa size váy cho vừa vặn (thời gian 10-15 ngày)',
      icon: <Scissors size={38} strokeWidth={1.5} />,
    },
    {
      id: 3,
      title: 'Đóng gói quà tặng',
      description: 'Mỗi đơn hàng đều được đóng gói tỉ mỉ như một món quà.',
      icon: <Gift size={38} strokeWidth={1.5} />,
    }
  ];

  return (
    <section id="services" className={styles.servicesSection}>
      <h2 className={styles.title}>Trải nghiệm tại Melli</h2>
      <p className={styles.subtitle}>
        Những dịch vụ độc quyền và chăm sóc tận tâm dành riêng cho Nàng.
      </p>

      <div className={styles.container}>
        {servicesData.map((service) => (
          <div key={service.id} className={styles.card}>
            <div className={styles.iconWrapper}>
              {service.icon}
            </div>
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p className={styles.cardDescription}>{service.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.ctaContainer}>
        <a href="/san-pham" className={styles.ctaButton}>
          KHÁM PHÁ CỬA HÀNG NGAY
        </a>
      </div>
    </section>
  );
}
