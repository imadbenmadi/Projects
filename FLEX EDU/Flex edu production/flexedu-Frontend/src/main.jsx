// import { StrictMode } from "react";
// import { createRoot } from "react-dom/client";
// import App from "./App.jsx";
// import "./App.css";
// import { RouterProvider } from "react-router-dom";
// import Routers from "./Router.jsx";
// import { AppProvider } from "./AppContext";

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <AppProvider>
//       <RouterProvider router={Routers} />
//     </AppProvider>
//   </StrictMode>
// );
import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { AppProvider } from "./AppContext"; // Ensure the AppProvider is default exported
import Routers from "./Router.jsx";
import "./App.css";
import MainLoading from "./MainLoading.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <AppProvider>
            {/* Suspense wrapper to show fallback while loading lazy components */}
            <Suspense fallback={<MainLoading />}>
                <RouterProvider router={Routers} />
            </Suspense>
        </AppProvider>
    </StrictMode>
);
