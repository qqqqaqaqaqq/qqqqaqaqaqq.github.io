import { useEffect, useState } from "react";
import React from "react";
import { useSearchParams } from "react-router-dom";
import BallScrew from "./BallScrew/BallScrew.jsx";
import Belt from "./Belt/Belt.jsx";
import Rack from "./Rack/Rack.jsx";
import Magnetic from "./Magnetic/Magnetic.jsx";
import RobotSelector from '../Common/MenuFrameCommon.jsx';
import './Linear.css';

function Linear() {
    const [fadeIn, setFadeIn] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedPart = searchParams.get('type');

    useEffect(() => {
        const timer = setTimeout(() => setFadeIn(true), 50);
        return () => clearTimeout(timer);
    }, []);


    const handlePartClick = (modelname) => {
        setSearchParams(prev => {
            const params = new URLSearchParams(prev);
            params.set('type', modelname);
            params.delete('model');
            return params;
        });
    };

    const robotModels = [
        { id: "ballscrew", name: "Ball Screw", component: BallScrew, image: "/Home_image/Linear.png" },
        { id: "belt", name: "Belt Drive", component: Belt, image: "/Home_image/Linear.png" },
        { id: "rack", name: "Rack & Pinion", component: Rack, image: "/Home_image/Linear.png" },
        { id: "magnetic", name: "Magnetic Drive", component: Magnetic, image: "/Home_image/Linear.png" },
    ];

    const selectedModel = robotModels.find((robot) => robot.id === selectedPart);
    const SelectedComponent = selectedModel?.component;

    return (
        <div className={`Linear_Frame ${fadeIn ? "fade-in" : ""}`}>
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

export default Linear;