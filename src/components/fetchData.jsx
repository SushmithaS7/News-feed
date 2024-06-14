

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Datacards from "./Datacards";

const FetchData = ({ cat }) => {
    const [data, setData] = useState([]);
    const [keyword, setKeyword] = useState("");
    const [sources, setSource] = useState("");
    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    const fetchData = useCallback(async () => {
        console.log(cat)
        const apiKey=process.env.REACT_APP_NEWS_API_KEY;
        let url = `https://newsapi.org/v2/top-headlines?country=in&pageSize=20&page=${page}`;
        if (cat) url += `&category=${cat}`;
        if (keyword) url += `&q=${keyword}`;
        if (sources && !cat) url = `https://newsapi.org/v2/top-headlines?sources=${sources}&page=${page}`;
        url += `&apiKey=${apiKey}`;
        console.log(url)

        await axios.get(url)
            .then((res) => {
                setData(res.data.articles);
                setTotalResults(res.data.totalResults);
            });
    }, [cat, keyword, sources, page]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        setPage(1); // Reset page to 1 when category changes
    }, [cat]);

    const handleNextPage = () => {
        if (page < Math.ceil(totalResults / 20)) {
            setPage(page + 1);
        }
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(page - 1);
        }
    };

    return (
        <div className="container my-3 d-flex justify-content-center align-items-center flex-column">
            <h1>{cat ? `${cat.toUpperCase()} HEADLINES` : 'TOP HEADLINES'}</h1>
            <div className="my-2">
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by keyword"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </div>
                {!cat && (
                    <div className="form-group">
                        <select
                            className="form-control"
                            value={sources}
                            onChange={(e) => setSource(e.target.value)}
                        >
                            <option value="">All Sources</option>
                            <option value="bbc-news">BBC News</option>
                            <option value="cnn">CNN</option>
                            <option value="the-times-of-india">Times of India</option>
                        </select>
                    </div>
                )}
            </div>
            <div className="my-2 row">
                {data.length > 0 ? (
                    data.map((items) => (
                        <div className="col-md-6" key={items.url}>
                            <Datacards items={items} key={items.url} />
                        </div>
                    ))
                ) : (
                    <div className="col">Loading...</div>
                )}
            </div>
            <div className="d-flex justify-content-between align-items-center my-3">
                <button className="btn btn-dark" onClick={handlePrevPage} disabled={page === 1}>
                    Previous
                </button>
                <span className="mx-2">Page {page} of {Math.ceil(totalResults / 20)}</span>
                <button className="btn btn-dark" onClick={handleNextPage} disabled={page === Math.ceil(totalResults / 20)}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default FetchData;
