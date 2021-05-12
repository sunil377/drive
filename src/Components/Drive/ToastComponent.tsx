import { Dispatch, FC, SetStateAction } from "react";

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
            <div
                key={id}
                className="fixed-bottom"
                style={{
                    left: "inherit",
                    bottom: index * 100,
                }}
            >
                <div>
                    <span className="text-truncate">{name}</span>
                    {!failed && (
                        <button
                            onClick={() =>
                                paused
                                    ? upLoadTask.resume() && handlePause(false)
                                    : upLoadTask.pause() && handlePause(true)
                            }
                        >
                            icon
                        </button>
                    )}
                </div>
                <div>progress bar</div>
            </div>
        </>
    );
};

export default ToastComponent;

type ToastComponentType = FC<{
    file: uploadFileType;
    index: number;
    setUploadFiles: Dispatch<SetStateAction<uploadFileType[]>>;
}>;
