import React from "react";
import { Link } from "react-router-dom";
import tw from "../../../assets/tw.png";
import fb from "../../../assets/facebook.png";
import tiktok from "../../../assets/tiktok.png";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };
  const sections = [
    {
      title: "Product",
      links: [
        { name: "Use case", url: "/use-cases" },
        { name: "Pricing", url: "/upgrade" },
        { name: "Blog", url: "" },
        { name: "FAQs", url: "/faqs" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "Privacy Policy", url: "#" },
        { name: "Terms & Conditions", url: "#" },
      ],
    },
  ];

  return (
    <footer class="bg-white ">
      <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div class="md:flex md:justify-between">
          <div className=" md:ml-20 ml-0 flex flex-col">
            <p class=" md:mb-0 xl:w-96 md:w-80 md:mr-10 text-gray-700 mb-5">
              We generate your expense reports as quick as placing an order &
              collecting it at the Drive-Thru window.
            </p>
            <div className="flex my-3">
              <a href="https://twitter.com/expressreports">
                <img src={tw} className="h-6 w-6 mx-1  " />
              </a>
              <a href="https://www.tiktok.com/@express.reports?_t=8lKBcBLA6gX&_r=1">
                <img src={tiktok} className="h-6 w-6 mx-1 opacity-70" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
            {sections.map((section) => (
              <div key={section.title}>
                <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                  {section.title}
                </h2>
                <ul className="text-gray-500 dark:text-gray-400 font-medium">
                  {section.links.map((link) => (
                    <li className="mb-4" key={link.name}>
                      <Link to={link.url} onClick={scrollToTop} className="hover:underline">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      </div>
    </footer>
  );
}

export default Footer;
