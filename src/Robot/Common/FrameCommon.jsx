import { OrbitControls, useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import "./FrameCommon.css";

export function TableSet({ Model, Size, Weight, Method, MaxStroke, Price }) {
    return (
        <table
            border="2" cellPadding="8" cellSpacing="1"
        >
            <thead>
                <tr>
                    <th>Model</th>
                    <th>Size</th>
                    <th>Weight</th>
                    <th>Driving Method</th>
                    <th>Max Stroke</th>
                    <th>Price</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td>{Model}</td>
                    <td>{Size}</td>
                    <td>{Weight}</td>
                    <td>{Method}</td>
                    <td>{MaxStroke}</td>
                    <td>{Price}</td>
                </tr>
            </tbody>
        </table>
    );
}

export function LinearModelGltf({ Model }) // 전달해줄때 대괄호 -> 문자열, 대괄호 없을 시 -> OBJECT
{

    const pathToLoad = `/Model_gltf/${Model}.glb`;
    const gltf = useGLTF(pathToLoad);


    return <primitive object={gltf.scene} scale={25} />;

}



function FrameCommon({ model }) {
    const [fadeIn, setFadeIn] = useState(false);
    const [users, setUsers] = useState([]);

    console.log(model);
    useEffect(() => {
        const timer = setTimeout(() => setFadeIn(true), 50);
        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const API_BASE = import.meta.env.VITE_API_URL;

                const respone = await fetch(`${API_BASE}/api/Home/Test`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ model: model }),
                });
                if (!respone.ok) {
                    throw new Error('Network response was not ok');
                };

                const data = await respone.json();
                setUsers(data);
            }
            catch (error) {
                console.error('Fetch error:', error);
            };
        }
        fetchData();

    }, [model]);


    return (
        <div className={`FrameCommon ${fadeIn ? "fade-in" : ""}`}>
            <div className="Canvasimage">
                <Canvas
                    className="Canvas"
                    camera={{ position: [2, 1, 5], fov: 60 }}>
                /* camera position: [0, 0, 5] →⇒ X: 0 (좌우)⇒ Y: 2 (높이)⇒ Z: 5 (앞뒤) */
                    <ambientLight intensity={0.8} />
                    <directionalLight position={[5, 5, 5]} />
                    <LinearModelGltf
                        Model={model} // 모델 이름을 전달
                    />
                    <OrbitControls
                        enablePan={true}
                        enableZoom={true}
                        minPolarAngle={0}
                        maxPolarAngle={Math.PI}
                        minAzimuthAngle={-Infinity}
                        maxAzimuthAngle={Infinity} />
                </Canvas>
            </div>

            <div className="Table">
                <TableSet
                    Model={model}
                    Size={users.length > 0 ? users[0] : "Loading..."}
                    Weight={users.length > 0 ? users[1] : "Loading..."}
                    Method={users.length > 0 ? users[2] : "Loading..."}
                    MaxStroke={users.length > 0 ? users[3] : "Loading..."}
                    Price={users.length > 0 ? users[4] : "Loading..."}
                />
            </div>
        </div>
    );
}

export default FrameCommon;