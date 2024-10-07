import React, { useState } from "react";
import Loi_Header from "../Loi_Header";
import img from "../../../../../public/Benomial Formila.png";

function Binomial() {
    const [n, setN] = useState(5); // Default number of trials
    const [p, setP] = useState(0.5); // Default probability of success
    const [result, setResult] = useState(null);
    const [expectedValue, setExpectedValue] = useState(null);
    const [variance, setVariance] = useState(null);
    const [trials, setTrials] = useState(Array.from({ length: n }, () => 0)); // Default outcomes of trials

    // Function to calculate probability, expected value, and variance
    const calculate = () => {
        // Calculate probability
        const choose = (num, choose) => {
            let coeff = 1;
            for (let i = num - choose + 1; i <= num; i++) coeff *= i;
            for (let i = 1; i <= choose; i++) coeff /= i;
            return coeff;
        };
        const probability = trials.reduce((acc, outcome) => {
            return acc * (outcome === 1 ? p : 1 - p) * choose(n, outcome);
        }, 1);
        setResult(probability.toFixed(5)); // Round to 5 decimal places

        // Calculate expected value (E)
        const E = n * p;
        setExpectedValue(E);

        // Calculate variance (V)
        const V = n * p * (1 - p);
        setVariance(V);
    };

    // Function to handle change in number of trials
    const handleNChange = (e) => {
        const newN = parseInt(e.target.value);
        if (!isNaN(newN) && newN > 0) {
            setN(newN);
            setTrials(Array.from({ length: newN }, () => 0));
        }
    };

    // Function to handle change in outcome of trials
    const handleOutcomeChange = (index, value) => {
        const updatedTrials = [...trials];
        updatedTrials[index] = value;
        setTrials(updatedTrials);
    };

    return (
        <div className="container mx-auto my-4 px-4 min-h-[200vh] md:min-h-[140vh]">
            <Loi_Header Name="Binomial Distribution" />
            <div className="p-2 border border-gray-300 rounded-lg mb-6 md:w-[80%] m-auto text-lg">
                <div className="text-end pb-4">
                    تُستخدم توزيع البينوميال في العديد من المواقف حيث نقوم
                    بسلسلة من التجارب الثنائية، مثل اختبار فعالية دواء أو توزيع
                    الأفراد في مجموعتين. يمكن استخدامه أيضًا لتحليل البيانات
                    الثنائية، مثل نتائج استطلاع أو تصويت. في كل حالة، نقوم
                    بتقدير الاحتمالية لحدوث حدث محدد، مثل النجاح في العملية أو
                    الفوز في الانتخابات، بناءً على عدد التجارب واحتمال النجاح في
                    كل تجربة.
                </div>
                <div className="w-fit m-auto">
                    <div className="italic text-gray-600">
                        {/* <p>P(X = k) = (n choose k) * p^k * (1 - p)^(n - k)</p> */}
                        <img src={img} className=" w-[300px]" alt="" />
                    </div>
                    <div className="italic text-gray-600">
                        <p>
                            E(X) =<b> np</b>{" "}
                        </p>
                    </div>
                    <div className="italic text-gray-600">
                        <p>
                            V(X) = <b> np(1 - p)</b>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col items-center">
                <label
                    htmlFor="inputN"
                    className="font-semibold md:text-lg text-center"
                >
                    Enter n <br /> (عدد المحاولات ):
                </label>
                <input
                    type="number"
                    id="inputN"
                    min="1"
                    value={n}
                    onChange={handleNChange}
                    className="border p-2 rounded w-[70px] text-center"
                />
                <div className=" w-full h-[2px] my-6 bg-gray-200 "></div>
                <div className=" grid grid-cols-1 gap-4">
                    {[...Array(n)].map((_, index) => (
                        <div key={index}>
                            <select
                                id={`outcome${index}`}
                                value={trials[index]}
                                onChange={(e) =>
                                    handleOutcomeChange(
                                        index,
                                        parseInt(e.target.value)
                                    )
                                }
                                className="border p-2 rounded"
                            >
                                <option value={0}>خسارة (0)</option>
                                <option value={1}>نجاح (1)</option>
                            </select>
                            <label
                                htmlFor={`outcome${index}`}
                                className="font-semibold md:text-lg ml-2"
                            >
                                المحاولة {index + 1}
                            </label>
                        </div>
                    ))}
                </div>
                <button
                    onClick={calculate}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
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

export default Binomial;
