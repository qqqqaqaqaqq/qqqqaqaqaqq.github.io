import React, { useState } from "react";
import "./PRODUCT_LIST.css";

export const PRODUCT_LIST = [
    { id: "AGV", name: "AGV", category: "Menu1", img_url: "/Shop/AGV.png", },
    { id: "AMR", name: "AMR", category: "Menu1", img_url: "/Shop/AMR.png", },
    { id: "Linear", name: "Linear", category: "Menu1", img_url: "/Shop/Linear.png", },
    { id: "Scala", name: "Scala", category: "Menu1", img_url: "/Shop/Scala.png", },
    { id: "Coupling", name: "Coupling", category: "Menu2", img_url: "", },
    { id: "Motor", name: "Mitsubishi", category: "Menu3", img_url: "", },
];

export const Linear_List = [
    { id: "A0404", name: "A0404", category: "Menu1", img_url: "/Shop/Linear-A0404.png", },
    { id: "B0505", name: "B0505", category: "Menu1", img_url: "/Shop/Linear-B0505.png", },
    { id: "C0606", name: "C0606", category: "Menu1", img_url: "/Shop/Linear-C0606.png", },
    { id: "D0707", name: "D0707", category: "Menu1", img_url: "/Shop/Linear-D0707.png", },
    { id: "E0808", name: "E0808", category: "Menu1", img_url: "/Shop/Linear-E0808.png", },
];


export function ITEM_COMPONENT({ model }) {
    const [selectedId, setSelectedId] = useState("");

    const handleChange = (e) => {
        setSelectedId(e.target.value);
    };

    switch (model) {
        case "Linear":
            return (
                <div className="Linear"
                >
                    <div className="Input_Container">
                        <label>
                            <h>Select Item</h>
                            <select value={selectedId} onChange={handleChange}>
                                <option value="" disabled>Select an item</option>
                                {Linear_List.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            <h>Robot</h>
                            <input type="text" placeholder="Stroke" />
                            <input type="text" placeholder="Weight (N)" />
                            <input type="text" placeholder="Speed (mm/s)" />
                            <input type="text" placeholder="Accel (s)" />
                            <input type="text" placeholder="Axis (Radius)" />
                            <input type="text" name="ratedSpeed" placeholder="Rated Speed (RPM)" />
                        </label>
                        <label>
                            <h>Motor</h>
                            <input type="text" name="maxTorque" placeholder="Allowable Max Torque (Nm)" />
                            <input type="text" name="ratedTorque" placeholder="Rated Torque (Nm)" />
                            <input type="text" name="outputPower" placeholder="Output Power (kW)" />
                            <input type="text" name="Initial" placeholder="Initial (kW)" />
                        </label>
                    </div>
                    <div className="Result_Container">

                    </div>
                </div>
            );
        default:
            return null;
    }
}