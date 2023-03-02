import { Button, Card } from "react-bootstrap"
import { formatPrice } from "../utils/formatPrice";
import { useShoppingCart } from "../context/shoppingCartContext";

type StoreItemProps={
  id:number;
  price:number;
  imgUrl:string;
  name:string;
}
const StoreItem = ({id,price,imgUrl,name}:StoreItemProps) => {
  const {getItemQuantity,increaseCartItemQuantity,decreaseCartItemQuantity,removeCartItem}=useShoppingCart();
 const quantity=getItemQuantity(id);
  return (
    <Card className="height-100">
      <Card.Img src={imgUrl} height='200px' variant='top' style={{objectFit:'cover'}}/>
      <Card.Body className="d-flex flex-column">
      <Card.Title className="d-flex justify-content-between align-items-baseline">
        <span className="fs-2">{name}</span>
        <span className="text-muted ms-2">{formatPrice(price)}</span>
      </Card.Title>
    {quantity===0? (
      <Button onClick={()=>increaseCartItemQuantity(id)}>+ Add To Cart</Button>
    ):<div className="d-flex flex-column align-items-center m-auto" style={{gap:'.5rem'}}>
        <div className="d-flex jsutify-content-center align-items-center" style={{gap:'.5rem'}}>
          <Button onClick={()=>decreaseCartItemQuantity(id)}>-</Button>
          <div><span className="fs-2">{quantity}</span> Item in Cart</div>
          <Button onClick={()=>increaseCartItemQuantity(id)}>+</Button>
        </div>
        <Button onClick={()=>removeCartItem(id)} size='sm' variant='danger'>Remove</Button>
      </div>}
      </Card.Body>
    </Card>
  )
}

export default StoreItem;