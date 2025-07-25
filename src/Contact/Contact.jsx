import React from "react";
import { useEffect, useState } from "react";
import "./Contact.css";

function Contact() {
    const [fadeIn, setFadeIn] = useState(false);
    const [mailTitle, setMailTitle] = useState('');
    const [mailcontent, setMailcontent] = useState('');
    const [selectmenu, setselectmenu] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setFadeIn(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`Mail ${fadeIn ? "fade-in" : ""}`}>
            <div className="Mail_Notics">
                <h1 className="Mail_Notics_Header">메일 전송 전 꼭 확인해주세요</h1>
                <p className="Mail_Notics_Body">
                    • 메일 주소를 정확히 입력했는지 확인해주세요.<br />
                    • 첨부 파일이 있다면 바이러스 검사를 완료했는지 확인하세요.<br />
                    • 중요한 개인정보(주민등록번호, 비밀번호 등)는 메일로 발송하지 마세요.<br />
                    • 스팸 메일이나 광고성 내용은 발송을 금지합니다.<br />
                    • 발송 후에는 수정이나 취소가 어려울 수 있으니, 내용을 다시 한 번 검토해주세요.
                </p>
                <p className="Mail_Notics_Footer">
                    위 사항을 모두 확인한 후 메일을 발송해주세요.
                </p>
            </div>
            <div className="Mail_Head">
                <input type="text" placeholder="Name" />
                <input type="email" placeholder="E-Mail" />
                <input type="tel" placeholder="Phone Number" />
                <select
                    value={selectmenu}
                    onChange={(e) => setselectmenu(e.target.value)}
                    className="SelectMenu"
                >
                    <option value="">Select</option>
                    <option value="value1">구매 관련</option>
                    <option value="value2">상품 관련</option>
                    <option value="value3">AS 관련</option>
                    <option value="value4">기술 지원 관련</option>
                    <option value="value5">기타 관련</option>
                </select>
            </div>
            <div className="Mail_Body">

                <input
                    type="text"
                    value={mailTitle}
                    onChange={(e) => setMailTitle(e.target.value)}
                    placeholder="Title"
                />

                <textarea
                    value={mailcontent}
                    onChange={(e) => setMailcontent(e.target.value)}
                    placeholder="Content"
                    rows="5"
                    cols="50"
                />
                <input
                    type="file"
                    multiple
                    className="FileInput"
                    onChange={(e) => {
                        const files = e.target.files;
                        console.log(files);
                    }}
                />
                <button className="ContactButton">
                    Send
                </button>
            </div >
        </div>
    );
}

export default Contact;