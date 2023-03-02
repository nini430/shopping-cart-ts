import { Offcanvas, Stack } from "react-bootstrap"
import { useShoppingCart } from "../context/shoppingCartContext";
import CartItem from "./CartItem";
import { formatPrice } from "../utils/formatPrice";
import items from '../data/items.json';

type PropTypes={
    open:boolean;
}

const ShoppingCart = ({open}:PropTypes) => {
    const {openCart,closeCart,removeCartItem,cartItems}=useShoppingCart();
  return (
    <Offcanvas onHide={closeCart}  show={open} placement='end'>
        <Offcanvas.Header  closeButton>
            <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <Stack  gap={2}>
            {cartItems.map(item=>(
                <CartItem key={item.id} {...item}/>
            ))}    
            <div className="fw-bold ms-auto fs-5">
                Total : {formatPrice(cartItems.reduce((total,val)=>{
                    const item=items.find(i=>i.id===val.id);
                    return total+((item?.price ||0)*val.quantity);
                },0))}
            </div>
            </Stack>
            
        </Offcanvas.Body>
    </Offcanvas>
  )
}

export default ShoppingCart