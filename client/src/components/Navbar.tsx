import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
// import { RiMenu3Line } from "react-icons/ri";

const Navbar = ({
  leftSidebar,
  setLeftSidebar,
  // rightSidebar,
  setRightSidebar
}: {
  leftSidebar: boolean;
  setLeftSidebar: React.Dispatch<React.SetStateAction<boolean>>;
  rightSidebar: boolean;
  setRightSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed top-0 h-10 shadow-md bg-slate-400 p-6 w-full flex items-center">
      <div className="flex justify-between w-full">
        <GiHamburgerMenu
          onClick={() => {
            setRightSidebar(false);
            setLeftSidebar(!leftSidebar);
          }}
          className="cursor-pointer"
        />
        {/* <RiMenu3Line
          onClick={() => {
            setLeftSidebar(false);
            setRightSidebar(!rightSidebar);
          }}
          className="cursor-pointer"
        /> */}
      </div>
    </div>
  );
};

export default Navbar;
