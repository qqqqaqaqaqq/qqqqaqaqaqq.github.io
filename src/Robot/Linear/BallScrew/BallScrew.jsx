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
        { id: 'A0404', name: 'A0404', component: null, image: "/Home_image/Linear.png" },
        { id: 'A0804', name: 'A0804', component: null, image: "/Home_image/Linear.png" },
        { id: 'A1204', name: 'A1204', component: null, image: "/Home_image/Linear.png" },
        { id: 'A1604', name: 'A1604', component: null, image: "/Home_image/Linear.png" },
        { id: 'A2004', name: 'A2004', component: null, image: "/Home_image/Linear.png" },
        { id: 'A2404', name: 'A2404', component: null, image: "/Home_image/Linear.png" },
        { id: 'A0808', name: 'A0808', component: null, image: "/Home_image/Linear.png" },
        { id: 'A1208', name: 'A1208', component: null, image: "/Home_image/Linear.png" },
    ];

    const selectedModel = robotModels.find((robot) => robot.id === selectedPart);
    const SelectedComponent = selectedModel?.component;

    return (
        <div className={`BallScrew_Frame ${fadeIn ? "fade-in" : ""}`}>
            <RobotSelector
                fadeIn={fadeIn}
                robotModels={robotModels}
                selectedPart={selectedPart}
                handlePartClick={handlePartClick}
                SelectedComponent={SelectedComponent}
                wrapperClass="ComponentWrapper"
            />
        </div>
    );

}

export default BallScrew;