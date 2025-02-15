import * as React from "react";
import TextEditor from "@courselit/text-editor";
import { useTheme } from "@mui/material";

export interface WysiwygEditorProps {
    initialContent?: any;
    onChange: (...args: any[]) => void;
    showToolbar?: boolean;
    editable?: boolean;
    refresh?: number;
}

export default function Editor({
    onChange,
    showToolbar,
    editable,
    refresh,
}: WysiwygEditorProps) {
    const theme = useTheme();

    return (
        <TextEditor
            onChange={onChange}
            showToolbar={showToolbar}
            editable={editable}
            refresh={refresh}
            fontFamily={theme.typography.fontFamily}
        />
    );
}
