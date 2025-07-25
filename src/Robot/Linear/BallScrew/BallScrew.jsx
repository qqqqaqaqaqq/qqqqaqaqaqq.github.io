import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./BallScrew.css";
import RobotSelector from "../../Common/MenuFrameCommon.jsx";
import FrameCommon from "../../Common/FrameCommon.jsx";
import "../../Common/FrameCommon.css";

function BallScrew() {
    const [fadeIn, setFadeIn] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedPart = searchParams.get('model'); // 체크박스 체크 내부 'model' 파라미터로 설정, 동일해야됨.

    useEffect(() => {
        const timer = setTimeout(() => setFadeIn(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const handlePartClick = (modelname) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set('model', modelname);
            return params;
        });
    };

    const robotModels = [
        { id: 'BALL_A0404', name: 'BALL_A0404', component: null, image: "/Home_image/Linear.png" },
        { id: 'BALL_A0804', name: 'BALL_A0804', component: null, image: "/Home_image/Linear.png" },
        { id: 'BALL_A1204', name: 'BALL_A1204', component: null, image: "/Home_image/Linear.png" },
        { id: 'BALL_A1604', name: 'BALL_A1604', component: null, image: "/Home_image/Linear.png" },
        { id: 'BALL_A2004', name: 'BALL_A2004', component: null, image: "/Home_image/Linear.png" },
        { id: 'BALL_A2404', name: 'BALL_A2404', component: null, image: "/Home_image/Linear.png" },
        { id: 'BALL_A0808', name: 'BALL_A0808', component: null, image: "/Home_image/Linear.png" },
        { id: 'BALL_A1208', name: 'BALL_A1208', component: null, image: "/Home_image/Linear.png" },
    ];

    const selectedModel = robotModels.find((robot) => robot.id === selectedPart);
    const SelectedComponent = selectedModel?.component;

    return (
        <div className={`BallScrew_Frame ${fadeIn ? "fade-in" : ""}`}>
            <>
                <RobotSelector
                    fadeIn={fadeIn}
                    robotModels={robotModels}
                    selectedPart={selectedPart}
                    handlePartClick={handlePartClick}
                    SelectedComponent={SelectedComponent}
                    wrapperClass="ComponentWrapper"
                />
                {selectedPart && <FrameCommon model={selectedPart} />}
            </>
        </div>
    );

}

export default BallScrew;