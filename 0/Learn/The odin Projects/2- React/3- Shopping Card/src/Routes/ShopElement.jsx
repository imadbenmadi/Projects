import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { cartItems } from "./root";
export function generateStars(rate) {
    const intStarts = Math.floor(rate);
    const floatStar = intStarts % 1;
    // console.log(floatStar);
    const stars = [];

    // Create full stars
    for (let i = 0; i < intStarts; i++) {
        stars.push(
            <span key={i} className="star full-star">
                &#9733;
            </span>
        );
    }
    if (floatStar >= 0.5) {
        stars.push(
            <span key="half" className="star half-star">
                &#9733;
            </span>
        );
    }
    return <div>{stars}</div>;
}
export function handleAddtoCart(product) {
    cartItems.push(product);
    localStorage.setItem("Cart_Items", JSON.stringify(cartItems));
    
}
export default function ShopElement() {
    const { id } = useParams();
    const [product, setProduct] = useState({});
    const [rate, setRate] = useState();
    const [raters, setRaters] = useState();
    const [isLoading, setIsLoading] = useState(true); // State to track loading

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setRate(data.rating.rate);
                setRaters(data.rating.count);
                setIsLoading(false);
            })
            .catch((error) => console.error("Error fetching data:", error));
    }, [id]); // Include id in the dependency array to re-fetch data when id changes
    return (
        <>
            {isLoading ? (
                <div className="relative">
                    <div class="loading_section flex_center">
                        <div class="lds-ring">
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex">
                    <div className="basis-5/12 border-2 flex items-center">
                        <img
                            src={product.image}
                            alt=""
                            className="w-full rounded"
                        />
                    </div>
                    <div className="text-center basis-7/12 p-4">
                        <div className="text-4xl font-bold mb-5 text-blue-600">
                            {product.category}
                        </div>
                        <div className="text-lg text-gray-800">
                            {product.title}
                        </div>
                        <div className="text-xl font-bold text-green-600 mt-2">
                            {product.price}$
                        </div>
                        <div className="mt-3">
                            {generateStars(rate)}
                            <span>{raters}raters</span>
                        </div>
                        <div className="text-2xl font-bold align-middle mt-10 mb-10">
                            {product.description}
                        </div>
                        <button
                            onClick={(event) => {
                                handleAddtoCart(product);
                                event.currentTarget.disabled = true;
                                event.currentTarget.innerText =
                                    "added succesfylly";
                                event.currentTarget.style.background = "green";
                            }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full mt-5"
                        >
                            Add To Cart
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
