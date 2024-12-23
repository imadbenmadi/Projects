import React, { useEffect } from "react";
import chair from "../../assets/icon/Profile/chair.png";
function BasketCardProduct(
  incrementCounter,
  products,
  image,
  counter,
  decrementCounter
) {
  // useEffect(() => {
  // // console.log(userProfile.basket[0]);
  // userProfile.basket.map((product) => {
  //     setTotalPrice(() => totalPrice + product.ProductId.Price);
  //     // console.log(product.ProductId.Price);
  //     }
  // );
  // // console.log(totalPrice);
  // }, [userProfile]);
  console.log(products);

  return (
    <div className="flex w-full gap-5 justify-between mt-2">
      <div className="flex flex-auto gap-1.5 text-black">
        <img
          loading="lazy"
          src={chair}
          className="shrink-0 aspect-square w-[77px]"
        />
        <div className="flex flex-col flex-1 self-start mt-1">
          <div className="text-black">{products.Title}</div>
          <div className="mt-5">{products.Price} DZD</div>
        </div>
      </div>
      <div className="flex  self-center  bg-gray-300 text-center rounded-lg h-fit relative flex-col   text-white ">
        <div className="text-black  text-2xl px-2 py-1 mx-3"> x</div>
        {/* <div>
          <div
            onClick={incrementCounter}
            className="relative bg-black px-3  rounded-lg"
          >
            <button>+</button>
          </div>
          <div className="relative  text-black">{counter}</div>
          <div
            onClick={decrementCounter}
            className="relative bg-black rounded-lg w-full px-3 "
          >
            <button>-</button>
          </div>
        </div> */}
      </div>{" "}
    </div>
  );
}

export default BasketCardProduct;
