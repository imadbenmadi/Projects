import React, { useState } from "react";
import Loi_Header from "../Loi_Header";

function Geometric() {
    const [p, setP] = useState(0.5); // Default probability of success
    const [k, setK] = useState(1); // Default number of trials
    const [result, setResult] = useState(null);
    const [expectedValue, setExpectedValue] = useState(null);
    const [variance, setVariance] = useState(null);

    // Function to calculate probability, expected value, and variance
    const calculate = () => {
        // Calculate probability
        const probability = p * Math.pow(1 - p, k - 1);
        setResult(probability.toFixed(5)); // Round to 5 decimal places

        // Calculate expected value (E)
        const E = 1 / p;
        setExpectedValue(E.toFixed(5)); // Round to 5 decimal places

        // Calculate variance (V)
        const V = (1 - p) / Math.pow(p, 2);
        setVariance(V.toFixed(5)); // Round to 5 decimal places
    };

    return (
        <div className="container mx-auto my-4 px-4 min-h-[130vh] md:min-h-[90vh] ">
            <Loi_Header Name="Geometric Distribution" />
            <div className="p-2 border border-gray-300 rounded-lg mb-6 md:w-[80%] m-auto text-lg">
                <div className="text-end pb-4">
                    يُناسب التوزيع الهندسي الحالات التي تهمك عدد المحاولات
                    اللازمة لتحقيق النجاح الأول في سلسلة من التجارب المستقلة مع
                    احتمال ثابت للنجاح.
                    <br />
                    يُستخدم هذا التوزيع في مواقف مثل رمي العملة مرارًا حتى تظهر
                    الوجهة الرئيسية للمرة الأولى، أو في انتظار حدوث حدث معين
                    بمعدل احتمال ثابت لكل وحدة زمنية أو تجربة.
                </div>
                <div className="w-fit m-auto">
                    <div className="italic text-gray-600">
                        <p>
                            P(X = k) = <b>p * (1 - p)^(k - 1)</b>
                        </p>
                    </div>
                    <div className="italic text-gray-600">
                        <p>
                            E(X) = <b>1 / p</b>{" "}
                        </p>
                    </div>
                    <div className="italic text-gray-600">
                        <p>
                            V(X) = <b>(1 - p) / p^2</b>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 items-center w-[95%] md:w-[50%] m-auto">
                <div className=" flex  gap-2 items-center justify-center ">
                    <label
                        htmlFor="inputP"
                        className="font-semibold md:text-lg text-center"
                    >
                        Enter p <br /> (احتماليات النجاح):
                    </label>
                    <input
                        type="number"
                        id="inputP"
                        min="0"
                        max="1"
                        step="0.01"
                        value={p}
                        onChange={(e) => setP(e.target.value)}
                        className="border p-2 rounded w-[70px] text-center"
                    />
                </div>
                <div className=" flex  gap-2 items-center justify-center ">
                    <label
                        htmlFor="inputK"
                        className="font-semibold md:text-lg text-center"
                    >
                        Enter k <br />
                        (عدد المحاولات):
                    </label>
                    <input
                        type="number"
                        id="inputK"
                        min="1"
                        value={k}
                        onChange={(e) => setK(e.target.value)}
                        className="border p-2 rounded w-[70px] text-center"
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

export default Geometric;
