import React, { useState } from "react";
// import { Form, Input, Button, Table, Message } from "semantic-ui-react";
import axios from "axios";
import Form from './Form';
import { Message } from "semantic-ui-react";
import Table from './Table';
import Loader from './Loader'

const requestApi = (city: string) => {
    // axios open aq api endpoint
    return axios.get(`https://api.openaq.org/v1/measurements?city=${city}`);
}

interface CityInterface {
    cityName: string;
    airQuality: number;
}

const AirQuality = () => {
    // city for input 1
    const [city1, setCity1] = useState<CityInterface>({ cityName: "", airQuality: 0 });
    // city for input 2
    const [city2, setCity2] = useState<CityInterface>({ cityName: "", airQuality: 0 });
    // Errors
    const [error, setError] = useState<string | null>(null);
    // loader
    const [loader, setLoader] = useState<Boolean>(false);
    const [comparisonResult, setComparisonResult] = useState<string>('');

    async function fetchApiData() {
        if (!city1.cityName || !city2.cityName) return;
        try {
            // start loader
            setLoader(true);
            // sending API request parrallel for both cities
            const [city1Response, city2Response] = await Promise.all([requestApi(city1.cityName), requestApi(city2.cityName)]);
            const city1AirQuality = city1Response.data.results[0].value;
            const city2AirQuality = city2Response.data.results[0].value;
            // if there is not air quality for city 1 or city 2
            if (!city1AirQuality || !city2AirQuality) {
                setError("No Record Found");
                return;
            }
            // setting state for city 1
            setCity1((prev: CityInterface) => {
                return {
                    ...prev,
                    airQuality: city1AirQuality
                }
            });
             // setting state for city 1
            setCity2((prev: CityInterface) => {
                return {
                    ...prev,
                    airQuality: city2AirQuality
                }
            });

            let comparison;
            // comapre the air quality
            if (city1AirQuality > city2AirQuality) {
                comparison = `${city1.cityName} has higher air quality than ${city2.cityName}`;
            } else if (city1AirQuality < city2AirQuality) {
                comparison = `${city2.cityName} has higher air quality than ${city1.cityName}`;
            } else {
                comparison = `${city1.cityName} and ${city2.cityName} have the same air quality`;
            }
            // set Air Quality to the state
            setComparisonResult(comparison);
            // stop loader
            setLoader(false);
        } catch (err: any) {
            // if there is any error set states to inital
            setCity1({ cityName: "", airQuality: 0 });
            setCity2({ cityName: "", airQuality: 0 });
            // stop loader
            setLoader(false);
            // set Error
            setError("No Record Found");
        }
    }

    const handleCity1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        // set city 1 state on input
        setCity1((prev: CityInterface) => {
            return {
                ...prev,
                cityName: e.target.value,
            }
        });
    };

    const handleCity2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        // set city 2 state on input
        setCity2((prev: CityInterface) => {
            return {
                ...prev,
                cityName: e.target.value,
            }
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // if there is no city 1 name or city 2 name
        if (!city1.cityName || !city2.cityName) {
            setError("Please enter both cities.");
            return;
        } else {
            // reset the Errors
            setError(null);
            // fetch the data on submit
            fetchApiData();
        }
    };

    return (
        <>
            <h1>Air Quality Assessment Tool</h1>
            {/* Form */}
            <Form
                city1={city1.cityName} // pass city 1 name
                city2={city2.cityName} // pass city 2 name
                onChangeCity1={handleCity1Change} // handler for city 1
                onChangeCity2={handleCity2Change} // handler for city 2
                handleSubmit={handleSubmit} // submit handler
            />
            {/* Errors */}
            {error && (
                <Message
                    error
                    header="Error"
                    content={error}
                    onDismiss={() => setError(null)}
                />
            )}
             {/* Show loader if loader active otherwise show table data */}
            {loader ? <Loader /> : <Table
                city1={city1}
                city2={city2}
                comparisonResult={comparisonResult}
            /> }
        </>

    );
}

export default AirQuality;