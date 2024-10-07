import React, { useState, useEffect } from "react";
import { usePLContext } from "../PLcontext";

export default function Constraints() {
    const { SetConstraints, Desision_var_Nbr } = usePLContext();
    const [constraints, setConstraints] = useState([]);

    useEffect(() => {
        const newConstraints = Array.from(
            { length: constraints.length },
            (_, index) => {
                const existingConstraint = constraints[index] || {};
                const newConstraint = {
                    Operatore: existingConstraint.Operatore || ">=",
                    Value: existingConstraint.Value || 0,
                };

                for (let i = 1; i <= Desision_var_Nbr; i++) {
                    newConstraint[`X${i}`] = existingConstraint[`X${i}`] || 0;
                    newConstraint[`PlusMinus${i}`] =
                        existingConstraint[`PlusMinus${i}`] || "+";
                }
                return newConstraint;
            }
        );
        setConstraints(newConstraints);
        SetConstraints(newConstraints);
    }, [Desision_var_Nbr, constraints.length, SetConstraints]);

    const handleAddConstraint = () => {
        if (constraints.length < 3) {
            const newConstraint = {
                Operatore: ">=",
                Value: 0,
            };

            for (let i = 1; i <= Desision_var_Nbr; i++) {
                newConstraint[`X${i}`] = 0;
                newConstraint[`PlusMinus${i}`] = "+";
            }

            setConstraints((prevConstraints) => [
                ...prevConstraints,
                newConstraint,
            ]);
            SetConstraints((prevConstraints) => [
                ...prevConstraints,
                newConstraint,
            ]);
        }
    };

    const handleRemoveConstraint = (index) => {
        setConstraints((prevConstraints) => [
            ...prevConstraints.slice(0, index),
            ...prevConstraints.slice(index + 1),
        ]);
        SetConstraints((prevConstraints) => [
            ...prevConstraints.slice(0, index),
            ...prevConstraints.slice(index + 1),
        ]);
    };

    const toggleSelect = (field, index) => {
        const updatedConstraints = [...constraints];

        if (field.startsWith("PlusMinus")) {
            updatedConstraints[index][field] =
                updatedConstraints[index][field] === "+" ? "-" : "+";
        } else if (field === "Operatore") {
            updatedConstraints[index][field] =
                updatedConstraints[index][field] === ">=" ? "<=" : ">=";
        }

        setConstraints(updatedConstraints);
        SetConstraints(updatedConstraints);
    };

    const handleInputChange = (index, field, value) => {
        if (value === "") {
            value = 0;
        }
        if (/^-?\d*\.?\d*$/.test(value)) {
            const updatedConstraints = [...constraints];
            updatedConstraints[index] = {
                ...updatedConstraints[index],
                [field]: value,
            };
            SetConstraints(updatedConstraints);
            setConstraints(updatedConstraints);
            // console.log(updatedConstraints);
            // console.log(constraints);
        }
    };
    // useEffect(() => {
    //     console.log("Updated Constraints:", constraints);
    // }, [constraints]);
    return (
        <>
            <div className=" flex items-start justify-center gap-10">
                <div className="text-xl font-semibold mb-3">Constraints :</div>
                {/* Add Constraint btn */}
                <div className=" w-fit">
                    <button
                        className="bg-green-500 border border-black p-2 rounded-3xl mb-5"
                        onClick={handleAddConstraint}
                    >
                        Add Constraint
                    </button>
                </div>
            </div>

            <div className="text-center mb-6">
                {Array.from({ length: Desision_var_Nbr }, (_, index) => (
                    <React.Fragment key={index}>
                        {`X${index}`}
                        {index < Desision_var_Nbr - 1 ? ", " : ""}
                    </React.Fragment>
                ))}
                {" >= 0"}
            </div>

            {/* Contraints */}
            <div className="flex flex-col justify-center  w-fit m-auto">
                {constraints.map((constraint, index) => (
                    <React.Fragment key={index}>
                        <div className=" flex gap-2 md:gap-6 items-start justify-center">
                            <div className="flex-[95%] flex items-center  flex-wrap  gap-4 m-auto">
                                {Array.from(
                                    { length: Desision_var_Nbr },
                                    (_, i) => (
                                        <React.Fragment key={i}>
                                            <div className=" flex gap-1">
                                                {/* PlusMinus */}
                                                {i !== 0 && (
                                                    <div className="flex gap-1 cursor-pointer border border-gray-400 w-[20px] text-center">
                                                        <div
                                                            onClick={() =>
                                                                toggleSelect(
                                                                    `PlusMinus${
                                                                        i + 1
                                                                    }`,
                                                                    index
                                                                )
                                                            }
                                                            className="border border-gray-400 text-center w-[20px] cursor-pointer relative"
                                                        >
                                                            {
                                                                constraint[
                                                                    `PlusMinus${
                                                                        i + 1
                                                                    }`
                                                                ]
                                                            }
                                                        </div>
                                                    </div>
                                                )}

                                                {/* input + X */}
                                                <div className="flex gap-1">
                                                    <input
                                                        className="border border-gray-400 w-[40px] text-center"
                                                        type="text"
                                                        id={`X${
                                                            i + 1
                                                        }-${index}`}
                                                        name={`X${
                                                            i + 1
                                                        }-${index}`}
                                                        // value={
                                                        //     constraint[
                                                        //         `X${i + 1}`
                                                        //     ]
                                                        // }
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                index,
                                                                `X${i + 1}`,
                                                                e.target.value
                                                            )
                                                        }
                                                        placeholder="0"
                                                    />
                                                    <div>{`X${i + 1}`}</div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                    )
                                )}

                                <div className=" flex ">
                                    {/* Operator */}
                                    <div className="flex gap-1">
                                        <div
                                            onClick={() =>
                                                toggleSelect("Operatore", index)
                                            }
                                            className="border border-gray-400 px-1 cursor-pointer relative"
                                        >
                                            {constraint.Operatore}
                                        </div>
                                    </div>
                                    {/* Value */}
                                    <div>
                                        <input
                                            className="border border-gray-400 w-[50px] text-center"
                                            type="text"
                                            id={`Value-${index}`}
                                            name={`Value-${index}`}
                                            // value={constraint.Value}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    index,
                                                    "Value",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="0"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Remove Constraint */}
                            <button
                                className=" border w-[30px] h-[30px] bg-red-500 flex justify-center
                                    items-center text-white font-bold rounded-full"
                                onClick={() => handleRemoveConstraint(index)}
                            >
                                x
                            </button>
                        </div>

                        <div className="w-full h-[1px] my-4 bg-gray-300"></div>
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}
