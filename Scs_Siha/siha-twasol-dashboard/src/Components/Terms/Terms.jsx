import React, { useState, useEffect } from "react";
import {
    Editor,
    EditorState,
    RichUtils,
    ContentState,
    convertToRaw,
    convertFromRaw,
    Modifier,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { FaBold, FaInstagram } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaListUl } from "react-icons/fa";
import { MdTextIncrease } from "react-icons/md";
import { MdTextDecrease } from "react-icons/md";
import { MdColorLens } from "react-icons/md";
import axios from "axios";
import Swal from "sweetalert2";
function Terms({ initialContent }) {
    const [Loading, setLoading] = useState(false);
    const handleEditePrivacy = async () => {
        const contentState = editorState.getCurrentContent();
        const rawContent = JSON.stringify(convertToRaw(contentState));

        setLoading(true);

        try {
            const response = await axios.put(
                "http://localhost:3000/privacy",
                {
                    Content: rawContent,
                },
                {
                    withCredentials: true,
                    validateStatus: () => true,
                }
            );
            if (response.status == 200) {
                Swal.fire("Done", `${response.data.message} `, "success");
            } else {
                Swal.fire("Error", `${response.data.message} `, "error");
            }
        } catch (error) {
            Swal.fire("Error", `${response.data.message} `, "error");
        } finally {
            setLoading(false);
        }
    };

    const [editorState, setEditorState] = useState(() => {
        if (initialContent) {
            return EditorState.createWithContent(
                convertFromRaw(JSON.parse(initialContent))
            );
        } else {
            return EditorState.createEmpty();
        }
    });

    const [currentFontSize, setCurrentFontSize] = useState(14);
    const [currentColor, setCurrentColor] = useState("BLACK");

    useEffect(() => {
        fetch("http://localhost:3000/privacy")
            .then((response) => response.json())
            .then((data) => {
                try {
                    if (data.Content) {
                        let contentState;
                        const isDraftJSFormat = (str) => {
                            try {
                                const parsed = JSON.parse(str);
                                return parsed.blocks && parsed.entityMap;
                            } catch (e) {
                                return false;
                            }
                        };

                        if (isDraftJSFormat(data.Content)) {
                            contentState = convertFromRaw(
                                JSON.parse(data.Content)
                            );
                        } else {
                            contentState = ContentState.createFromText(
                                data.Content
                            );
                        }

                        setEditorState(
                            EditorState.createWithContent(contentState)
                        );
                    }
                } catch (error) {
                    console.error("Error parsing content:");
                }
            })
            .catch((error) =>
                console.error("Error fetching initial content:")
            );
    }, []);

    const onChange = (newEditorState) => {
        setEditorState(newEditorState);
    };

    const handleKeyCommand = (command) => {
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            onChange(newState);
            return "handled";
        }
        return "not-handled";
    };

    const toggleInlineStyle = (inlineStyle) => {
        onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
    };

    const toggleBlockType = (blockType) => {
        onChange(RichUtils.toggleBlockType(editorState, blockType));
    };

    const applyInlineStyle = (style) => {
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {
            const contentState = editorState.getCurrentContent();
            const newContentState = Modifier.applyInlineStyle(
                contentState,
                selection,
                style
            );
            const newEditorState = EditorState.push(
                editorState,
                newContentState,
                "change-inline-style"
            );
            setEditorState(
                EditorState.forceSelection(newEditorState, selection)
            );
        } else {
            // Apply style to future text input
            const newEditorState = RichUtils.toggleInlineStyle(
                editorState,
                style
            );
            setEditorState(newEditorState);
        }
    };

    const increaseFontSize = () => {
        const newFontSize = currentFontSize + 2;
        setCurrentFontSize(newFontSize);
        applyInlineStyle(`FONTSIZE-${newFontSize}`);
    };

    const decreaseFontSize = () => {
        const newFontSize = Math.max(currentFontSize - 2, 2);
        setCurrentFontSize(newFontSize);
        applyInlineStyle(`FONTSIZE-${newFontSize}`);
    };

    const changeTextColor = (color) => {
        setCurrentColor(color);
        applyInlineStyle(`COLOR-${color.toUpperCase()}`);
    };

    const customStyleMap = {
        [`FONTSIZE-12`]: { fontSize: "12px" },
        [`FONTSIZE-14`]: { fontSize: "14px" },
        [`FONTSIZE-16`]: { fontSize: "16px" },
        [`FONTSIZE-18`]: { fontSize: "18px" },
        [`FONTSIZE-20`]: { fontSize: "20px" },
        [`COLOR-RED`]: { color: "red" },
        [`COLOR-BLUE`]: { color: "blue" },
        [`COLOR-GREEN`]: { color: "green" },
        [`COLOR-BLACK`]: { color: "black" },
    };

    return (
        <>
            <div className=" text-xl font-semibold text-blue_v my-5 pl-5">
                {" "}
                Terms & Conditions{" "}
            </div>{" "}
            <div className=" w-full h-full flex justify-center items-center flex-col ">
                <div className="mb-2 flex gap-4 items-center border ">
                    <button
                        className="px-2 py-1   rounded "
                        onMouseDown={(e) => {
                            e.preventDefault();
                            toggleInlineStyle("BOLD");
                        }}
                    >
                        <FaBold />
                    </button>
                    <button
                        className="px-2 py-1  rounded"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            toggleInlineStyle("ITALIC");
                        }}
                    >
                        <FaItalic />
                    </button>
                    <button
                        className="px-2 py-1  rounded"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            toggleInlineStyle("UNDERLINE");
                        }}
                    >
                        <FaUnderline />
                    </button>
                    <button
                        className="px-2 py-1  rounded"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            toggleBlockType("unordered-list-item");
                        }}
                    >
                        <FaListUl />
                    </button>
                    <button
                        className="px-2 py-1  rounded"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            increaseFontSize();
                        }}
                    >
                        <MdTextIncrease className=" text-2xl" />
                    </button>
                    <button
                        className="px-2 py-1  rounded"
                        onMouseDown={(e) => {
                            e.preventDefault();
                            decreaseFontSize();
                        }}
                    >
                        <MdTextDecrease className=" text-2xl" />
                    </button>
                    <div className="inline-block px-2 py-1">
                        <div className="flex space-x-2">
                            <button
                                className="px-2 py-1   rounded"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    changeTextColor("red");
                                }}
                            >
                                <MdColorLens className=" text-red-600 text-xl" />
                            </button>
                            <button
                                className="px-2 py-1   rounded"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    changeTextColor("green");
                                }}
                            >
                                <MdColorLens className="text-green-500 text-xl" />
                            </button>
                            <button
                                className="px-2 py-1   rounded"
                                onMouseDown={(e) => {
                                    e.preventDefault();
                                    changeTextColor("black");
                                }}
                            >
                                <MdColorLens className=" text-xl" />
                            </button>
                        </div>
                        {/* <input
                        type="color"
                        className="ml-2"
                        onChange={(e) => {
                            
                            changeTextColor(e.target.value);
                        }}
                    /> */}
                    </div>
                </div>
                <div className="p-2 w-[80%] h-[80vh] custom-overflow  overflow-auto border shadow-sm mx-auto rounded">
                    <Editor
                        editorState={editorState}
                        onChange={onChange}
                        handleKeyCommand={handleKeyCommand}
                        customStyleMap={customStyleMap}
                    />
                </div>
                {Loading ? (
                    <span className="small-loader  w-full m-auto mt-6"></span>
                ) : (
                    <div
                        className=" text-white text-xl bg-blue_v rounded-xl w-fit mx-auto py-1 px-2 
                cursor-pointer mt-6"
                        onClick={() => handleEditePrivacy()}
                    >
                        Edite Privacy
                    </div>
                )}
            </div>
        </>
    );
}

export default Terms;
