import React, { useEffect, FC, PropsWithChildren, useCallback } from "react";
import {
    PlaceholderExtension,
    wysiwygPreset,
    ImageExtension,
} from "remirror/extensions";
import { TableExtension } from "@remirror/extension-react-tables";
import {
    EditorComponent,
    Remirror,
    TableComponents,
    ThemeProvider,
    useRemirror,
} from "@remirror/react";
import { AllStyledComponent } from "@remirror/styles/emotion";
import { RemirrorContentType } from "@remirror/core-types";
import { getTextContentFromSlice } from "@remirror/core";
import { InvalidContentHandler } from "remirror";

import BubbleMenu from "./BubbleMenu";
import Toolbar from "./Toolbar";
import { ReactEditorProps } from "./types";

export interface WysiwygEditorProps extends Partial<ReactEditorProps> {
    onChange: (...args: any[]) => void;
    showToolbar?: boolean;
    editable?: boolean;
    refresh?: number;
    fontFamily?: string;
}

const emptyDoc: RemirrorContentType = {
    type: "doc",
    content: [],
};

export const WysiwygEditor: FC<PropsWithChildren<WysiwygEditorProps>> = ({
    initialContent,
    onChange,
    placeholder,
    stringHandler,
    children,
    showToolbar = true,
    editable = true,
    refresh,
    fontFamily,
    ...rest
}) => {
    const theme = {
        fontFamily: {
            default: fontFamily,
        },
    };

    if (typeof window === "undefined") {
        return <></>;
    }

    useEffect(() => {
        manager.view.updateState(
            manager.createState({
                content: initialContent as RemirrorContentType,
            })
        );
    }, [refresh]);

    const wysiwygPresetArrayWithoutImageExtension = wysiwygPreset().filter(
        (extension) => extension instanceof ImageExtension !== true
    );

    const extensions = useCallback(
        () => [
            new PlaceholderExtension({ placeholder }),
            new TableExtension(),
            new ImageExtension({ enableResizing: true }),
            ...wysiwygPresetArrayWithoutImageExtension,
        ],
        [placeholder]
    );

    const onError: InvalidContentHandler = useCallback(
        ({ json, invalidContent, transformers }) => {
            // Automatically remove all invalid nodes and marks.
            return transformers.remove(json, invalidContent);
        },
        []
    );

    const {
        manager,
        state,
        onChange: onChangeRemirror,
    } = useRemirror({
        extensions,
        stringHandler,
        content: (initialContent as RemirrorContentType) || emptyDoc,
        onError,
    });

    const onChangeFunc = (data: any) => {
        onChange(data.helpers.getJSON());
    };

    return (
        <AllStyledComponent>
            <ThemeProvider theme={theme}>
                <Remirror
                    manager={manager}
                    state={state}
                    onChange={(data) => {
                        onChangeFunc(data);
                        onChangeRemirror(data);
                    }}
                    editable={editable}
                    {...rest}
                >
                    {editable && showToolbar && <Toolbar />}
                    <EditorComponent />
                    <BubbleMenu />
                    <TableComponents />
                    {children}
                </Remirror>
            </ThemeProvider>
        </AllStyledComponent>
    );
};

(WysiwygEditor as any).getPlainText = (doc: any) =>
    getTextContentFromSlice(doc);
