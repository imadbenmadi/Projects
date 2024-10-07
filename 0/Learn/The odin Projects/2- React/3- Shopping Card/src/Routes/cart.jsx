import React, { useState } from "react";

export default function Cart() {
    const [Money, SetMoney] = useState(1000);
    const [cartItems, setCartItems] = useState(
        localStorage.getItem("Cart_Items")
            ? JSON.parse(localStorage.getItem("Cart_Items"))
            : []
    );

    const handleDeleteItem = (productId) => {
        const updatedCartItems = cartItems.filter(
            (product) => product.id !== productId
        );

        // Update the cart state and save it to localStorage
        setCartItems(updatedCartItems);
        localStorage.setItem("Cart_Items", JSON.stringify(updatedCartItems));
    };
    const handleBuy = (price) => {
        SetMoney(Money - price);
    };
    const itemsList = cartItems ? (
        <ul className="grid grid-cols-2">
            {cartItems.map((product) => (
                <li
                    key={product.id}
                    className="p-10 m-5 border-2 relative  rounded-lg"
                >
                    <img
                        src={product.image}
                        alt=""
                        className="max-w-full h-[150px] m-auto"
                    />
                    <br />
                    <div className="text-2xl font-bold text-center">
                        {product.price} $
                    </div>
                    <div className="flex ">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full mt-5 m-auto w-fit"
                            onClick={() => {
                                handleBuy(product.price);
                                handleDeleteItem(product.id);
                            }}
                        >
                            Check Out
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-full mt-5 m-auto w-fit"
                            onClick={() => handleDeleteItem(product.id)}
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    ) : (
        <div>No items</div>
    );

    return (
        <div>
            <h1 className="text-start text-3xl font-bold">Your Cart</h1>
            <div>
                <div className="mt-10">
                    <span>Your Wallet :</span>
                    <i className="Money font-bold text-lg">{Money}$</i>
                </div>
            </div>
            {itemsList}
        </div>
    );
}
