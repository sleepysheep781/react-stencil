import { useState } from 'react';
import './App.css';
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";
import CartItem from './components/CartItem';

import Nav from 'react-bootstrap/Nav';


// fetch jasn data in bakeryData Array
bakeryData.forEach((item) => {
  item.image = process.env.PUBLIC_URL + "/" + item.image;
});

const prices = {};
bakeryData.forEach((item) => {
  prices[item.name] = item.price;
});

function App() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart=(item)=>{
    const newCart = { ...cart };
    const name = item.name
    if (newCart[name]) {
      newCart[name].quantity++;
    } else {
      newCart[name] = { name, quantity: 1 };
    }
    //console.log("newCart", newCart);
    //console.log("calling setTotal with", total)
    //console.log("calling setTotal with price,",  item.price)
    setTotal(total + prices[item.name]);
    setCart(newCart);
  }

  const removeFromCart = (item) => {
    const newCart = { ...cart };
    const name = item.name
    if (newCart[name]) {
      newCart[name].quantity--;
      if(newCart[name].quantity === 0){
        delete newCart[name];
      }
    } else {
      newCart[name] = { name, quantity: 0 };
    }
    //console.log("newCart", newCart);
    setCart(newCart);
    setTotal(total - prices[item.name]);
  };
 

  // Filter funciton
  /*
  const [type, setType] = useState(bakeryData);
  const handleFilter = (typeItem) =>{
    const result = bakeryData.filter((curItem)=>{
      return curItem.type === typeItem;
    });
    setType(result);
  }*/

  const [type, setType] = useState("All");
  const selectFilterType = eventKey => {
    setType(eventKey);
  };

  const matchesFilterType = item => {
    // all items should be shown when no filter is selected
    if(type === "All") { 
      return true
    } else if (type === item.type) {
      return true
    } else {
      return false
    }
  }
  
  const filteredData = bakeryData.filter(matchesFilterType)

  return (
    <div className="App">
      <p className='title'>Pastiche Fine Desserts</p>
      
      <div className="body-container">
        <Nav className="side-nav" onSelect={selectFilterType}>
          <Nav.Link className='nav-btn' eventKey="All">All</Nav.Link>
          <Nav.Link className='nav-btn' eventKey="Cakes">Cakes</Nav.Link>
          <Nav.Link className='nav-btn' eventKey="Tarts">Tarts</Nav.Link>
          <Nav.Link className='nav-btn' eventKey="Cookies">Cookies</Nav.Link>
        </Nav>

        <div className="card-container">
          {filteredData.map(item => 
            <BakeryItem {...item} key={item.name} addToCart={addToCart}/>
          )}
        </div>

        {/*
        <div className="card-container">
          {bakeryData.map((item) => (
            <BakeryItem {...item} key={item.name} addToCart={addToCart}/>
          ))}
        </div>
          */}
   
        <div className="cart">
          <p className="cart-title">Cart</p>
            {Object.values(cart).map((item) => (
              <CartItem className="cart-item" item={item} addtocart={addToCart} removefromcart={removeFromCart} key={item.name} />
            ))}
            
            {!isNaN(total) && total > 0 && <p className="total-price">Total: ${total.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]}</p>}
        </div>      
      </div>
    </div>
  );
}

export default App;
