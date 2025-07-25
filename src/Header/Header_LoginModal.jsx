import { useState } from "react";
import React from "react";

function LoginModal({ onClose }) {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const [findIdEmail, setFindIdEmail] = useState('');
    const [foundId, setFoundId] = useState('');
    const [showFindId, setShowFindId] = useState(false);

    const [showResetPw, setShowResetPw] = useState(false);
    const [resetPwData, setResetPwData] = useState({
        id: '',
        email: '',
        phone: '',
        newPassword: ''
    });

    // 유효성 검사
    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidID = (id) => {
        const regex = /^[a-zA-Z0-9_-]{4,20}$/;
        const forbidden = ['admin', 'adminster'];
        return regex.test(id) && !forbidden.includes(id.toLowerCase());
    };
    const isValidPassword = (pw) => {
        const regex =
            /^(?!.*\s)(?=(.*[A-Z])*)(?=(.*[a-z])*)(?=(.*\d)*)(?=(.*[!@#$%^&*()_\-+=<>?])*)[A-Za-z\d!@#$%^&*()_\-+=<>?]{8,20}$/;
        const types = [
            /[A-Z]/.test(pw),
            /[a-z]/.test(pw),
            /\d/.test(pw),
            /[!@#$%^&*()_\-+=<>?]/.test(pw),
        ].filter(Boolean).length;
        return regex.test(pw) && types >= 3;
    };

    const handleLogin = async () => {
        const isOk = await Login_Check(id, password);
        if (isOk) {
            onClose();
            window.location.reload();
        }
    };

    const handleFindId = async () => {
        if (!isValidEmail(findIdEmail)) {
            alert('올바른 이메일을 입력해주세요.');
            return;
        }
        const idResult = await ResearchID_Check(findIdEmail);
        setFoundId(idResult || '');
    };

    const handleResetPassword = async () => {
        const { id, email, phone, newPassword } = resetPwData;
        if (!isValidID(id)) {
            alert('ID는 4~20자, 영문 대소문자, 숫자, _,- 만 가능합니다.');
            return;
        }
        if (!isValidEmail(email)) {
            alert('올바른 이메일을 입력해주세요.');
            return;
        }
        if (!isValidPassword(newPassword)) {
            alert('비밀번호는 8~20자, 영문 대소문자, 숫자, 특수문자 중 3가지 이상을 포함해야 합니다.');
            return;
        }

        await ResearchPassword_Renew(id, email, phone, newPassword);
        setShowResetPw(false);
    };



    return (
        <div className="Header_Login_Modal">
            <div className="Header_Login_Modal_Content">
                <h2>LOGIN</h2>
                <input
                    type="text"
                    placeholder="ID"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>LOGIN</button>
                <button onClick={() => setShowFindId(!showFindId)}>아이디 찾기</button>
                {showFindId && (
                    <>
                        <input
                            type="text"
                            placeholder="가입한 이메일 입력"
                            value={findIdEmail}
                            onChange={(e) => setFindIdEmail(e.target.value)}
                        />
                        <button onClick={handleFindId}>확인</button>
                        <input
                            type="text"
                            value={foundId}
                            readOnly
                            placeholder="찾은 아이디"
                        />
                    </>
                )}

                <button onClick={() => setShowResetPw(!showResetPw)}>비밀번호 재설정</button>
                {showResetPw && (
                    <>
                        <input
                            type="text"
                            placeholder="ID"
                            value={resetPwData.id}
                            onChange={(e) => setResetPwData({ ...resetPwData, id: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            value={resetPwData.email}
                            onChange={(e) => setResetPwData({ ...resetPwData, email: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={resetPwData.phone}
                            onChange={(e) => setResetPwData({ ...resetPwData, phone: e.target.value })}
                        />
                        <input
                            type="password"
                            placeholder="새로운 비밀번호"
                            value={resetPwData.newPassword}
                            onChange={(e) => setResetPwData({ ...resetPwData, newPassword: e.target.value })}
                        />
                        <button onClick={handleResetPassword}>변경</button>
                    </>
                )}

                <button onClick={onClose}>CLOSE</button>
            </div>
        </div>
    );
}



async function Login_Check(ID, Password) {
    try {
        const API_BASE = import.meta.env.VITE_API_URL;

        const response = await fetch(`${API_BASE}/api/Header/LoginCheck`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ID: ID,
                Password: Password
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
            alert("로그인 성공");
            const token = data.message;

            localStorage.setItem('accessToken', token);

            return true;
        } else {
            alert("로그인 실패");
            return false;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return false;
    }
}


async function ResearchID_Check(Email) {
    try {
        const API_BASE = import.meta.env.VITE_API_URL;

        const response = await fetch(`${API_BASE}/api/Header/ResearchIDCheck`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                Email
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {

            return data.message;
        } else {

            return alert(data.message);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return false;
    }
}


async function ResearchPassword_Renew(ID, Email, PhonNumber, newPassword) {
    try {
        const API_BASE = import.meta.env.VITE_API_URL;
        const response = await fetch(`${API_BASE}/api/Header/ResearchPasswordRenew`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ID,
                Email,
                PhonNumber,
                newPassword
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {

            return alert(data.message);
        } else {

            return alert(data.message);
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return false;
    }
}


export default LoginModal;