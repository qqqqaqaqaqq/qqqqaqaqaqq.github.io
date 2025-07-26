import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from "react-router-dom";

const robotModels = [
    {
        name: "Linear",
        redirecturl: "/robot?menu=linear",
        image: "/Home_image/Linear.png",
        className: "Home_Image_Linear",
        description: "고속 직선 이동에 특화된 로봇으로, 재료 운반이나 단순 반복 작업에 적합합니다"
    },
    {
        name: "Scala",
        redirecturl: "/robot?menu=scala",
        image: "/Home_image/Scala.png",
        className: "Home_Image_Scala",
        description: "조립 및 용접과 같은 복잡한 작업에 사용되는 정밀하고 유연한 관절형 로봇입니다"
    },
    {
        name: "AGV",
        redirecturl: "/robot?menu=agv",
        image: "/Home_image/AGV.png",
        className: "Home_Image_AGV",
        description: "지정된 경로를 따라 자율적으로 이동하며 자재나 제품을 운반하는 물류 로봇입니다"
    },
    {
        name: "AMR",
        redirecturl: "/robot?menu=amr",
        image: "/Home_image/AMR.png",
        className: "Home_Image_AMR",
        description: "센서와 지도를 기반으로 자율 주행이 가능하며, 유연한 환경에서 물류 및 점검에 사용됩니다"
    },
];

function Card({ robot, onClick, showDescription = true }) {
    return (
        <div className="Home_Body_Menu">
            <img src={robot.image} alt={robot.name} />
            <div className="Home_Body_Menu_Content">
                <h1>{robot.name}</h1>
                {showDescription && <p>{robot.description}</p>}
                <button
                    onClick={onClick}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    View More
                </button>
            </div>
        </div>
    );
}

function Home_ImageButton() {
    const navigate = useNavigate();

    return (
        <div className="Home_Body_Main">
            <div className="Home_Body_Main_PC">
                {
                    robotModels.map((robot) => (
                        <Card
                            key={robot.name}
                            robot={robot}
                            onClick={() => navigate(robot.redirecturl)}
                        />
                    ))
                }
            </div>
            <div className="Home_Body_Main_Mobile">
                <Swiper className="mySwiper">
                    {
                        robotModels.map((robot) => (
                            <SwiperSlide key={robot.name}>
                                <Card
                                    robot={robot}
                                    showDescription={false}
                                    onClick={() => navigate(robot.redirecturl)}
                                />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </div>
    );
}

export default Home_ImageButton;