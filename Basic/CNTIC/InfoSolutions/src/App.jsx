import React from "react";
import "./Font/Font.css";

import MenuBar from "./Components/MenuBar";
import Header from "./Components/Header";
import { Outlet } from "react-router";
export default function App() {
  return (
    <div className="cairo-Font relative   ">
      <div className=" md:flex  min-h-full ">
        <MenuBar />

        <div className="w-full flex flex-col items-center ">
          <Header />
          <div className="w-full">
            <Outlet dir="rtl"  />
          </div>
        </div>
      </div>
    </div>
  );
}
