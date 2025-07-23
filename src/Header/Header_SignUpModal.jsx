import React from "react";
import { useState } from "react";

function SignUpModal({ onClose }) {
    const [RegisterID, setRegisterID] = useState('');
    const [RegisterPassword, setRegisterPassword] = useState('');
    const [RegisterEmail, setRegisterEmail] = useState('');
    const [RegisterEmailToken, setRegisterEmailToken] = useState('');
    const [RegisterPhoneNumber, setRegisterPhoneNumber] = useState('');
    const [isEmailCheck, setisEmailCheck] = useState(false);
    const [isTokenCheck, setisTokenCheck] = useState(false);

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    const isValidID = (id) => {
        const regex = /^[a-zA-Z0-9_-]{4,20}$/;
        const forbidden = ['admin', 'adminster'];

        return regex.test(id) && !forbidden.includes(id.toLowerCase());
    }
    const handleSignupClick = () => {
        if (!isValidID(RegisterID)) {
            alert('ID는 4~20자, 영문 대소문자, 숫자, _,- 만 사용할 수 있습니다.');
            return;
        }
        if (!isPassWord(RegisterPassword)) {
            alert("비밀번호는 8~20자, 영문 대소문자, 숫자, 특수문자 중 3가지 이상을 포함해야 합니다.");
        }
        Check_ID_Duplication(RegisterID, RegisterPassword, RegisterEmail, RegisterEmailToken, RegisterPhoneNumber);
    };
    const isPassWord = (password) => {
        const regex =
            /^(?!.*\s)(?=(.*[A-Z]){0,})(?=(.*[a-z]){0,})(?=(.*\d){0,})(?=(.*[!@#$%^&*()_\-+=<>?]){0,}).{8,20}$/;
        const types = [
            /[A-Z]/.test(password),
            /[a-z]/.test(password),
            /\d/.test(password),
            /[!@#$%^&*()_\-+=<>?]/.test(password),
        ].filter(Boolean).length;

        return regex.test(password) && types >= 3;
    };

    return (
        <div className="Header_Sign_Modal">
            <div
                className="Header_Sign_Modal_Content"
            >
                <h2>Sign Up</h2>
                <input type="email"
                    className="RegisterEmail"
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    placeholder="Email" />
                <button
                    className="SendEmailCheck"
                    disabled={!isValidEmail(RegisterEmail)}
                    onClick={async () => {
                        const isOk = await Email_Duplicate_Check(RegisterEmail);
                        setisEmailCheck(isOk);

                        if (isOk) {
                            Email_Token_Send(RegisterEmail);
                        }
                    }}
                >Send Email Token</button>
                <input type="text"
                    className="RegisterToken"
                    onChange={(e) => setRegisterEmailToken(e.target.value)}
                    placeholder="Email Token" />
                <button
                    className="EmailTokenCheck"
                    disabled={!isEmailCheck}
                    onClick={() => {
                        setisTokenCheck(Email_Token_Check(RegisterEmail, RegisterEmailToken))

                    }}
                >Token Check</button>
                <input type="tel"
                    className="RegisterPhoneNumber"
                    onChange={(e) => setRegisterPhoneNumber(e.target.value)}
                    placeholder="Phone Number" />
                <input type="text"
                    className="RegisterID"
                    onChange={(e) => setRegisterID(e.target.value)}
                    placeholder="ID" />
                <input type="password"
                    className="RegisterPassword"
                    onChange={(e) => setRegisterPassword(e.target.value)}
                    placeholder="Password" />
                <button
                    className="Singupbutton"
                    disabled={!isTokenCheck}
                    onClick={() => {
                        handleSignupClick()
                    }}
                >Sing Up</button>
                <button onClick={onClose} >CLOSE</button>
            </div>
        </div>
    );
}

async function Email_Duplicate_Check(RegisterEmail) {
    try {
        const API_BASE = import.meta.env.VITE_API_URL;

        const response = await fetch(`${API_BASE}/api/Header/EmailDuplicateCheck`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                RegisterEmail: RegisterEmail
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
            return true;
        } else {
            alert("이미 가입된 이메일입니다. 다른 이메일을 사용해주세요.");
            return false;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return false;
    }
}

async function Email_Token_Send(RegisterEmail) {
    try {
        const API_BASE = import.meta.env.VITE_API_URL;

        const response = await fetch(`${API_BASE}/api/Header/EmailTokenSend`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                RegisterEmail: RegisterEmail
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
            alert("Email 토큰 전송 완료.");
            return true;
        } else {
            alert("Email 토큰 전송 실패.");
            return false;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return false;
    }
}
async function Email_Token_Check(RegisterEmail, RegisterEmailToken) {
    try {
        const API_BASE = import.meta.env.VITE_API_URL;

        const response = await fetch(`${API_BASE}/api/Header/EmailTokenCheck`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                RegisterEmail: RegisterEmail,
                RegisterEmailToken: RegisterEmailToken
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
            alert("토큰 인증 완료.");
            return true;
        } else {
            alert("토큰 재확인 부탁드립니다.");
            return false;
        }
    } catch (error) {
        console.error('Fetch error:', error);
        return false;
    }
}
async function Check_ID_Duplication(RegisterID, RegisterPassword, RegisterEmail, RegisterEmailToken, RegisterPhoneNumber) {
    try {
        const API_BASE = import.meta.env.VITE_API_URL;

        const response = await fetch(`${API_BASE}/api/Header/CheckIDDuplication`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                RegisterID: RegisterID
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
            const isEmailOk = await Email_Duplicate_Check(RegisterEmail);
            if (!isEmailOk) return;

            Register(RegisterID, RegisterPassword, RegisterEmail, RegisterEmailToken, RegisterPhoneNumber);
        } else {
            alert("ID 중복입니다.");
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

async function Register(RegisterID, RegisterPassword, RegisterEmail, RegisterEmailToken, RegisterPhoneNumber) {
    try {
        const API_BASE = import.meta.env.VITE_API_URL;

        const response = await fetch(`${API_BASE}/api/Header/Register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                RegisterID,
                RegisterPassword,
                RegisterEmail,
                RegisterEmailToken,
                RegisterPhoneNumber,
            }),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        if (data.success) {
            alert("회원가입 완료. 로그인 해주세요.");
        } else {
            alert(`회원가입 실패 :  ${data.message}`);
        }
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

export default SignUpModal;