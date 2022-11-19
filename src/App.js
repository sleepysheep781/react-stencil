import { useState, useEffect } from 'react';
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

  //******  Filter funciton
  const [type, setType] = useState("All");
  const [filteredData, setFilteredData] = useState(bakeryData)
  const [sortType, setSortType] = useState("");
  const [sortList, setSortList] = useState(filteredData)

  const selectFilterType = eventKey => {
    setType(eventKey);
    const filtered = bakeryData.filter((item) => matchesFilterType(item, eventKey))
    //console.log(filtered)
    setFilteredData(filtered);
  };

  const matchesFilterType = (item, curType) => {
    // all items should be shown when no filter is selected
    if(curType === "All") { 
      return true
    } else if (curType === item.type) {
      return true
    } else {
      return false
    }
  }
  
  //******  Sort function
  useEffect(() => {
    const types = {
      price: 'price',
      calories: 'calories',
    };
    const sortProperty = types[sortType];
    const sorted = [...filteredData].sort((a, b) => b[sortProperty] - a[sortProperty]);

    setSortList(sorted);
  }, [filteredData, sortType])

  
  return (
    <div className="App">
      <p className='title'>Pastiche Fine Desserts</p>
      
      <div className='sort-container'>
        <label className='sort-title'>Sort By:</label>
        <select onChange={(e) => setSortType(e.target.value)}>
          <option value="">-- Please select --</option>
          <option value="price">Price</option>
          <option value="calories">Calories</option>
        </select>
      </div>
      
      <div className="body-container">
        <Nav className="side-nav" onSelect={selectFilterType}>
          <Nav.Link className='nav-btn' eventKey="All">All</Nav.Link>
          <Nav.Link className='nav-btn' eventKey="Cakes">Cakes</Nav.Link>
          <Nav.Link className='nav-btn' eventKey="Tarts">Tarts</Nav.Link>
          <Nav.Link className='nav-btn' eventKey="Cookies">Cookies</Nav.Link>
          <Nav.Link className='nav-btn' eventKey="Other Sweets">Other Sweets</Nav.Link>
        </Nav>

        <div className="card-container">
          {sortList.map(item => (
            <BakeryItem {...item} key={item.name} addToCart={addToCart}/>
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
