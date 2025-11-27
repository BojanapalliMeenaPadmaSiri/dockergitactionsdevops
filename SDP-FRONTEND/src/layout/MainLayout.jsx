import React from "react";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
    </>
  );
}

export default MainLayout;
