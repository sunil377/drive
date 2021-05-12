import { FC, FormEvent } from "react";

type modalType = FC<{
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onCancel: () => void;
    loading: boolean;
}>;

const ModalComponent: modalType = (props) => {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <div>{props.children}</div>
                <div>
                    <button type="submit" disabled={props.loading}>
                        Add Folder
                    </button>
                    <button onClick={props.onCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default ModalComponent;
