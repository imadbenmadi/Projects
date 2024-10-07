import React, { useState } from "react";
import Loi_Header from "../Loi_Header";

function Poisson() {
    const [lambda, setLambda] = useState(1); // Default lambda parameter
    const [k, setK] = useState(0); // Default k value
    const [result, setResult] = useState(null);
    const [expectedValue, setExpectedValue] = useState(null);
    const [variance, setVariance] = useState(null);

    // Function to calculate probability, expected value, and variance
    const calculateProbability = () => {
        // Calculate probability
        const probability =
            (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
        setResult(probability.toFixed(5)); // Round to 5 decimal places

        // Calculate expected value (E)
        setExpectedValue(lambda);

        // Calculate variance (V)
        setVariance(lambda);
    };

    // Function to calculate factorial
    const factorial = (n) => {
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    };

    return (
        <div className="container mx-auto my-4 px-4 min-h-[140vh] md:min-h-[85vh]">
            <Loi_Header Name="Poisson Distribution" />
            <div className="p-2 border border-gray-300 rounded-lg mb-6 md:w-[80%] m-auto text-lg">
                <div className=" text-end pb-4">
                    يُستخدم التوزيع البواسون لنمذجة عدد الحوادث أو الأحداث
                    النادرة التي تحدث في فترة زمنية محددة أو في منطقة معينة،
                    عندما يكون متوسط عدد الحوادث في هذه الفترة أو المنطقة
                    معروفًا وثابتًا. يتم استخدامه في العديد من المجالات مثل
                    العلوم الطبيعية، والتأمين، والصناعة، والهندسة، والإدارة، حيث
                    يمكن استخدامه لتقدير عدد الأحداث النادرة مثل حوادث السيارات،
                    والزوار المتوقعين في موقع ويب، والإخفاقات في النظام، وغيرها.
                </div>
                <div className="w-fit m-auto">
                    <div className="italic text-gray-600">
                        <p>
                            P(X = k) =<b> (λ^k * e^(-λ)) / k!</b>
                        </p>
                    </div>
                    <div className="italic text-gray-600">
                        <p>
                            E(X) =<b> λ</b>{" "}
                        </p>
                    </div>
                    <div className="italic text-gray-600">
                        <p>
                            V(X) =<b> λ</b>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 items-center w-[95%] md:w-[50%] m-auto">
                <div className=" flex  gap-2 items-center justify-center ">
                    <label
                        htmlFor="inputLambda"
                        className="font-semibold md:text-lg w-[200px] text-center"
                    >
                        Enter λ (lambda) value:
                    </label>
                    <input
                        type="number"
                        id="inputLambda"
                        min="0"
                        step="0.01"
                        value={lambda}
                        onChange={(e) => setLambda(e.target.value)}
                        className="border p-2 rounded w-[70px] text-center"
                    />
                </div>

                <div className=" flex  gap-2 items-center justify-center ">
                    <label
                        htmlFor="inputK"
                        className="font-semibold md:text-lg w-[200px] text-center"
                    >
                        Enter k value:
                    </label>
                    <input
                        type="number"
                        id="inputK"
                        min="0"
                        value={k}
                        onChange={(e) => setK(e.target.value)}
                        className="border p-2 rounded w-[70px] text-center"
                    />
                </div>

                <button
                    onClick={calculateProbability}
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

export default Poisson;
