import React, { useEffect, useState } from "react";
import { usePLContext } from "../../PLcontext";
import Plot from "react-plotly.js";

const Graph = () => {
    const { Constraints } = usePLContext();
    const [plotComponent, setPlotComponent] = useState(null);

    useEffect(() => {
        // Calculate constraints plot data
        const plotData = Constraints.map((constraint, index) => {
            const { PlusMinus1, PlusMinus2, Value, X1, X2, Operatore } =
                constraint;

            const yValues =
                PlusMinus2 === "+"
                    ? Number(X2) == 0
                        ? [Number(X1), Number(X1)]
                        : Number(X1) == 0
                        ? [
                              Number(Value) / Number(X2),
                              Number(Value) / Number(X2),
                          ]
                        : [
                              Number(Value) / Number(X2),
                              (Number(Value) -
                                  Number(X1) * (Number(Value) / Number(X1))) /
                                  Number(X2),
                          ]
                    : PlusMinus2 === "-"
                    ? Number(X2) == 0
                        ? [Number(X1), Number(X1)]
                        : Number(X1) == 0
                        ? [
                              Number(Value) / Number(X2),
                              Number(Value) / Number(X2),
                          ]
                        : [
                              Number(Value) / (-1 * Number(X2)),
                              (Number(Value) -
                                  Number(X1) * (Number(Value) / Number(X1))) /
                                  (-1 * Number(X2)),
                          ]
                    : null;
            // console.log(
            //     X1 +
            //         " " +
            //         X2 +
            //         " " +
            //         Value +
            //         " " +
            //         PlusMinus1 +
            //         " " +
            //         PlusMinus2 +
            //         " " +
            //         Operatore
            // );

            console.log(
                Number(Value) - Number(X1) * (Number(Value) / Number(X1))
            );
            console.log(yValues);
            const adjustedYValues = yValues.map((y) => (y < 0 ? 0 : y));
            const shadingHeight = 5;
            // const borders =
            //     Operatore === ">="
            //         ? [
            //               adjustedYValues[0] + shadingHeight,
            //               adjustedYValues[1] + shadingHeight,
            //           ]
            //         : Operatore === "<="
            //         ? [
            //               adjustedYValues[0] - shadingHeight,
            //               adjustedYValues[1] - shadingHeight,
            //           ]
            //         : null;
            const Xaxe = Number(X1) == 0 ? 10 : Number(Value) / Number(X1) || 10;
            return {
                type: "scatter",
                mode: "lines",
                name: `Constraint ${index + 1}`,
                x: [0, Xaxe],
                y: adjustedYValues,
            };
        });

        const layout = {
            xaxis: {
                // Set the step for the x-axis
            },
            yaxis: {
                range: [0, 10],
            },
            showlegend: true,
            legend: {
                x: 0.1,
                y: 1.2,
                xanchor: "center",
                yanchor: "top",
            },
            margin: { l: 20, r: 20, t: 20, b: 20 },
            dragmode: "pan",
            mode: "pan2d",
            autosize: true,
            responsive: true,
        };

        const config = {
            displayModeBar: true,
            modeBarButtons: [
                ["pan2d"],
                ["zoomIn2d"],
                ["zoomOut2d"],
                ["resetScale2d"],
                ["toImage"],
            ],
            displaylogo: false,
            responsive: true,
            editable: false,
            showTips: false,
            modeBarButtonsToRemove: ["select2d", "lasso2d"],
            toImageButtonOptions: {
                format: "png",
                filename: "PL",
                height: 500,
                width: 700,
            },
            modeBar: {
                // Adjust the size of the mode bar buttons
                size: 50,
            },
        };

        const plot = (
            <Plot
                data={plotData}
                layout={layout}
                config={config}
                style={{ width: "100%", height: "100%" }}
                useResizeHandler={true}
                autosize={true}
            />
        );
        setPlotComponent(plot);
    }, [Constraints]);

    const handleMethodChange = (newMethod) => {
        // Add any specific logic when the method changes
    };

    return (
        <div className="mt-4 mb-8">
            <div className="card mt-4">
                <div
                    id="constraint-plot"
                    className="card-body w-full md:w-[90%] m-auto  h-[400px] md:h-[600px] relative border-[1px] border-[#ccc]"
                >
                    {plotComponent}
                </div>
            </div>
        </div>
    );
};

export default Graph;
