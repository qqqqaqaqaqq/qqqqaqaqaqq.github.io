import { useEffect, useState } from "react";
import "./ShopMain.css";
import "../CSS_Component/Background_Glass.css"
import { PRODUCT_LIST, ITEM_COMPONENT } from "./PRODUCT_LIST.jsx"


const CATEGORY_OPTIONS = ["All", "Menu1", "Menu2", "Menu3", "Menu4"];

function Shopmain() {
    const [selectedCategory, setselectedCategory] = useState("All");
    const [selectedItem, setselectedItem] = useState("");
    const [fadeIn, setFadeIn] = useState(false);

    const visibleProducts =
        selectedCategory === "All"
            ? PRODUCT_LIST
            : PRODUCT_LIST.filter((item) => item.category === selectedCategory);

    useEffect(() => {
        const timer = setTimeout(() => setFadeIn(true), 50);
        return () => clearTimeout(timer);
    }, []);


    return (
        <div className={`Main ${fadeIn ? "fade-in" : ""}`}>
            <div className="Shop_Header">
                <div className="Shop_Header_Navigation">
                    {CATEGORY_OPTIONS.map((category) => (
                        <label
                            key={category}
                            className={`Background_Glass ${selectedCategory === category ? "active" : ""}`}
                        >
                            <input
                                type="radio"
                                name="category"
                                value={category}
                                onChange={() => setselectedCategory(category)}
                            />
                            {category}
                        </label>
                    ))}
                </div>
                <div className="Shop_Header_Target">
                    {visibleProducts.map((item) => (
                        <button
                            key={item.id}
                            className={`Background_Glass ${selectedItem === item.id ? "active" : ""}`}
                            onClick={() => setselectedItem(item)}
                        >
                            <img src={item.img_url} alt={item.name} />
                            <p>{item.name}</p>
                        </button>
                    ))}
                </div>
            </div>

            <div className="Shop_Body">
                {selectedItem && < ITEM_COMPONENT model={selectedItem.name} />}
            </div>

            <div className="Shop_Footer">
            </div>
        </div>
    );
}

export default Shopmain;