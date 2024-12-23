import Not_Finished_img from "../../public/Not_Finished.png";

function Not_Finished() {
  return (
    <div
      className="flex items-center justify-center 
      text-gray font-bold md:pt-10 text-gray_v "
    >
      <div className="p-8 bg-white rounded-md shadow-lg text-center">
        <h1 className="text-3xl md:text-5xl mb-4 ">
          Oops! This Page is Not Finished Yet
        </h1>
        <p className="text-lg mb-8 text-gray">
          We're working hard to bring you something awesome. Check back later!
        </p>
        <img
          src={Not_Finished_img}
          alt="Under Construction"
          className=" w-32 h-32 md:w-64 md:h-64 mx-auto mb-8 object-cover"
        />
        <p className="text-sm ">Thank you for your patience!</p>
      </div>
    </div>
  );
}

export default Not_Finished;
