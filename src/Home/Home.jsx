import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import { useFrame } from '@react-three/fiber';
import { useEffect, useState } from "react";
import ImageButtonEvent from "./Home_ImgButtonEvent.jsx";
import './Home.css';
import './Home_ImgButtonEvent.css';

function HomeGltf() {

    const ref = useRef();
    const { scene } = useGLTF(`/Home_image/MainGltf.glb`);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.y += 0.5 * delta;
        }
    });

    return (
        <primitive
            ref={ref}
            object={scene}
            scale={5}
        />
    );
}


function Home() {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setFadeIn(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`Home_Frame ${fadeIn ? "fade-in" : ""}`}>
            <div className="Home_Header">
                <div className="Home_Text">
                    <h1>
                        누구나 만들 수 있는 미래 <br />
                        Automated Factory
                    </h1>
                    <li>최첨단 자동화 공정 시스템</li>
                    <li>모바일로 생산의 모든 순간을 관리</li>
                    <li>공장부터 물류, 서빙까지</li>
                </div>
                <div className="Home_Gltf">
                    <Canvas
                        className="HomeCanvas"
                        camera={{ position: [1, 0, 1], fov: 60 }}>
                /* camera position: [0, 0, 5] →⇒ X: 0 (좌우)⇒ Y: 2 (높이)⇒ Z: 5 (앞뒤) */
                        <Environment preset="studio" background={false} />
                /* Enviroment 종류 : city, dawn, night, warehouse, forest, apartment, studio, bluesky, sunset, vibrant etc.. */
                        <HomeGltf
                        />
                    </Canvas>
                </div>
            </div>


            <div className="Announcements">

            </div>

            <div className="Home_Body">
                <ImageButtonEvent />
            </div>

        </div>
    );
}

export default Home;