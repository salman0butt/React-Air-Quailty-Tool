import React, { useState, useEffect } from "react";
import { Form, Input, Button, Table, Message } from "semantic-ui-react";
import axios from "axios";

interface CityData {
    results: [
        {
            value: number;
        }
    ];
}

const AirQualityAssessmentTool: React.FC = () => {
    const [city1, setCity1] = useState("");
    const [city2, setCity2] = useState("");
    const [city1Data, setCity1Data] = useState<CityData | null>(null);
    const [city2Data, setCity2Data] = useState<CityData | null>(null);
    const [error, setError] = useState<any | null>(null);
    const [comparisonResult, setComparisonResult] = useState<string | undefined>('');


    useEffect(() => {
        async function fetchData() {
            if (!city1 || !city2) return;
            try {
                const city1DataPromise = axios.get(`https://api.openaq.org/v1/measurements?city=${city1}`);
                const city2DataPromise = axios.get(`https://api.openaq.org/v1/measurements?city=${city2}`);
                const [city1Response, city2Response] = await Promise.all([city1DataPromise, city2DataPromise]);
    
                setCity1Data(city1Response.data);
                setCity2Data(city2Response.data);
            } catch (err) {
                setError(err);
            }
        }
        fetchData();
    }, [city1, city2]);



    const handleCity1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity1(e.target.value);
    };

    const handleCity2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity2(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!city1 || !city2) {
            setError("Please enter both cities.");
        } else {
            setError(null);
        }
    };

    const compareAirQuality = (): string | undefined => {
        if (!city1Data || !city2Data) return;
    
        const city1AirQuality = city1Data.results[0].value;
        const city2AirQuality = city2Data.results[0].value;
    
        let comparison;
        if (city1AirQuality > city2AirQuality) {
            comparison = `${city1} has higher air quality than ${city2}`;
        } else if (city1AirQuality < city2AirQuality) {
            comparison = `${city2} has higher air quality than ${city1}`;
        } else {
            comparison = `${city1} and ${city2} have the same air quality`;
        }
    
        return comparison;
    }

    const handleCompareClick = () => {
        setComparisonResult(compareAirQuality());
    }

    return (
        <div>
            <h1>Air Quality Assessment Tool</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label>City 1</label>
                    <Input
                        placeholder="Enter city name"
                        value={city1}
                        onChange={handleCity1Change}
                    />
                </Form.Field>
                <Form.Field>
                    <label>City 2</label>
                    <Input
                        placeholder="Enter city name"
                        value={city2}
                        onChange={handleCity2Change}
                    />
                </Form.Field>
                <Button onClick={handleCompareClick}>Compare</Button>
            </Form>
            {error && (
                <Message
                    error
                    header="Error"
                    content={error}
                    onDismiss={() => setError(null)}
                />
            )}
            {city1Data && city2Data && city1Data.results && city2Data.results && comparisonResult && (
                <Table>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell>City</Table.HeaderCell>
                            <Table.HeaderCell>Air Quality</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell>{city1}</Table.Cell>
                            <Table.Cell>
                                {city1Data.results[0] && city1Data.results[0].value}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>{city2}</Table.Cell>
                            <Table.Cell>
                                {city2Data.results[0] && city2Data.results[0].value}
                            </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                            <Table.Cell>Comparison</Table.Cell>
                            <Table.Cell>
                                {compareAirQuality()}
                            </Table.Cell>
                        </Table.Row>
                    </Table.Body>
                </Table>
            )}
        </div>
    );
};

export default AirQualityAssessmentTool;