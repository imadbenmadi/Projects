import React, { useState } from "react";
import Loi_Header from "../Loi_Header";

function Bernuit() {
    const [p, setP] = useState(0.5); // Default probability
    const [result, setResult] = useState(null);
    const [expectedValue, setExpectedValue] = useState(null);
    const [variance, setVariance] = useState(null);
    const [selectedValue, setSelectedValue] = useState(0);

    // Function to calculate probability, expected value, and variance
    const calculate = () => {
        const x = selectedValue;
        const probability = Math.pow(p, x) * Math.pow(1 - p, 1 - x);
        setResult(probability);

        // Calculate expected value
        const E = p;
        setExpectedValue(E);

        // Calculate variance
        const V = p * (1 - p);
        setVariance(V);
    };

    return (
        <div className="container mx-auto my-4 px-4 ">
            <Loi_Header Name="Bernoulli Distribution" />
            <div className=" p-2 border border-gray-300 rounded-lg mb-6 md:w-[80%] m-auto text-lg">
                <div className="text-end pb-4">
                    يُستخدم توزيع بيرنولي عندما يكون لدينا نتيجة ثنائية في تجربة
                    واحدة، حيث يمكن أن تكون النتيجة إما نجاحًا أو فشلًا، يُستخدم
                    هذا التوزيع في الحالات التي تتضمن نتيجتين محتملتين فقط، مثل
                    رمي العملة (وجه أو خلف)، أو نجاح أو فشل تجربة معينة، أو قبول
                    أو رفض فرضية معينة. يعتبر هذا التوزيع الأساسي وقاعدة
                    لتوزيعات أكثر تعقيدًا مثل توزيع البينوميال، الذي يتعامل مع
                    عدة تجارب بيرنولي مستقلة.
                </div>
                <div className="w-fit m-auto">
                    <div className="italic text-gray-600">
                        <p>
                            P(X = x) =<b> p^x * (1 - p)^(1 - x)</b>
                        </p>
                    </div>
                    <div className="italic text-gray-600">
                        <p>
                            E(X) = <b> p</b>
                        </p>
                    </div>
                    <div className="italic text-gray-600">
                        <p>
                            V(X) =<b> p * (1 - p)</b>{" "}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 items-center w-[95%] md:w-[50%] m-auto">
                <label htmlFor="inputX" className="font-semibold md:text-lg ">
                    choose X value (0 or 1):
                </label>
                <div className=" flex flex-col gap-3">
                    <div>
                        <button
                            onClick={() => setSelectedValue(0)}
                            className={`${
                                selectedValue === 0
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                            } px-4 py-2 rounded mr-2`}
                        >
                            0
                        </button>
                        <button
                            onClick={() => setSelectedValue(1)}
                            className={`${
                                selectedValue === 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                            } px-4 py-2 rounded`}
                        >
                            1
                        </button>
                    </div>

                    <button
                        onClick={calculate}
                        className=" bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Calculate
                    </button>
                </div>
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

export default Bernuit;
