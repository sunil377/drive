import { ChangeEvent, useState } from "react";

export const useInputChange = () => {
    const [value, setValue] = useState("");
    const onChange = (e: ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value);
    return { value, onChange };
};
