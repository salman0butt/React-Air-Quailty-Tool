import React from "react";
import { Form as SemanticUiForm, Button } from "semantic-ui-react";
import Input from './Input';

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
                <Input
                    label="City 1"
                    placeholder="Enter city name"
                    value={city1}
                    onChange={onChangeCity1}
                />
            </SemanticUiForm.Field>
            <SemanticUiForm.Field>
                <Input
                    label="City 2"
                    placeholder="Enter city name"
                    value={city2}
                    onChange={onChangeCity2}
                />
            </SemanticUiForm.Field>
            <Button type="submit">Compare</Button>
        </SemanticUiForm>
    )
}

export default Form;