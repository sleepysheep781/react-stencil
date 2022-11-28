export default function CartItem (props) {
    const {item, addtocart, removefromcart} = props;
    return(
      <div className="one-item">
        <p className="text-left">{item.name}</p>
        <div className="quantity-right">
          <button className="quantity-btn" onClick={(e)=> removefromcart(item)}>-</button>
          <p className="text-left">{item.quantity}</p>
          <button className="quantity-btn" onClick={(e)=> addtocart(item)}>+</button>
        </div>
      </div>
    )
}