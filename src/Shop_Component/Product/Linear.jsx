import React, { useState, useEffect } from "react";
import StepExport from "../StepExport.jsx";

const Linear_List = [
    { id: "A0404", name: "A0404", category: "Menu1", img_url: "/Shop/Linear-A0404.png", },
    { id: "B0505", name: "B0505", category: "Menu1", img_url: "/Shop/Linear-B0505.png", },
    { id: "C0606", name: "C0606", category: "Menu1", img_url: "/Shop/Linear-C0606.png", },
    { id: "D0707", name: "D0707", category: "Menu1", img_url: "/Shop/Linear-D0707.png", },
    { id: "E0808", name: "E0808", category: "Menu1", img_url: "/Shop/Linear-E0808.png", },
];

export function Linear() {
    const [selectedId, setSelectedId] = useState("");
    const [form, setForm] = useState({
        test: "",
        stroke: "",
        weight: "",
        speed: "",
        accel: "",
        axis: "",
        ratedSpeed: "",
        maxTorque: "",
        ratedTorque: "",
        outputPower: "",
        initial: "",
    });

    const ItemhandleChange = (e) => {
        const { value } = e.target;
        setSelectedId(value);
        // 선택된 아이템에 따라 폼 초기화
    }

    const handleChange = (key, value) => {
        setForm(prev => ({ ...prev, [key]: value }));
    };

    // form 값이 바뀔 때마다 자동으로 처리 (정리, 검증, 서버전송 등)
    useEffect(() => {
        console.log("현재 입력값:", form);

        // 예: 숫자만 들어가야 하는 필드 자동 처리
        const numericFields = ["weight", "speed", "accel", "axis", "ratedSpeed"];
        numericFields.forEach(key => {
            if (form[key] && isNaN(form[key])) {
                console.warn(`${key}는 숫자만 입력하세요.`);
            }
        });
    }, [form]);

    return (
        <div className="Product"
        >
            <div className="Input_Container">
                <label>
                    <h1>Select Item</h1>
                    <select value={selectedId} onChange={ItemhandleChange}>
                        <option value="" disabled>Select an item</option>
                        {Linear_List.map(item => (
                            <option key={item.id} value={item.id}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                </label>
                {/* Robot */}
                <label>
                    <h1>Robot</h1>
                    <input type="text" placeholder="Test" onChange={e => handleChange("test", e.target.value)} />
                    <input type="text" placeholder="Stroke" onChange={e => handleChange("stroke", e.target.value)} />
                    <input type="text" placeholder="Weight (N)" onChange={e => handleChange("weight", e.target.value)} />
                    <input type="text" placeholder="Speed (mm/s)" onChange={e => handleChange("speed", e.target.value)} />
                    <input type="text" placeholder="Accel (s)" onChange={e => handleChange("accel", e.target.value)} />
                    <input type="text" placeholder="Axis (Radius)" onChange={e => handleChange("axis", e.target.value)} />
                    <input type="text" name="ratedSpeed" placeholder="Rated Speed (RPM)" onChange={e => handleChange("ratedSpeed", e.target.value)} />
                </label>

                {/* Motor */}
                <label>
                    <h1>Motor</h1>
                    <input type="text" name="maxTorque" placeholder="Allowable Max Torque (Nm)" onChange={e => handleChange("maxTorque", e.target.value)} />
                    <input type="text" name="ratedTorque" placeholder="Rated Torque (Nm)" onChange={e => handleChange("ratedTorque", e.target.value)} />
                    <input type="text" name="outputPower" placeholder="Output Power (kW)" onChange={e => handleChange("outputPower", e.target.value)} />
                    <input type="text" name="Initial" placeholder="Initial (kW)" onChange={e => handleChange("initial", e.target.value)} />
                </label>
            </div>
            <div className="Result_Container">
                <div
                    className="Caclulate_Result"
                >

                </div>

                <button
                    className="ComponentButton"
                    onClick={() => StepExport({ Code: form.test })}
                >
                    Step
                </button>
            </div>
        </div>
    );
}