function CardHome({ img, text, color }) {
  return (
    <div
      className={`flex-col   justify-center items-center z-2 cursor-pointer hover:-translate-y-10 duration-300 ease rounded-2xl w-[18rem]  max-lg:w-[95%]   max-lg:h-fit  m-2 opacity-80 bg-gradient-to-b ${color} to-zinc-300 relative`}
    >
      <div className="w-full flex justify-center items-center ">
        <img
          className="w-[10rem] h-[10rem] max-md:w-[3rem] max-md:h-[3rem] self-center "
          src={img}
        />
      </div>
      <div className=" text-black text-center text-4xl max-md:text-xl font-semibold font-['Outfit']">
        {text}
      </div>
    </div>
  );
}

export default CardHome;
