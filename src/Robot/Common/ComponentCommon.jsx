import { useState } from 'react';

function BallComponent() {
    return (
        <input
            type="text"
            placeholder="Stroke"
        />
    );
}

function BallScrewCaculation({ model }) {
    const [content, setContent] = useState(model);

    const RenderModel = ({ content }) => {
        if (content.includes("Ball")) {
            return <BallComponent />;
        }
        if (content.includes("Belt")) {
            return <BeltComponent />;
        }
        if (content.includes("Magnetic")) {
            return <MagneticComponent />;
        }
        if (content.includes("Rack")) {
            return <RackComponent />;
        }
        if (content.includes("Scala")) {
            return <ScalaComponent />;
        }
        if (content.includes("AMR")) {
            return <AMRComponent />;
        }
        if (content.includes("AGV")) {
            return <AGVComponent />;
        }

        return null;
    };
}

export default BallScrewCaculation;