import React from "react";
import imageUrl from "../../../src/assets/icon/Profile/chair.png";
function CheckoutCard() {
  const [counter, setCounter] = React.useState(1);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const incrementCounter = () => {
    setCounter(counter + 1);
    setTotalPrice(totalPrice + 2300);
  };

  const decrementCounter = () => {
    if (counter > 1) {
      setCounter(counter - 1);
      setTotalPrice(totalPrice - 2300);
    }
  };

  return (
    <div className="px-5 py-6 h-fit mt-5 rounded-3xl border-2 border-solid border-zinc-300 max-md:max-w-full">
      <div className="flex gap-5 max-lg:flex-col max-md:gap-0">
        <div className="flex flex-col w-[82%] max-md:ml-0 max-md:w-full">
          <div className="grow  max-md:max-w-full">
            <div className="flex justify-start items-center max-md:gap-0">
              <div className="flex md:flex-col w-[40%] max-md:ml-0 h-fit ">
                <img
                  loading="lazy"
                  src={imageUrl}
                  className="shrink-0 max-w-full aspect-square h-fit w-[175px] max-md:mt-9"
                />
              </div>
              <div className="flex flex-col ml-5 w-[56%] max-md:ml-0 ">
                <div className="flex flex-col grow mt-7 text-2xl text-black max-md:mt-10">
                  <div className=" font-bold max-md:text-lg">
                    White T-shirt Cotton
                  </div>

                  <div className="md:mt-9 mt-2 font-semibold">2,300DZD</div>
                  <div className="flex justify-between w-full">
                    <div className="flex">
                      <button
                        className="w-12 h-12 text-white bg-black rounded-tl-xl rounded-bl-xl"
                        onClick={decrementCounter}
                      >
                        -
                      </button>
                      <div>
                        <div>
                          <div className="text-black  w-12 h-12 flex justify-center items-center text-xl font-normal font-['Outfit']">
                            {counter}
                          </div>
                        </div>
                      </div>
                      <button
                        className="w-12 h-12 text-white bg-black rounded-tr-xl rounded-br-xl"
                        onClick={incrementCounter}
                      >
                        +
                      </button>
                    </div>
                    {/* <div className="text-black text-4xl font-normal font-['Outfit']">
                      price : {totalPrice?.toFixed(2)} DZD
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CheckoutCard;
