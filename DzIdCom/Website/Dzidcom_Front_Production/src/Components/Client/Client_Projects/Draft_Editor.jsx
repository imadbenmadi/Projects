// Draft_Editor.js
import React from "react";
import { Editor, RichUtils, Modifier } from "draft-js";
import "draft-js/dist/Draft.css";
import { FaBold, FaItalic, FaUnderline, FaListUl } from "react-icons/fa";
import { MdTextIncrease, MdTextDecrease } from "react-icons/md";
import useEditorState from "./Hooks/useEditorState";
import { useState } from "react";
function Draft_Editor({ initialContent, editorState, setEditorState }) {
    // const [editorState, setEditorState] = useEditorState(initialContent);
    const [currentFontSize, setCurrentFontSize] = useState(14);
    const [currentColor, setCurrentColor] = useState("BLACK");

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
        <div className=" w-full h-full flex  items-center flex-col ">
            <div className=" flex flex-col md:flex-row justify-start gap-2 md:gap-6 w-full">
                <div className=" w-fit shrink-0 text-sm  md:text-md font-semibold">
                    project Description
                </div>
                <div className="mb-2 flex flex-wrap  gap-4 items-center border w-fit mx-auto  ">
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
                    <div className="inline-block px-2 py-1"></div>
                </div>
            </div>

            <div className="p-2 w-full h-[50vh] custom-overflow  overflow-auto border shadow-sm mx-auto rounded text-sm">
                <Editor
                    editorState={editorState}
                    onChange={onChange}
                    handleKeyCommand={handleKeyCommand}
                    customStyleMap={customStyleMap}
                    placeholder="Provide a brief overview of your project. What do you need assistance with? What are your goals? What is your budget?"
                />
            </div>
        </div>
    );
}

export default Draft_Editor;
