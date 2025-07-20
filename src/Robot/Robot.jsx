import { useEffect, useState } from "react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import Linear from './Linear/Linear.jsx';
import Scala from './Scala/Scala.jsx';
import Agv from './Agv/Agv.jsx';
import Amr from './Amr/Amr.jsx';
import "./Common/MenuFrameCommon.css";
import RobotSelector from './Common/MenuFrameCommon.jsx';
import './Robot.css';



function Robot() {
    const [fadeIn, setFadeIn] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedPart = searchParams.get('menu');

    useEffect(() => {
        const timer = setTimeout(() => setFadeIn(true), 50);
        return () => clearTimeout(timer);
    }, []);

    const handlePartClick = (menuName) => {
        setSearchParams({ menu: menuName });
    };

    const robotModels = [
        { id: 'linear', name: 'Linear', component: Linear, image: "/Home_image/Linear.png" },
        { id: 'scala', name: 'Scala', component: Scala, image: "/Home_image/Scala.png" },
        { id: 'agv', name: 'AGV', component: Agv, image: "/Home_image/AGV.png" },
        { id: 'amr', name: 'AMR', component: Amr, image: "/Home_image/AMR.png" },
    ];

    const selectedModel = robotModels.find((robot) => robot.id === selectedPart);
    const SelectedComponent = selectedModel?.component;

    return (
        <div className={`Robot_Frame ${fadeIn ? "fade-in" : ""}`}>
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

export default Robot;
