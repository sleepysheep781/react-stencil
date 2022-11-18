import { useState } from 'react';
import './App.css';
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";
import CartItem from './components/CartItem';


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
  const [data, setData] = useState(BakeryItem);
  const handleFilter = (filterItem) =>{
    const result = BakeryItem.filter((curData)=>{
      return curData.type === filterItem;
    });
    setData(result);
  }*/

  return (
    <div className="App">
      <p className='title'>Pastiche Fine Desserts</p>
      
      <div className="body-container">
        <div className='side-nav'>
          <button className='nav-btn'>All</button>
          <button className='nav-btn'>Cakes</button>
          <button className='nav-btn'>Tarts</button>
          <button className='nav-btn'>Cookies</button>
        </div>
        
        <div className="card-container">
          {bakeryData.map((item) => (
            <BakeryItem {...item} cart={cart} addToCart={addToCart} key={item.name} />
          ))}
        </div>
   
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
