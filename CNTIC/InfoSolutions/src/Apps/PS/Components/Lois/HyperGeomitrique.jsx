import React, { useState } from "react";
import Loi_Header from "../Loi_Header";
import img from "../../../../../public/HyperGeomitric formilla.png";
function Hypergeometric() {
    const [N, setN] = useState(10); // Total population size
    const [K, setK] = useState(4); // Number of success states in the population
    const [n, setn] = useState(5); // Sample size
    const [k, setk] = useState(2); // Number of observed successes
    const [result, setResult] = useState(null);
    const [expectedValue, setExpectedValue] = useState(null);
    const [variance, setVariance] = useState(null);

    // Function to calculate probability, expected value, and variance
    const calculate = () => {
        // Calculate probability
        const probability =
            (choose(K, k) * choose(N - K, n - k)) / choose(N, n);
        setResult(probability.toFixed(5)); // Round to 5 decimal places

        // Calculate expected value (E)
        const E = (n * K) / N;
        setExpectedValue(E.toFixed(5)); // Round to 5 decimal places

        // Calculate variance (V)
        const V = (n * K * (N - K) * (N - n)) / (N * N * (N - 1));
        setVariance(V.toFixed(5)); // Round to 5 decimal places
    };

    // Function to calculate binomial coefficient
    const choose = (n, k) => {
        if (k === 0) return 1;
        return (n * choose(n - 1, k - 1)) / k;
    };

    return (
        <div className="container mx-auto my-4 px-4 min-h-[180vh] md:min-h-[120vh]">
            <Loi_Header Name="Hypergeometric Distribution" />
            <div className="p-2 border border-gray-300 rounded-lg mb-6 md:w-[80%] m-auto text-lg">
                <div className=" text-end pb-4">
                    يتم استخدام التوزيع الهندسي الهايبربوليكي عندما يكون لدينا
                    عينة من مجموعة محددة ونريد حساب احتمالية الحصول على عدد معين
                    من النتائج الناجمة عن عملية عشوائية، مع عدم إعادة الاختيار.
                    على سبيل المثال، يُمكن استخدامه في حالات مثل اختيار عينة
                    عشوائية من دفتر أو علبة تحتوي على عناصر محددة مثل كروت أو
                    كرات، ونريد حساب احتمالية الحصول على عدد معين من العناصر ذات
                    الخصائص المحددة في العينة.
                </div>

                <div className="w-fit m-auto">
                    <div className="italic text-gray-600">
                        {/* <p>
                        P(X = k) ={" "}
                        <b>
                            (K choose k) * ((N - K) choose (n - k)) / (N choose
                            n)
                        </b>
                    </p> */}
                        <img src={img} className=" w-[200px]" alt="" />
                    </div>
                    <div className="italic text-gray-600">
                        <p>
                            E(X) = <b>(n * K) / N</b>
                        </p>
                    </div>
                    <div className="italic text-gray-600">
                        <p>
                            V(X) ={" "}
                            <b>
                                (n * K * (N - K) * (N - n)) / (N * N * (N - 1))
                            </b>
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-6 items-center w-[95%] md:w-[50%] m-auto">
                <div className=" flex  gap-2 items-center justify-center ">
                    <label
                        htmlFor="inputN"
                        className="font-semibold md:text-lg text-center w-[250px]"
                    >
                        enter N <br />
                        (حجم السكان الإجمالي):
                    </label>
                    <input
                        type="number"
                        id="inputN"
                        min="1"
                        value={N}
                        onChange={(e) => setN(e.target.value)}
                        className="border p-2 rounded w-[80px]"
                    />
                </div>

                <div className=" flex  gap-2 items-center justify-center ">
                    <label
                        htmlFor="inputK"
                        className="font-semibold md:text-lg text-center w-[250px]"
                    >
                        Enter K <br /> (عدد حالات النجاح في السكان):
                    </label>
                    <input
                        type="number"
                        id="inputK"
                        min="0"
                        value={K}
                        onChange={(e) => setK(e.target.value)}
                        className="border p-2 rounded w-[80px]"
                    />
                </div>

                <div className=" flex  gap-2 items-center justify-center ">
                    <label
                        htmlFor="inputn"
                        className="font-semibold md:text-lg text-center w-[250px]"
                    >
                        Enter n <br /> ( حجم العينة):
                    </label>
                    <input
                        type="number"
                        id="inputn"
                        min="1"
                        value={n}
                        onChange={(e) => setn(e.target.value)}
                        className="border p-2 rounded w-[80px]"
                    />
                </div>

                <div className=" flex  gap-2 items-center justify-center ">
                    <label
                        htmlFor="inputk"
                        className="font-semibold md:text-lg text-center w-[250px]"
                    >
                        Enter k <br /> (عدد النجاحات الملاحظة):
                    </label>
                    <input
                        type="number"
                        id="inputk"
                        min="0"
                        value={k}
                        onChange={(e) => setk(e.target.value)}
                        className="border p-2 rounded w-[80px]"
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

export default Hypergeometric;
