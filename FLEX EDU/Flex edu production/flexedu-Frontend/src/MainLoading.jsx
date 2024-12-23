import Logo from "../public/Logo.png";

function MainLoading() {
    return (
        <div className=" w-screen h-screen flex flex-col items-center justify-center">
            <img src={Logo} alt="Logo" className=" w-32 mb-1 " />
            <span className="loader"></span>
        </div>
    );
}

export default MainLoading;
