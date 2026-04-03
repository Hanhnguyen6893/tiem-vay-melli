"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { marked } from 'marked';
import styles from './Chatbot.module.css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Chào bạn! Mình là Stylist ảo của Melli đây. Mình có thể giúp gì cho tủ đồ vintage của bạn hôm nay (thương lượng size váy, chọn đầm đi tiệc...)?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [knowledgeBase, setKnowledgeBase] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // API key của OpenRouter 
    const OPENROUTER_API_KEY = "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";

    // Hàm chuẩn bị sẵn để gửi thông tin Lead qua Google Sheets 
    const sendLeadToGoogleSheets = async (leadData: { name?: string, phone?: string, email?: string, interest?: string, intent_level?: string }) => {
        // Tham chiếu Google Script Web App
        const googleAppScriptUrl = "https://script.google.com/macros/s/AKfycbyuwKlSQDdEVEJrSHia5Metw9BdnuIiTsg-YNzHuR4DiwqoSc52QDDsHJn7CuH651IK/exec";

        try {
            // Chuyển dữ liệu sang FormData (x-www-form-urlencoded) để Google Script dễ dàng bắt qua e.parameter
            const params = new URLSearchParams();
            params.append('name', leadData.name || '');
            params.append('phone', leadData.phone || '');
            params.append('email', leadData.email || '');
            params.append('interest', leadData.interest || '');
            params.append('intent_level', leadData.intent_level || '');

            await fetch(googleAppScriptUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: params.toString(),
                mode: 'no-cors' // Quan trọng để tránh lỗi preflight CORS từ Apps Script
            });
            console.log("Đã kích hoạt gửi HTTP Post lên Google Sheet thành công.");
        } catch (error) {
            console.error("Lỗi khi kết nối đến Google Sheets: ", error);
        }
    };

    // Cuộn dòng chat xuống dưới cùng
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => { scrollToBottom(); }, [messages]);

    // Load knowledge base từ chatbot_data.txt
    useEffect(() => {
        // Để lệnh fetch hoạt động, bạn CẦN KÉO THẢ file chatbot_data.txt 
        // từ thư mục gốc vào trong thư mục "public" (ví dụ: public/chatbot_data.txt)
        fetch('/chatbot_data.txt')
            .then((res) => {
                if (!res.ok) throw new Error('Cần đưa file chatbot_data.txt vào public/');
                return res.text();
            })
            .then((text) => setKnowledgeBase(text))
            .catch((err) => console.log("Thông báo nội bộ:", err.message));
    }, []);

    // Hàm Xóa và Bóc tách thẻ ||LEAD_DATA|| từ AI phản hồi
    const extractAndProcessLeadData = (rawText: string) => {
        // Cải tiến regex [\s\S]*? để bắt chuỗi JSON kể cả khi AI tùy ý quấn markdown nhiều dòng
        const leadTagRegex = /\|\|LEAD_DATA:\s*({[\s\S]*?})\s*\|\|/g;
        let cleanText = rawText;
        let match;

        // Quét tìm tất cả các match tag được sinh ra
        while ((match = leadTagRegex.exec(rawText)) !== null) {
            try {
                // Parse dữ liệu từ ruột tag tìm được
                const leadJson = JSON.parse(match[1]);

                // Trích xuất chuẩn xác đủ 5 trường 
                const payload = {
                    name: leadJson.name || "",
                    phone: leadJson.phone || "",
                    email: leadJson.email || "",
                    interest: leadJson.interest || "",
                    intent_level: leadJson.intent_level || "hot"
                };

                sendLeadToGoogleSheets(payload); // Kích hoạt lệnh bắn lên Sheets
            } catch (e) {
                console.error("Lỗi parse JSON trong LEAD_DATA tag nhận diện từ AI:", e);
            }
        }

        // Tẩy trắng sạch sẽ các mã ||LEAD_DATA: ... || khỏi tin nhắn để hiển thị mượt cho khách
        cleanText = rawText.replace(leadTagRegex, '').trim();
        return cleanText;
    };

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { role: 'user', content: input };
        setMessages((prev) => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:3000",
                    "X-Title": "Melli Vintage Stylist"
                },
                body: JSON.stringify({
                    model: "openrouter/free", // Tự động Auto-Routing sang Model miễn phí tốt nhất không bị giới hạn mạng
                    messages: [
                        {
                            role: "system",
                            content: `Bạn là "Stylist ảo của Melli", một nữ chuyên gia tư vấn thời trang cổ điển, thanh lịch tại tiệm đồ Melli Vintage Soul. Giọng văn của bạn: Gần gũi, dịu dàng, ngọt ngào.
Kiến thức của cửa hàng của bạn:
${knowledgeBase}

NHIỆM VỤ NÂNG CAO ĐẶC MẬT DÀNH CHO BẠN:
Mỗi khi khách hàng đề cập đến việc "hỏi size váy", "cách đo size", "đầm đi tiệc", lập tức thêm một thẻ dữ liệu sau vào dướt chót câu trả lời của bạn với dữ liệu khách:
||LEAD_DATA: {"name": "Tên nếu có", "phone": "SĐT nếu có", "email": "Email nếu có", "interest": "size váy / mẫu tiệc", "intent_level": "hot"}||
Lưu ý: đoạn mã ||LEAD_DATA|| này sẽ được ẩn khỏi màn hình khách hàng. Bạn hiểu chưa?`
                        },
                        ...messages, // Truyền nguyên lịch sử chat (state messages chỉ lưu user và assistant)
                        userMessage
                    ]
                })
            });

            if (!response.ok) {
                const errorData = await response.text(); // Lấy mã lỗi gốc từ OpenRouter
                console.log("OpenRouter Error Data (Có giới hạn API cục bộ):", errorData);
                setMessages((prev) => [...prev, { role: 'assistant', content: "Melli đang gặp chút sự cố kết nối, phiền Nàng kiểm tra lại API Key hoặc Model name nhé!" }]);
                setIsLoading(false);
                return;
            }

            const data = await response.json();
            if (data.choices && data.choices[0] && data.choices[0].message) {
                const aiRawReply = data.choices[0].message.content;

                // Chạy qua lớp lọc thẻ LEAD_DATA trước khi đưa ra màn hình hiển thị
                const cleanReply = extractAndProcessLeadData(aiRawReply);

                setMessages((prev) => [...prev, { role: 'assistant', content: cleanReply }]);
            }
        } catch (error) {
            console.error("Lỗi Chatbot:", error);
            setMessages((prev) => [...prev, { role: 'assistant', content: "Melli đang pha thêm chút trà, bạn đợi xíu xiu rồi thử kết nối lại nhé (Lỗi mạng hoặc API Key chưa gắn)!" }]);
        } finally {
            setIsLoading(false);
        }
    };

    // Hàm chuyển text sang markdown html
    const renderMessageMarkdown = (text: string) => {
        // marked.parse đồng bộ mặc định trên version 17+ (nếu có pass custom object thì nó có thể return khác, nhưng cách này bảo mật với return string)
        const rawHtml = marked.parse(text) as string;
        return { __html: rawHtml };
    };

    return (
        <div className={styles.chatbotWrapper}>
            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.header}>
                        <h3 className={styles.headerTitle}>Stylist ảo Melli</h3>
                        <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
                            <X size={24} />
                        </button>
                    </div>

                    <div className={styles.messages}>
                        {messages.map((msg, idx) => (
                            <div
                                key={idx}
                                className={`${styles.message} ${msg.role === 'user' ? styles.userMsg : styles.aiMsg}`}
                            >
                                {msg.role === 'assistant'
                                    ? <div dangerouslySetInnerHTML={renderMessageMarkdown(msg.content)} />
                                    : msg.content
                                }
                            </div>
                        ))}
                        {isLoading && <div className={styles.loading}>Melli Stylist đang gõ tin nhắn...</div>}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className={styles.inputArea}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Bạn đang tìm kiếm mẫu đầm nào..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            disabled={isLoading}
                        />
                        <button
                            className={styles.sendButton}
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                        >
                            <Send size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* Button nổi để mở cửa sổ chat */}
            {!isOpen && (
                <button className={styles.chatButton} onClick={() => setIsOpen(true)}>
                    <MessageCircle size={32} />
                </button>
            )}
        </div>
    );
}
