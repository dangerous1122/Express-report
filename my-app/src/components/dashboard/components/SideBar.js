import { Card, List } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export function Sidebar() {
  return (
    <Card className=" w-full  max-w-[20rem] md:p-4 py-3 shadow-xl shadow-blue-gray-900/5">
      <div className="text-xs px-1 mb-2 md:mx-3 md:px-4 p-0 lg:ps-7 xl:ps-12 md:ps-1 py-1 rounded-md my-6 font-semibold  md:text-lg bg-blue-600 text-white ps-2 ">Dashboard</div>
        <Link to='reports' className="py-2 text-xs p-0 md:text-base t md:py-2 md:ps-2 cursor-pointer font-semibold  hover:bg-gray-200 rounded-sm">
          My reports
        </Link>
        <Link to='sender-list' className="py-2 text-xs md:text-base md:py-2 md:ps-2 cursor-pointer font-semibold hover:bg-gray-200 rounded-sm">
          Sender List
        </Link>
        <Link to='receiver-list' className="py-2 text-xs md:text-base md:py-2 md:ps-2 cursor-pointer font-semibold hover:bg-gray-200 rounded-sm">
          {" "}
          Receiver List
        </Link>
        <Link to='/upgrade' className=" py-2 text-xs md:text-base md:py-2 md:ps-2 cursor-pointer font-semibold hover:bg-gray-200 rounded-sm">
          {" "}
          Upgrade
        </Link>
        <Link to="/profile" className="text-xs md:text-base md:  md:ps-2 py-2 mb-64  cursor-pointer font-semibold hover:bg-gray-200 rounded-sm ">
          Profile
        </Link>
    </Card>
  );
}
