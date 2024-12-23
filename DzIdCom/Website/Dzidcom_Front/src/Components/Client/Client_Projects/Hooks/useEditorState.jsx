import { useState, useEffect } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";

const useEditorState = (initialContent) => {
    const [editorState, setEditorState] = useState(() => {
        if (initialContent) {
            return EditorState.createWithContent(
                convertFromRaw(JSON.parse(initialContent))
            );
        } else {
            return EditorState.createEmpty();
        }
    });

    return [editorState, setEditorState];
};

export default useEditorState;
