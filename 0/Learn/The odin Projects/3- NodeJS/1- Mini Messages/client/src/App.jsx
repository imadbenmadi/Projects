import { Outlet } from "react-router";
export default function App() {
    return (
        <>
            <h2
                style={{
                    textAlign: "center",
                }}
            >
                Messages Borad
            </h2>
            <Outlet />
            
        </>
    );
}
