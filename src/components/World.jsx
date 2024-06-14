// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import Datacards from "./Datacards";

// const World = () => {
//     const countries=['us','pk','ua','ru']
//     let url = `https://newsapi.org/v2/top-headlines?country=${countries}&apiKey=815962df66144212ab640007fc632bfc`;
//     return (
        
//     );
// }

// export default World;
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Datacards from "./Datacards";

const World = () => {
    const [selectedCountry, setSelectedCountry] = useState('us');
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const countries = [
        { code: 'us', name: 'USA' },
        { code: 'pk', name: 'Pakistan' },
        { code: 'ua', name: 'Ukraine' },
        { code: 'ru', name: 'Russia' }
    ];

    const fetchData = useCallback(async (countryCode) => {
        setLoading(true);
        try {
            const url = `https://newsapi.org/v2/top-headlines?country=${countryCode}&language=en&apiKey=815962df66144212ab640007fc632bfc`;
            const response = await axios.get(url);
            setData(response.data.articles);
        } catch (error) {
            console.error("Error fetching news articles:", error);
        }
        setLoading(false);
    }, []);

    useEffect(() => {
        fetchData(selectedCountry);
    }, [selectedCountry, fetchData]);

    return (
        <div className="container my-3 d-flex justify-content-center align-items-center flex-column">
            <h1>World News</h1>
            <div className="mb-3">
                {countries.map((country) => (
                    <button
                        key={country.code}
                        className={`btn mx-2 my-2 ${selectedCountry === country.code ? 'btn-dark' : 'btn-light'}`}
                        onClick={() => setSelectedCountry(country.code)}
                    >
                        {country.name}
                    </button>
                ))}
            </div>
            <div className="my-2 row">
                {loading ? (
                    <div className="col">Loading...</div>
                ) : (
                    data.map((item) => (
                        <div className="col-md-6" key={item.url}>
                            <Datacards items={item} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default World;
