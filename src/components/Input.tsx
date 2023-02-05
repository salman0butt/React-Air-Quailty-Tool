import React from "react";
import { Input as SemanticUiInput } from "semantic-ui-react";

interface Props {
    label: string;
    value: string;
    placeholder: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // handler for input change
}

const Input: React.FC<Props> = ({ label, value, placeholder, onChange }) => {


    return (
        <>
            <label>{label}</label>
            {/* SemanticUiInput */}
            <SemanticUiInput
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </>
    );

}

export default Input;