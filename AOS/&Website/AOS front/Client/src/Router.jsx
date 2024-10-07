import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import ChangeDiteles from "./pages/ChangeDiteles";

import ContolCells from "./pages/ContolCells";
import StoreView from "./pages/StoreView";
import StoreHome from "./components/Store/StoreHome";
import AllProducts from "./components/Product/AllProducts";
import Not_Found from "./pages/NotFound";
import AddStore from "./components/Store/AddStore";
import Home from "./pages/Home";
import App from "./App";
import Product from "./pages/Product";
import Login from "./pages/Login";
import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import EditProfile from "./components/userProfile/EditProfile";
import ContolProducts from "./pages/ContolProdacts";
import AllProductsSearch from "./components/Product/AllProductsSearch";
import CheckOutPage from "./components/basket/CheckOutPage";
import Verify_email from "./components/VerifyEmail/Verify_email";
import Confirm_to_send from "./components/VerifyEmail/Confirm_to_send";
const user = localStorage.getItem("user") || null;
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: (
          <div className=" overflow-hidden ">
            <Home />
          </div>
        ),
      },
      {
        path: "/Products/:productId",
        element: <Product />,
      },
      {
        path: "/Profile/:userId",
        element: <Outlet />,

        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "AddStore",
            element: <AddStore />,
          },
          {
            path: "EditProfile/:userId",
            element: <EditProfile />,
          },
        ],
      },
      {
        path: "AllProducts/:search",

        element: <AllProducts />,
      },
      {
        path: "AllProductsSearch/:search",

        element: <AllProductsSearch />,
      },
      {
        path: "CheckOutPage",

        element: <CheckOutPage />,
      },
      {
        path: "/store/:userId/:storeId",
        element: <StoreView />,
        children: [
          {
            index: true,
            element: <StoreHome />,
          },
          {
            path: "AllProducts",

            element: <AllProducts />,
          },
        ],
      },

      {
        path: "/Verify_email/:userId",
        element: <Verify_email />,
      },
      {
        path: "*",
        element: <Not_Found />,
      },
    ],
  },
  {
    path: "/Login",
    // element: !user ? <Login /> : <Navigate to="/" />,
    element: <Login />,
  },
  {
    path: "/Dashboard/store/:userId/:storeId",
    element: <Dashboard />,
    children: [
      {
        index: true,
        element: (
          <>
            <ChangeDiteles />
          </>
        ),
      },
      {
        path: "ContolProducts",
        element: (
          <>
            <ContolProducts />
          </>
        ),
      },
      {
        path: "ContolCells",
        element: (
          <>
            <ContolCells />
          </>
        ),
      },
    ],
  },
]);
export default routes;
