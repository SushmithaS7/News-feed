
import React, { useState, useEffect } from "react";
import axios from "axios";

const apiKey = process.env.WEATHER_API_KEY; // Replace with your actual API key
const cities = ["Mumbai", "Delhi", "Bengaluru", "Chennai", "Kolkata","Mysuru","Pune","Hyderabad"];

const Weather = () => {
    const [data, setData] = useState({});
    const [searchResult, setSearchResult] = useState(null);
    const [cityName, setCityName] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchWeatherData = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        setLoading(true);

        try {
            const response = await axios.get(url);
            setData(prevData => ({ ...prevData, [city]: response.data }));
            setError(null); // Clear any previous errors
        } catch (error) {
            setError("Some cities not found. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const fetchSearchResult = async (city) => {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        setLoading(true);

        try {
            const response = await axios.get(url);
            setSearchResult(response.data);
            setError(null); // Clear any previous errors
        } catch (error) {
            setError("City not found. Please try again.");
            setSearchResult(null); // Clear previous search result if there's an error
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        cities.forEach(city => fetchWeatherData(city));
    }, []);

    const handleInputChange = (e) => {
        setCityName(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cityName.trim() !== "") {
            fetchSearchResult(cityName);
            setCityName(""); // Clear the input after search
        }
    };

    return (
        <section>
        <h1 className="d-flex justify-content-center">Current Weather</h1>
            <div className="container my-3 d-flex flex-column">
                <div className="my-2 row">
                    <div className="col-md-12">
                        <form onSubmit={handleSubmit} className="d-flex">
                            <div className="form-group flex-grow-1 my-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search by city name"
                                    value={cityName}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary mx-2">Go</button>
                            </div>
                        </form>
                        {error && <div className="alert alert-danger mt-2">{error}</div>}
                        <div className="mt-3">
                            {loading && <p>Loading...</p>}
                            {searchResult && (
                                <div className="weather-info mt-2">
                                    <h6>Search Result: {searchResult.name}</h6>
                                    <p>The weather is currently {searchResult.weather[0].description}</p>
                                    <p>Temperature: {searchResult.main.temp}°C</p>
                                    <img
                                        src={`https://openweathermap.org/img/wn/${searchResult.weather[0].icon}@2x.png`}
                                        alt={searchResult.weather[0].description}
                                    />
                                </div>
                            )}
                            <h3 className="d-flex justify-content-center">Current Weather in Major Indian Cities</h3>
                            <div className="row">
                            {Object.keys(data).map((city) => (
                                data[city] ? (
                                    <div className="col-md-3" key={city}>
                                    <div key={city} className="weather-info mt-2">
                                        <h2>{city}</h2>
                                        <p>The weather is currently {data[city].weather[0].description}</p>
                                        <p>Temperature: {data[city].main.temp}°C</p>
                                        <img
                                            src={`https://openweathermap.org/img/wn/${data[city].weather[0].icon}@2x.png`}
                                            alt={data[city].weather[0].description}
                                        />
                                    </div>
                                    </div>
                                ) : null
                            ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Weather;
