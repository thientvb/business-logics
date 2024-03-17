import { createContext, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({children}) => {
    const [cart, setCart] = useState({numberOfProduct: 0});

    return (
        <CartContext.Provider value={{cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartContext;