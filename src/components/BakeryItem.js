import React from 'react';

export default function BakeryItem (props){

    return (
        <div className="bakery-item">
            <img className="bakery-image" alt={props.name} src={props.image}/>
            <div className="item-info">
                <h4>{props.name}</h4>
                <p className="item-description">{props.description}</p>
                <p>Type: {props.type}</p>
                <div className="calories-price">
                    <p className="calories">Calories: {props.calories}</p>
                    <p className="price">${props.price}</p>
                </div>
                <button onClick={()=>props.addToCart(props)} className="add-btn" >Add to cart</button>
            </div>
        </div>
    );
};