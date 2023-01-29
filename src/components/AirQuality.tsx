import React, { useState } from "react";
// import { Form, Input, Button, Table, Message } from "semantic-ui-react";
import axios from "axios";
import Form from './Form';
import { Message } from "semantic-ui-react";
import Table from './Table';
import Loader from './Loader'

const requestApi = (city: string) => {
    return axios.get(`https://api.openaq.org/v1/measurements?city=${city}`);
}

interface CityInterface {
    cityName: string;
    airQuality: number;
}

const AirQuality = () => {
    const [city1, setCity1] = useState<CityInterface>({ cityName: "", airQuality: 0 });
    const [city2, setCity2] = useState<CityInterface>({ cityName: "", airQuality: 0 });
    const [error, setError] = useState<string | null>(null);
    const [loader, setLoader] = useState<Boolean>(false);
    const [comparisonResult, setComparisonResult] = useState<string>('');

    async function fetchData() {
        if (!city1.cityName || !city2.cityName) return;
        try {
            setLoader(true);
            const [city1Response, city2Response] = await Promise.all([requestApi(city1.cityName), requestApi(city2.cityName)]);
            const city1AirQuality = city1Response.data.results[0].value;
            const city2AirQuality = city2Response.data.results[0].value;
            if (!city1AirQuality || !city2AirQuality) {
                setError("No Record Found");
            }

            setCity1((prev: any) => {
                return {
                    ...prev,
                    airQuality: city1AirQuality
                }
            });

            setCity2((prev: any) => {
                return {
                    ...prev,
                    airQuality: city2AirQuality
                }
            });

            let comparison;
            if (city1AirQuality > city2AirQuality) {
                comparison = `${city1.cityName} has higher air quality than ${city2.cityName}`;
            } else if (city1AirQuality < city2AirQuality) {
                comparison = `${city2.cityName} has higher air quality than ${city1.cityName}`;
            } else {
                comparison = `${city1.cityName} and ${city2.cityName} have the same air quality`;
            }

            setComparisonResult(comparison);
            setLoader(false);
        } catch (err: any) {
            setCity1({ cityName: "", airQuality: 0 });
            setCity2({ cityName: "", airQuality: 0 });
            setLoader(false);
            setError("No Record Found");
        }
    }

    const handleCity1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity1((prev: any) => {
            return {
                ...prev,
                cityName: e.target.value,
            }
        });
    };

    const handleCity2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity2((prev: any) => {
            return {
                ...prev,
                cityName: e.target.value,
            }
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!city1.cityName || !city2.cityName) {
            setError("Please enter both cities.");
        } else {
            setError(null);
            fetchData();
        }
    };

    return (
        <>
            <h1>Air Quality Assessment Tool</h1>
            <Form
                city1={city1.cityName}
                city2={city2.cityName}
                onChangeCity1={handleCity1Change}
                onChangeCity2={handleCity2Change}
                handleSubmit={handleSubmit}
            />
            {error && (
                <Message
                    error
                    header="Error"
                    content={error}
                    onDismiss={() => setError(null)}
                />
            )}
            {loader ? <Loader /> : <Table
                city1={city1}
                city2={city2}
                comparisonResult={comparisonResult}
            /> }
        </>

    );
}

export default AirQuality;