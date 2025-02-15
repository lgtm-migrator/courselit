import * as React from "react";
import { styled } from "@mui/material/styles";
import { Button, Grid, TextField, Typography, Checkbox } from "@mui/material";
import { AppMessage } from "@courselit/common-models";
import type { Auth, Address } from "@courselit/common-models";
import { FetchBuilder } from "@courselit/utils";
import type { AppDispatch, AppState } from "@courselit/state-management";
import { actionCreators } from "@courselit/state-management";
import Section from "../section";

const { useState, createRef, useEffect } = React;
const { networkAction, setAppMessage } = actionCreators;

const PREFIX = "Upload";

const classes = {
    fileUploadInput: `${PREFIX}-fileUploadInput`,
};

const StyledSection = styled(Section)({
    [`& .${classes.fileUploadInput}`]: {
        display: "none",
    },
});

interface Strings {
    buttonAddFile?: string;
    fileUploaded?: string;
    uploadFailed?: string;
    uploading?: string;
    uploadButtonText?: string;
    publiclyAvailable?: string;
}

interface UploadProps {
    auth: Auth;
    address: Address;
    dispatch: AppDispatch;
    resetOverview: any;
    strings: Strings;
}

function Upload({
    auth,
    address,
    dispatch,
    resetOverview,
    strings,
}: UploadProps) {
    const defaultUploadData = {
        caption: "",
        uploading: false,
        public: false,
    };
    const [uploadData, setUploadData] = useState(defaultUploadData);
    const fileInput: React.RefObject<HTMLInputElement> = createRef();
    const [uploading, setUploading] = useState(false);
    const [presignedUrl, setPresignedUrl] = useState("");

    const onUploadDataChanged = (e: any) =>
        setUploadData(
            Object.assign({}, uploadData, {
                [e.target.name]:
                    e.target.type === "checkbox"
                        ? e.target.checked
                        : e.target.value,
            })
        );

    useEffect(() => {
        getPresignedUrl();
    }, []);

    const getPresignedUrl = async () => {
        const fetch = new FetchBuilder()
            .setUrl(`${address.backend}/api/media/presigned`)
            .setIsGraphQLEndpoint(false)
            .build();
        try {
            dispatch(networkAction(true));
            const response = await fetch.exec();
            setPresignedUrl(response.url);
        } catch (err: any) {
            dispatch(
                setAppMessage(
                    new AppMessage(
                        strings.uploadFailed ||
                            "That did not work! Please go back and try again."
                    )
                )
            );
        } finally {
            dispatch(networkAction(false));
        }
    };

    const onUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        await uploadToServer();
    };

    const uploadToServer = async () => {
        const fD = new FormData();
        fD.append("caption", uploadData.caption);
        fD.append("access", uploadData.public ? "public" : "private");
        fD.append("file", (fileInput as any).current.files[0]);

        setUploadData(
            Object.assign({}, uploadData, {
                uploading: true,
            })
        );

        try {
            setUploading(true);

            let res: any = await fetch(presignedUrl, {
                method: "POST",
                body: fD,
            });
            if (res.status === 200) {
                dispatch(
                    setAppMessage(
                        new AppMessage(
                            strings.fileUploaded ||
                                "The file is uploaded. Go back to see your media."
                        )
                    )
                );
                resetForm();
                resetOverview();
            } else {
                res = await res.json();
                throw new Error(res.error);
            }
        } catch (err) {
            dispatch(setAppMessage(new AppMessage(err.message)));
        } finally {
            setUploading(false);
        }
    };

    const resetForm = () => {
        setPresignedUrl("");
    };

    return (
        <StyledSection>
            <form onSubmit={onUpload} encType="multipart/form-data">
                <Button variant="outlined" component="label" color="primary">
                    {strings.buttonAddFile || "Select a file"}
                    <input
                        type="file"
                        name="file"
                        ref={fileInput}
                        className={classes.fileUploadInput}
                    />
                </Button>
                <TextField
                    variant="outlined"
                    label="Alt text"
                    fullWidth
                    margin="normal"
                    name="caption"
                    value={uploadData.caption}
                    onChange={onUploadDataChanged}
                />
                <Grid container alignItems="center">
                    <Grid item>
                        <Typography variant="body1">
                            {strings.publiclyAvailable || "Publicly available"}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Checkbox
                            name="public"
                            onChange={onUploadDataChanged}
                        />
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    disabled={uploading || !presignedUrl}
                    variant="outlined"
                >
                    {uploading
                        ? strings.uploading || "Uploading..."
                        : strings.uploadButtonText || "Upload"}
                </Button>
            </form>
        </StyledSection>
    );
}

export default Upload;
