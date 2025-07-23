import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import "./FrameCommon.css";

function LinearModelGltf({ Model }) {
    const pathToLoad = `/Model_gltf/${Model}.glb`;  // 문자열 수정
    const gltf = useGLTF(pathToLoad);
    return <primitive object={gltf.scene} scale={1} />;
}

function FrameCommon({ model }) {
    const [fadeIn, setFadeIn] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setFadeIn(true), 50);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`FrameCommon ${fadeIn ? "fade-in" : ""}`}> {/* 문자열 수정 */}
            <div className="FrameCommon_item">
                <div className="FrameCommon_Canvasimage">
                    <Canvas
                        className="Canvas"
                        camera={{
                            position: [1, 1, 1],
                        }}
                    >
                        <ambientLight intensity={0.8} />
                        <directionalLight position={[5, 5, 5]} />
                        <LinearModelGltf Model={model} />
                        <OrbitControls
                            enablePan={true}
                            enableZoom={true}
                            minPolarAngle={0}
                            maxPolarAngle={Math.PI}
                            minAzimuthAngle={-Infinity}
                            maxAzimuthAngle={Infinity}
                        />
                    </Canvas>
                </div>
                <div className="FrameCommon_Descriptionimage">

                </div>
            </div>
            <div className="FrameCommon_Caculation_And_Step">
                <div className="Spec">
                    <input
                        type="text"
                        className="Weight"
                        placeholder="Weight (kg)"
                    />
                    <input
                        type="text"
                        className="Speed"
                        placeholder="Speed (mm/s)"
                    />
                    <input
                        type="Accelation"
                        className="Accelation"
                        placeholder="Accelation (sec)"
                    />
                    <input
                        type="Stroke"
                        className="Stroke"
                        placeholder="Stroke (mm)"
                    />
                </div>
                <div className="ModelShape">
        
                </div>
            </div>
        </div>
    );
}

export default FrameCommon;
