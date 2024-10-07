import React from "react";
import StoreInfo from "../components/Store/StoreInfo";
import SlideProduct from "./SlideProduct";
import Categories from "../components/Store/Categories";
import { Outlet } from "react-router-dom";

function StoreView() {
  return (
    <div>
      <StoreInfo />
      <Outlet />
    </div>
  );
}

export default StoreView;
