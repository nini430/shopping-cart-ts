import {ReactNode, createContext, useContext, useState} from 'react'
import ShoppingCart from '../components/ShoppingCart';
import useLocalStorage from '../hooks/useLocalStorage';


type ShoppingCartProps={
    children:ReactNode
}

type CartItem = {
    id:number;
    quantity:number;
}

type ShoppingCart={
    openCart:()=>void;
    closeCart:()=>void;
    cartQuantity:number;
    cartItems:CartItem[];
    getItemQuantity:(id:number)=>number;
    increaseCartItemQuantity:(id:number)=>void;
    decreaseCartItemQuantity:(id:number)=>void;
    removeCartItem:(id:number)=>void;
}

const ShoppingCartContext=createContext({} as ShoppingCart);


export const useShoppingCart=()=>{
    return useContext(ShoppingCartContext);
}


export const ShoppingCartProvider=({children}:ShoppingCartProps)=>{
    const [cartItems,setCartItems]=useLocalStorage<CartItem[]>('shopping_cart_items',[]);
    const [open,setOpen]=useState<boolean>(false);

    const cartQuantity=cartItems.reduce((quantity,val)=>quantity+val.quantity,0);

    const openCart=()=>setOpen(true);
    const closeCart=()=>setOpen(false);
    const getItemQuantity=(id:number)=>{
       return  cartItems.find(item=>item.id===id)?.quantity || 0;
    }


    const increaseCartItemQuantity=(id:number)=>{
        setCartItems((prevCartItems)=>{
            if(!prevCartItems.find(item=>item.id===id)) {
                return [...prevCartItems,{id,quantity:1}]
            }else{
                return prevCartItems.map(item=>{
                    if(item.id===id) {
                        return {...item,quantity:item.quantity+1}
                    }else{
                        return item;
                    }
                })
            }
        })
    }

    const decreaseCartItemQuantity=(id:number)=>{
        setCartItems(prevCartItems=>{
            if(prevCartItems.find(item=>item.id===id)?.quantity===1) {
               return prevCartItems.filter(item=>item.id!==id);
            }else{
                return prevCartItems.map(item=>{
                    if(item.id===id) {
                        return {...item,quantity:item.quantity-1}
                    }else{
                        return item;
                    }
                })
            }
        })
    }

    const removeCartItem=(id:number)=>{
       setCartItems(prevCartItems=>{
        return prevCartItems.filter(item=>item.id!==id);
       })
    }
    return (
        <ShoppingCartContext.Provider
         value={{getItemQuantity,increaseCartItemQuantity,decreaseCartItemQuantity,removeCartItem,cartItems,cartQuantity,openCart,closeCart}}>
            {children}
            <ShoppingCart open={open}/>
        </ShoppingCartContext.Provider>
    )
}