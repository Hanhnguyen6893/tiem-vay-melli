"use client";

import React, { useState } from 'react';
import Header from '../../components/Header';
import styles from './page.module.css';

// Dữ liệu mẫu (mock_products array 8 sản phẩm vintage)
const mockProducts = [
  { id: 1, name: 'Váy Xòe Caro Gingham', price: 450000, img: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=600&q=80' },
  { id: 2, name: 'Đầm Lụa Midi Đỏ Rượu', price: 850000, img: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=600&q=80' },
  { id: 3, name: 'Đầm Hoa Nhí Mùa Thu', price: 550000, img: 'https://images.unsplash.com/photo-1515347619362-e6fdbe2162fb?auto=format&fit=crop&w=600&q=80' },
  { id: 4, name: 'Váy Corset Pháp Cổ Điển', price: 1200000, img: 'https://images.unsplash.com/photo-1566207458145-21d4dffa5131?auto=format&fit=crop&w=600&q=80' },
  { id: 5, name: 'Set Váy Yếm Vintage', price: 1500000, img: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=600&q=80' },
  { id: 6, name: 'Đầm Dạ Tiệc Hoàng Gia', price: 2500000, img: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=600&q=80' },
  { id: 7, name: 'Đầm Trắng Xếp Ly Phố Cổ', price: 950000, img: 'https://images.unsplash.com/photo-1620013774846-95fc3a51052c?auto=format&fit=crop&w=600&q=80' },
  { id: 8, name: 'Váy Ren Quý Tộc Đen', price: 2200000, img: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80' },
];

// Hàm format hiển thị tiền
const formatVND = (price: number) => {
  return price.toLocaleString('vi-VN') + 'đ';
};

export default function ProductsPage() {
  const [activeFilter, setActiveFilter] = useState('ALL');

  // Logic filter (Lọc theo ngưỡng giá tiền)
  const handleFilter = (productPrice: number) => {
    switch (activeFilter) {
      case 'UNDER_500K': 
        return productPrice < 500000;
      case '500K_TO_1M': 
        return productPrice >= 500000 && productPrice <= 1000000;
      case '1M_TO_2M': 
        return productPrice >= 1000000 && productPrice <= 2000000;
      case 'OVER_2M': 
        return productPrice > 2000000;
      default: 
        return true;
    }
  };

  const filteredProducts = mockProducts.filter((p) => handleFilter(p.price));

  return (
    <>
      {/* Tái sử dụng Header kính mờ có logo Playfair Display Nâu đất/Kem nhạt */}
      <Header />
      
      <main className={styles.pageContainer}>
        {/* Load cấu hình Font */}
        <style dangerouslySetInnerHTML={{__html: `
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,700;1,500&display=swap');
        `}} />
        
        <h1 className={styles.title}>Bộ Sưu Tập Melli</h1>

        <div className={styles.layout}>
          
          {/* ----- CỘT TRÁI: SIDEBAR (Chiếm 25%) ----- */}
          <aside className={styles.sidebar}>
            <h2 className={styles.sidebarTitle}>Lọc theo giá</h2>
            <div className={styles.filterList}>
              <button 
                className={`${styles.filterButton} ${activeFilter === 'ALL' ? styles.active : ''}`}
                onClick={() => setActiveFilter('ALL')}
              >
                Tất cả bộ sưu tập
              </button>
              <button 
                className={`${styles.filterButton} ${activeFilter === 'UNDER_500K' ? styles.active : ''}`}
                onClick={() => setActiveFilter('UNDER_500K')}
              >
                Dưới 500k
              </button>
              <button 
                className={`${styles.filterButton} ${activeFilter === '500K_TO_1M' ? styles.active : ''}`}
                onClick={() => setActiveFilter('500K_TO_1M')}
              >
                Từ 500k - 1 triệu
              </button>
              <button 
                className={`${styles.filterButton} ${activeFilter === '1M_TO_2M' ? styles.active : ''}`}
                onClick={() => setActiveFilter('1M_TO_2M')}
              >
                Từ 1 triệu - 2 triệu
              </button>
              <button 
                className={`${styles.filterButton} ${activeFilter === 'OVER_2M' ? styles.active : ''}`}
                onClick={() => setActiveFilter('OVER_2M')}
              >
                Trên 2 triệu
              </button>
            </div>
          </aside>

          {/* ----- CỘT PHẢI: LIST SẢN PHẨM (Chiếm 75%) ----- */}
          <section className={styles.productsArea}>
            {filteredProducts.length > 0 ? (
              <div className={styles.grid}>
                {filteredProducts.map(product => (
                  <div key={product.id} className={styles.productCard}>
                    <div className={styles.imageWrapper}>
                      <img src={product.img} alt={product.name} className={styles.productImage} />
                    </div>
                    <div className={styles.productInfo}>
                      <h3 className={styles.productName}>{product.name}</h3>
                      <p className={styles.productPrice}>{formatVND(product.price)}</p>
                      <button className={styles.addToCart}>Thêm vào giỏ</button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.emptyState}>
                Melli hiện tại chưa có thiết kế nào thuộc khoảng giá này để phục vụ Nàng. Nàng thử mức giá khác nhé!
              </div>
            )}
          </section>

        </div>
      </main>
    </>
  );
}
