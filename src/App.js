import { useState, useEffect, useCallback } from 'react';
import './App.css';
import bakeryData from "./assets/bakery-data.json";
import BakeryItem from "./components/BakeryItem";
import CartItem from './components/CartItem';

import Box from '@mui/joy/Box';
import Checkbox from '@mui/joy/Checkbox';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';


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
  const [sortList, setSortList] = useState(filteredData);
  const [restrictionSet, setRestrictionSet] = useState(new Set());
  

  //******  Filter function: Type
  const selectFilterType = event => {
    setType(event.target.value);
    let filtered = bakeryData.filter((item) => matchesFilterType(item, event.target.value))
    if(restrictionSet.size){
      for (let restriction of restrictionSet) {
        filtered = filtered.filter((product) => product.restrictions.includes(restriction))
      }
    }
    setFilteredData(filtered)
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

 //******  Filter function: Restriction
  const filterRestriction = useCallback(event => {
      let check_box = event.target.value;
      if (event.target.checked) {
        restrictionSet.add(check_box)
      }else {
        restrictionSet.delete(check_box)
      }
      let filtered = bakeryData.filter((item) => matchesFilterType(item, type))
      
      if(restrictionSet.size) {
        for(let feature of restrictionSet) {
          filtered = filtered.filter((product) => product.restrictions.includes(feature))
        }
      }
      setFilteredData(filtered);
      return restrictionSet;
  }, [filteredData])
 
  // const filterRestriction = useCallback(event => {
  //   setRestriction(prevRestriction=>{
  //     let bakeryProduct = filteredData
  //     var temp = filteredData
  //     //console.log(event.target.value);
  //     //console.log(filters);
  //     if (event.target.checked){
  //       //filters = bakeryProduct.filter((product) => product.restrictions.includes(event.target.value))
  //       restriction.filters.add(event.target.value)
  //       if(restriction.filters.size){
  //         for (let feature of restriction.filters) {
  //           bakeryProduct = bakeryProduct.filter((product) => product.restrictions.includes(feature))
  //         }
  //       }
  //     } else{
  //       restriction.filters.delete(event.target.value)
  //       console.log(filteredData)
  //       bakeryProduct = temp
  //     }
  //     //console.log("filters: ", filters)
  //     //console.log(bakeryProduct)

  //     if(restriction.filters.size){
  //       for (let feature of restriction.filters) {
  //         bakeryProduct = bakeryProduct.filter((product) => product.restrictions.includes(feature))
  //       }
  //       // bakeryProduct = bakeryProduct.filter(b=>{
  //       //   return filters.has(b.restrictions)
  //       // }) 
  //     }
  //     console.log(bakeryProduct)
  //     setFilteredData(bakeryProduct);
  //     setRestriction(bakeryProduct, restriction.filters);
  //     // set the resriction to filters
  //     return restriction.filters;
  //   })
  // }, [filteredData, restriction])
  
  
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

        <Box>
          <Sheet variant="outlined" sx={{ p: 2, borderRadius: 'sm', width: 190, bgcolor: '#E6E6FA' }}>
            <FormControl>
              <Typography id="radio-buttons-group-label" level="body2" fontWeight="lg">Types</Typography>
              <RadioGroup
                aria-labelledby="radio-buttons-group-label"
                defaultValue="All"
                name="radio-buttons-group"
                value={type}
                onChange={selectFilterType}
              >
                <FormControlLabel value="All" control={<Radio />} label="All" />
                <FormControlLabel value="Cakes" control={<Radio />} label="Cakes" />
                <FormControlLabel value="Tarts" control={<Radio />} label="Tarts" />
                <FormControlLabel value="Cookies" control={<Radio />} label="Cookies" />
                <FormControlLabel value="Other Sweets" control={<Radio />} label="Other Sweets" />
              </RadioGroup>
            </FormControl>
           

          <Typography id="sandwich-group2" level="body2" fontWeight="lg" mb={1}>
            Dietary Restrictions
          </Typography>
          <Box role="group" aria-labelledby="sandwich-group2">
            <List size="sm">
              <ListItem><Checkbox value="Gluten-free" label="Gluten-free" onChange={filterRestriction}/></ListItem>
              <ListItem><Checkbox value="Nut-free" label="Nut-free" onChange={filterRestriction}/></ListItem>
              <ListItem><Checkbox value="Dairy-free" label="Dairy-free" onChange={filterRestriction}/></ListItem>
            </List>
          </Box>
        </Sheet>
      </Box>

  

        {/*
        <Nav className="side-nav" onSelect={selectFilterType}>
          <Nav.Link className='nav-btn' eventKey="All">All</Nav.Link>
          <Nav.Link className='nav-btn' eventKey="Cakes">Cakes</Nav.Link>
          <Nav.Link className='nav-btn' eventKey="Tarts">Tarts</Nav.Link>
          <Nav.Link className='nav-btn' eventKey="Cookies">Cookies</Nav.Link>
          <Nav.Link className='nav-btn' eventKey="Other Sweets">Other Sweets</Nav.Link>
        </Nav>
  */}

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
