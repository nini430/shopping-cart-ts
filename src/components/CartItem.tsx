import React from 'react'
import { Button, Stack } from 'react-bootstrap';
import items from '../data/items.json'
import { formatPrice } from '../utils/formatPrice';
import { useShoppingCart } from '../context/shoppingCartContext';

type PropTypes={
    id:number;
    quantity:number;
}

const CartItem = ({id,quantity}:PropTypes) => {
    const item=items.find(item=>item.id===id)!;
    const {removeCartItem}=useShoppingCart();
  return (
    <Stack direction='horizontal' gap={2} className='d-flex align-items-center'>
        <img src={item?.imgUrl} alt="" style={{width:'125px',height:'75px',objectFit:'cover'}} />
        <div className='me-auto'>
            <div>
                {item?.name} {` `} {quantity > 1 && <span className='text-muted' style={{fontSize:'.85rem'}}>x{quantity}</span> } 
            </div>
            <span className='text-muted'>{formatPrice(item?.price as number)}</span>
        </div>
        <div>{formatPrice(item.price  * quantity)}</div>
        <Button onClick={()=>removeCartItem(id)} variant='outline-danger'>&times;</Button>
    </Stack>
  )
}

export default CartItem