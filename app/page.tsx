"use client";

import Header from '../components/Header';
import Hero from '../components/Hero';
import Services from '../components/Services';
import Chatbot from '../components/Chatbot';

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
      {/* Thanh Menu điều hướng ghim ở đỉnh màn hình */}
      <Header />
      
      {/* Banner chính Melli Vintage Soul */}
      <Hero />
      
      {/* 3 Cột dịch vụ/Sản phẩm */}
      <Services />
      
      {/* Stylist Ảo Nâu Đất ở góc phải dưới */}
      <Chatbot />
    </main>
  );
}
