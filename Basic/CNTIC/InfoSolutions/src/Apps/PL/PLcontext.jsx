import React, { createContext, useContext, useState } from "react";
const PLContext = createContext();

export const PLProvider = ({ children }) => {
    const [variables, setVariables] = useState([]);
    const [Constraints, SetConstraints] = useState([]);
    const [MinMax, SetMinMax] = useState("Min");
    const [Desision_var_Nbr, SetDesision_var_Nbr] = useState(2);

    const contextValues = {
        variables,
        setVariables,
        MinMax,
        SetMinMax,
        Desision_var_Nbr,
        SetDesision_var_Nbr,
        Constraints,
        SetConstraints,
    };

    return (
        <PLContext.Provider value={contextValues}>
            {children}
        </PLContext.Provider>
    );
};

export const usePLContext = () => useContext(PLContext);
