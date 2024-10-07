import React from "react";
import Page_Title from "../../Components/Page_Title";
import { PLProvider } from "./PLcontext";
import Function_Objectif from "./Components/Function_Objectif";
import Constraints from "./Components/Constraints";
import Solution from "./Components/Solution/Solution";
function PL() {
    return (
        <div>
            <Page_Title title={"Programation Lineer"} />
            <PLProvider>
                <Function_Objectif />
                <div className="w-full h-[1px] my-4 bg-gray-300"></div>
                <Constraints />
                <Solution />
            </PLProvider>
        </div>
    );
}

export default PL;
