import "./PRODUCT_LIST.css";
import "../CSS_Component/Button.css";
import { Linear } from "./Product/Linear.jsx";
import { useNavigate } from "react-router-dom";

export const PRODUCT_LIST = [
    { id: "AGV", name: "AGV", category: "Menu1", img_url: "/Shop/AGV.png", redirecturl: "/shop=AGV" },
    { id: "AMR", name: "AMR", category: "Menu1", img_url: "/Shop/AMR.png", redirecturl: "/shop=AMR" },
    { id: "Linear", name: "Linear", category: "Menu1", img_url: "/Shop/Linear.png", redirecturl: "/shop=Linear" },
    { id: "Scala", name: "Scala", category: "Menu1", img_url: "/Shop/Scala.png", redirecturl: "/shop=Scala" },
];


export function ITEM_COMPONENT({ model }) {
    const navigate = useNavigate();
    const product = PRODUCT_LIST.find(p => p.id === model);

    switch (model) {
        case "Linear":
            return (
                <Linear
                    onClick={() => {
                        navigate(product.redirecturl);
                    }}
                />
            );
        default:
            return null;
    }
}