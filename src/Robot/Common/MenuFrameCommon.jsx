import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

function RobotSelector({ fadeIn, robotModels, selectedPart, handlePartClick, SelectedComponent, wrapperClass }) {
    return (
        <div className={`Robot_Selection ${fadeIn ? "fade-in" : ""}`}>
            <div className="Robot_Menu_PC">
                {robotModels.map(robot => (
                    <div className="Robot_Menu_PC_Item" key={robot.id}>
                        <img
                            src={robot.image}
                            alt={`Robot ${robot.name}`}
                            id={robot.id}
                            name="robotPart"
                            checked={selectedPart === robot.id}
                            onClick={() =>
                                handlePartClick(robot.id)
                            }
                        />
                        <p>{robot.name}</p>
                    </div>
                ))}
            </div>
            <div className="Robot_Menu_Mobile">
                <Swiper className="mySwiper">
                    {robotModels.map(robot => (
                        <SwiperSlide key={robot.id}>
                            <img
                                src={robot.image}
                                alt={`Robot ${robot.name}`}
                                id={robot.id}
                                name="robotPart"
                                checked={selectedPart === robot.id}
                                onClick={() =>
                                    handlePartClick(robot.id)
                                }
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className={wrapperClass}>
                {SelectedComponent && <SelectedComponent />}
            </div>
        </div>
    );
}

export default RobotSelector;