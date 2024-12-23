import React, { useState, useEffect } from "react";
import { Editor, EditorState, convertFromRaw, ContentState } from "draft-js";
import "draft-js/dist/Draft.css";
import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

function Privacy() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const prevPage = new URLSearchParams(location.search).get("prev");

    useEffect(() => {
        fetch("https://api.dzidcom.com/privacy")
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
                } catch (error) {}
            });
    }, []);

    return (
        <div className=" relative">
            <Link
                to={prevPage ? `/${prevPage}` : "/"}
                className="hidden md:flex absolute top-6 left-6 w-12 h-12 rounded-full bg-perpol_v items-center justify-center cursor-pointer"
            >
                <FaArrowLeftLong className="text-white text-2xl" />
            </Link>
            <div className=" w-full md:w-[80%] block pl-4 md:pl-24 pr-4  pt-6">
                <Link
                    to={prevPage ? `/${prevPage}` : "/"}
                    className="flex md:hidden mb-6 w-12 h-12 rounded-full bg-perpol_v items-center justify-center cursor-pointer"
                >
                    <FaArrowLeftLong className="text-white text-2xl" />
                </Link>
                <div className=" text-xl font-semibold text-gray_v pb-2 ">
                    Terms of service
                </div>
                <div className="editor-container">
                    <Editor editorState={editorState} readOnly={true} />
                </div>
            </div>
        </div>
    );
}

export default Privacy;
