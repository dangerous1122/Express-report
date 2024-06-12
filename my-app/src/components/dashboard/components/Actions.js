import { Link } from "react-router-dom";
import { DocumentChartBarIcon } from "@heroicons/react/24/outline";
import DemoImg from "../../../assets/list.png";

const products = [
  {
    id: 1,
    href: "#",
    text: "Try Demo",
    link: "demo",
    icon: <img src={DemoImg} className="md:h-36 md:w-36 h-20 w-20" />,
  },
  {
    id: 2,
    href: "#",
    text: "Generate Expense Report",
    link: "workflow",
    icon: <DocumentChartBarIcon className="md:h-36 md:w-36 h-20 w-20" />,
  },
];

export default function Actions() {
  return (
    <div className=" lg:w-4/5 w-full px-4 sm:mx-0 absolute lg:mt-0 mt-10 ">
      <div className="mx-auto md:max-w-3xl max-w-lg px-4 sm:px-6 sm:py-24 lg:max-w-5xl lg:px-8">
        <div className="grid sm:grid-cols-1 md:px-12 gap-x-6 gap-y-10  lg:grid-cols-2 xl:gap-x-28">
          {products.map((product) => (
            <div key={product.id} className="group relative cursor-pointer ">
              <h2 className="md:text-2xl text-sm font-bold tracking-tigh text-center text-gray-900 mb-5">
                {product.text}
              </h2>

              <div className=" w-full md:h-48 h-28 overflow-hidden rounded-md bg-white lg:aspect-none  transition ease-in-out   group-hover:bg-white  drop-shadow-md  hover:scale-105 flex justify-center align-middle">
                <div className="my-5">
                  <Link to={product.link}>{product.icon}</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
