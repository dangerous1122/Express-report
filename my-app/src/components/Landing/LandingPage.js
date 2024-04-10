import { useState } from "react";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import Content from "./components/Content";
import Slider from "./components/Slider";
import StripSection from "./components/StripSection";
import Video from "./components/Video";


const navigation = [
  { name: "Product", href: "#" },
  { name: "Features", href: "#" },
  { name: "Marketplace", href: "#" },
  { name: "Company", href: "#" },
];

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const para1 =
    " No more spending 1-2 hours to prepare expense reports. Save your Time & Energy for something else you actually enjoy..";
  const para2 =
    "Upload your receipts, relax, and observe as your expense report is prepared.";

  return (
    <>
      <Hero
        text={"Your Expense report ready in 60 seconds"}
        para={para1}
        color={true}
      />
      <Video/>
      <Content />
      <StripSection />
      <Slider />
      <Hero text={"Get Started"} para={para2} color={false} />
      <Footer />
    </>
  );
}
