import React from "react";
import { Form as SemanticUiForm, Button } from "semantic-ui-react";
import Input from './Input';

// props for form component
interface Props {
    city1: string;
    city2: string;
    onChangeCity1: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onChangeCity2: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form: React.FC<Props> = ({ city1, city2, onChangeCity1, onChangeCity2, handleSubmit }) => {
    return (
        <SemanticUiForm onSubmit={handleSubmit}>
            <SemanticUiForm.Field>
                {/* city1 input field */}
                <Input
                    label="City 1"
                    placeholder="Enter city name"
                    value={city1} // city1 value
                    onChange={onChangeCity1} // handler on change
                />
            </SemanticUiForm.Field>
            <SemanticUiForm.Field>
                 {/* city2 input field */}
                <Input
                    label="City 2"
                    placeholder="Enter city name"
                    value={city2} // city2 value
                    onChange={onChangeCity2} // handler on change
                />
            </SemanticUiForm.Field>
             {/* submit form */}
            <Button type="submit">Compare</Button>
        </SemanticUiForm>
    )
}

export default Form;