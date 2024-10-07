import React, { useState } from "react";
import Loi_Header from "../Loi_Header";

function UniformDiscrete() {
    const [a, setA] = useState(1); // Default minimum value
    const [b, setB] = useState(6); // Default maximum value
    const [x, setX] = useState(3); // Default value to find probability for
    const [result, setResult] = useState(null);
    const [expectedValue, setExpectedValue] = useState(null);
    const [variance, setVariance] = useState(null);

    // Function to calculate probability, expected value, and variance
    const calculate = () => {
        // Calculate probability
        const probability = 1 / (b - a + 1);
        setResult(probability.toFixed(5)); // Round to 5 decimal places

        // Calculate expected value (E)
        const E = (a + b) / 2;
        setExpectedValue(E);

        // Calculate variance (V)
        const V = ((b - a + 1) ** 2 - 1) / 12;
        setVariance(V.toFixed(5)); // Round to 5 decimal places
    };

    return (
        <div className="container mx-auto my-4 px-4 min-h-[130vh] md:min-h-[90vh] ">
            <Loi_Header Name="Uniform Discrete Distribution" />
            <div className="p-2 border border-gray-300 rounded-lg mb-6 md:w-[80%] m-auto text-lg">
                <div className=" text-end pb-4">
                    نستخدم التوزيع العشوائي المتساوي المتقطع عندما يكون لكل
                    نتيجة في مجموعة محددة احتمال متساوٍ للحدوث. يُستخدم هذا
                    التوزيع بشكل شائع في الحالات التي تكون فيها النتائج متساوية
                    الاحتمال، مثل رمي النرد العادل أو اختيار عدد صحيح عشوائي بين
                    نطاق محدد.
                </div>
                <div className="w-fit m-auto">
                    <div className="italic text-gray-600">
                        <p>
                            P(X = x) =<b> 1 / (b - a + 1)</b>
                        </p>
                    </div>
                    <div className="italic text-gray-600">
                        <p>
                            E(X) = <b>(a + b) / 2</b>
                        </p>
                    </div>
                    <div className="italic text-gray-600">
                        <p>
                            V(X) = <b>((b - a + 1)^2 - 1) / 12</b>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 items-center w-[95%] md:w-[50%] m-auto">
                <div className=" flex  gap-2 items-center justify-center ">
                    <label
                        htmlFor="inputA"
                        className="font-semibold md:text-lg text-center"
                    >
                        Enter minimum value (a):
                    </label>
                    <input
                        type="number"
                        id="inputA"
                        min="1"
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                        className="border p-1 w-[70px] text-center rounded"
                    />
                </div>
                <div className=" flex  gap-2 items-center justify-center ">
                    <label
                        htmlFor="inputB"
                        className="font-semibold md:text-lg"
                    >
                        Enter maximum value (b):
                    </label>
                    <input
                        type="number"
                        id="inputB"
                        min="1"
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                        className="border p-1 w-[70px] text-center rounded"
                    />
                </div>
                <div className=" flex  gap-2 items-center justify-center ">
                    <label
                        htmlFor="inputX"
                        className="font-semibold md:text-lg w-[150px] text-center"
                    >
                        Enter value to find probability for (x):
                    </label>
                    <input
                        type="number"
                        id="inputX"
                        min={a}
                        max={b}
                        value={x}
                        onChange={(e) => setX(e.target.value)}
                        className="border p-1 w-[70px] text-center rounded"
                    />
                </div>

                <button
                    onClick={calculate}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Calculate
                </button>
            </div>
            {result !== null && (
                <div className="w-fit m-auto mt-4 text-lg md:text-xl font-semibold">
                    <p>
                        P(X) = <b className=" text-gray-500">{result}</b>
                    </p>
                    <p>
                        E(X) = <b className=" text-gray-500">{expectedValue}</b>
                    </p>
                    <p>
                        V(X) = <b className=" text-gray-500">{variance}</b>
                    </p>
                </div>
            )}
        </div>
    );
}

export default UniformDiscrete;
