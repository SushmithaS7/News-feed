import React, { useEffect ,useState,useCallback} from "react";
import axios from "axios";

const FetchData =({cat})=>{
    const [data,setData]=useState("");
    // const fetchData = async ()=>{
    //     await axios.get(
    //         cat? `https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=815962df66144212ab640007fc632bfc`:
    //         "https://newsapi.org/v2/top-headlines?country=in&apiKey=815962df66144212ab640007fc632bfc"
    //     )
    //     .then((res) => setData(res.data.articles));
    // };
    // useEffect(()=>{
    //     fetchData();
    // },[cat]);
    const fetchData = useCallback(async () => {
        const apiKey = process.env.REACT_APP_NEWS_API_KEY;
        await axios.get(
            cat
                ? `https://newsapi.org/v2/top-headlines?country=in&category=${cat}&apiKey=${apiKey}`
                : `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`
        )
        .then((res) => setData(res.data.articles));
    }, [cat]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);
    return (
        <div className ="container my-3 d-flex justify-content-cener align-items-center flex-column">
        <h1>Top Headlines</h1>
        <div className="my-2">
            {data?(data.map((items)=>{
                return(
                    <div className="container" key={items.url} style={{width:"500px"}}>
                        <h5 className="my-1">{items.title}</h5>
                        <div>
                        <img alt={items.title} src={items.urlToImage} className="img-fluid" style={{width:"auto",height:"300px",objectFit:"cover"}} />
                        </div>
                        
                        <p className="my-1">{items.content}</p>
                        <a href={items.url} target="_blank" rel="noopener noreferrer">View More</a>
                    </div>
                );
                    

            })):"Loading..."}
            
        </div>
        </div>
    );
}

export default FetchData;