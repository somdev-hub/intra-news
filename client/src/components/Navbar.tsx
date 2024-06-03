import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
// import { RiMenu3Line } from "react-icons/ri";

const Navbar = ({
  leftSidebar,
  setLeftSidebar
}: {
  leftSidebar: boolean;
  setLeftSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="fixed top-0 h-10 shadow-md bg-slate-400 p-6 w-full flex items-center">
      <div className="flex gap-6 items-center w-full">
        <GiHamburgerMenu
          onClick={() => {
            setLeftSidebar(!leftSidebar);
          }}
          className="cursor-pointer"
        />
        <h3 className="text-[1.25rem]">Intra News</h3>
      </div>
    </div>
  );
};

export default Navbar;
