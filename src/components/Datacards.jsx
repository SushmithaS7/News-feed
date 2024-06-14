import React from 'react'

const Datacards = (props) => {
    return (
        <div className="my-5 mx-2">
            <h5 className="my-3" style={{marginBottom:'20px'}}>{props.items.title}</h5>
            <div>
            <img alt={props.items.title} src={props.items.urlToImage} className="img-fluid" style={{width:"100%",height:"300px",objectFit:"cover"}} />
            </div>
            <p className="my-1">{props.content}</p>
            <a href={props.items.url} target="_blank" rel="noopener noreferrer">View More</a>
        </div>
    );
}

export default Datacards