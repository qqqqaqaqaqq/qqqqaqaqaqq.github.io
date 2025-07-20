import React from "react";
import '../App.css';
import { useEffect, useState } from "react";

function Contact() {
    const [fadeIn, setFadeIn] = useState(false);
    const [mailtile, setMailtile] = useState('');
    const [mailcontent, setMailcontent] = useState('');

    useEffect(() => {
        const timer = setTimeout(() => setFadeIn(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`ContactMain ${fadeIn ? "fade-in" : ""}`}>
            <div className="Identify">
                <div className="Identifycontent">
                    <input type="text" placeholder="Name" />
                    <input type="text" placeholder="Last Name" />
                    <input type="tell" placeholder="Phone Number" />
                </div>
            </div>
            <div className="MailCcntent">
                <div className="Title">
                    <input
                        type="text"
                        value={mailtile}
                        onChange={(e) => setMailtile(e.target.value)}
                        placeholder="Title"
                    />
                </div>
                <div className="Content">
                    <textarea
                        type="text"
                        value={mailcontent}
                        onChange={(e) => setMailcontent(e.target.value)}
                        placeholder="Content"
                        rows="5"
                        cols="50"
                    />
                </div>
                <div className="button">
                    <button className="ContactButton">
                        Send
                    </button>
                </div>
            </div >

        </div>
    );
}

export default Contact;