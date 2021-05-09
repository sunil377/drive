import { faPauseCircle, faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dispatch, FC, SetStateAction } from "react";
import {
    Button,
    ProgressBar,
    Toast,
    ToastBody,
    ToastHeader,
} from "react-bootstrap";
import { uploadFileType } from "./AddFile/AddFile";

const ToastComponent: ToastComponentType = (props) => {
    const { file, index, setUploadFiles } = props;
    const { failed, paused, upLoadTask, id, name, rate } = file;

    const handleClose = () => {
        const del = window.confirm("Are you Sure");
        if (del) {
            setUploadFiles((prev) => prev.filter((e) => e.id != id));
            upLoadTask.cancel();
        }
    };

    const handlePause = (value: boolean) =>
        setUploadFiles((prev) =>
            prev.map((e) => {
                return e.id === id ? { ...e, paused: value } : e;
            })
        );

    return (
        <>
            <Toast
                key={id}
                show={true}
                onClose={handleClose}
                className="fixed-bottom"
                style={{
                    left: "inherit",
                    bottom: index * 100,
                }}
            >
                <ToastHeader>
                    <span className="text-truncate">{name}</span>
                    {!failed && (
                        <Button
                            size="sm"
                            variant="outline-secondary border-0"
                            onClick={() =>
                                paused
                                    ? upLoadTask.resume() && handlePause(false)
                                    : upLoadTask.pause() && handlePause(true)
                            }
                        >
                            <FontAwesomeIcon
                                icon={paused ? faRedo : faPauseCircle}
                            />
                        </Button>
                    )}
                </ToastHeader>
                <ToastBody>
                    <ProgressBar
                        animated={!failed}
                        now={rate}
                        variant={failed ? "danger" : "primary"}
                        label={paused ? " paused " : Math.round(rate) + "%"}
                    />
                </ToastBody>
            </Toast>
        </>
    );
};

export default ToastComponent;

type ToastComponentType = FC<{
    file: uploadFileType;
    index: number;
    setUploadFiles: Dispatch<SetStateAction<uploadFileType[]>>;
}>;
