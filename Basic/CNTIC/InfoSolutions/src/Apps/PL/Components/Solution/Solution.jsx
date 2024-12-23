import React from "react";
import { useState } from "react";
// import Methodes from "./Methodes";
import Graph from "./Graph";
export default function Solution() {
    const [method, setMethod] = useState("sommets");
    function Toggle_Methode(selectedMethod) {
        if (method !== selectedMethod) {
            setMethod(selectedMethod);
        }
    }
    return (
        <div>
            {/* <div className=" my-10">
                <Methodes method={method} setMethod={setMethod} />
            </div> */}
            {/* {method === "Graphique" ? (
                <Graph />
            ) : method === "Symplexe" ? (
                <div>Symplexe</div>
            ) : null} */}

            {/* <div className=" flex items-center justify-center md:justify-around gap-6 w-full text-lg md:text-xl ">
                <div
                    className={`${
                        method === "sommets" ? " text-Blue" : " text-black"
                    }
                       cursor-pointer  font-bold`}
                    onClick={() => Toggle_Methode("sommets")}
                >
                    recensement des sommets
                </div>
                <div
                    className={`${
                        method === "Droits" ? " text-Blue" : "  text-black"
                    }
                             cursor-pointer  font-bold`}
                    onClick={() => Toggle_Methode("Droits")}
                >
                    Droit Parallèle
                </div>
            </div> */}
            <Graph method={method} setMethod={setMethod} />
        </div>
    );
}
