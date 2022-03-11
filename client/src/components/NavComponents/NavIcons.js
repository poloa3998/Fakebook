import React from "react";

function NavIcons({ Icon, active }) {
  return (
    <div
      className="flex items-center cursor-pointer md:px-6 lg:px-8 lg:py-2 md:hover:bg-gray-100 rounded-xl group
      "
    >
      <Icon
        className={`w-6 h-10 text-gray-500 text-center lg:w-7 lg:h-7 ml-1 group-hover:text-blue-500 ${
          active && `text-blue-500`
        }`}
      />
    </div>
  );
}

export default NavIcons;
