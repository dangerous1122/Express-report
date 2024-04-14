import React, { useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import Hero from "./Landing/components/Hero";
import Footer from "./Landing/components/Footer";

const faqs = [
  {
    question:
      "Can I add or delete an expense on the report after its generated?",
    answer:
      "For Now, No. Please make sure you upload all your receipts you want in report. Once uploaded, the app will generate report. And if you want to add something you would need to “start over again”. Hopefully, in near future, we will have a system to give users this option.",
  },
  {
    question:
      "What if I have an expense to add but No receipt to upload against it?",
    answer:
      "Good Question. Simply type up the “type of expense, date of expense, and $ amount of expense in your notes and take screenshot. Or you can write down on paper & take picture. Upload this and it will get added as an expense on your report.",
  },
  {
    question: "Can I use this app for doing my taxes?",
    answer:
      "Absolutely. If you want to calculate the total expenses for your business tax or personal tax or Bookkeeping purpose - you can use this app.",
  },
  {
    question: "Can I cancel the paid subscription anytime?",
    answer: "Yes, cancel anytime. No hidden fees. No contracts.",
  },
  {
    question: "What about privacy of my data?",
    answer:
      "We do not have access to the data you generate. We can help with any troubleshooting on account only after your consent.",
  },
  {
    question: "Do you offer services for corporate and large teams?",
    answer:
      "Yes, we can customize this service to accommodate the needs of processing large expense reports. Just send a message on support@aiexpensereport.com",
  },
  {
    question: "Do you integrate into my existing Tax & Accounting software?",
    answer:
      "Yes, you can send your expense report directly into your own tax software. We are working on rolling out this integration feature soon.",
  },
  {
    question: "Tell me about Refund policy",
    answer:
      "We have to buy compute from providers like OpenAI to run this service. So, when you generate the report, we get charged from them. For this reason we cannot provide any refunds. However, you can cancel subscription anytime and you will not get charged after that.",
  },
];

const para2 =
"Upload your receipts, relax, and observe as your expense report is prepared.";
const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <li>
    <button
      className="relative flex gap-2 items-center w-full py-5 text-base font-semibold text-left border-t md:text-lg border-base-content/10"
      aria-expanded={isOpen}
      onClick={onClick}
    >
      <span className="flex-1 text-base-content">{question}</span>

      <PlusIcon className="h-6 w-6" />
    </button>
    <div
      className={`transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? "max-h-screen" : "max-h-0"
      }`}
    >
      <div className="pb-5 leading-relaxed">
        <div className="space-y-2 leading-relaxed">{answer}</div>
      </div>
    </div>
  </li>
);

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <>
      <div className="py-24 px-8 max-w-5xl mx-auto flex flex-col md:flex-col gap-12 ">
        <div className="flex flex-col text-center basis-1/2">
          <p className="inline-block font-semibold text-primary mb-4">
            Expense report FAQs
          </p>
          <p className="sm:text-4xl text-3xl font-extrabold text-base-content">
            Frequently Asked Questions
          </p>
        </div>
        <ul className="basis-1/2">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => toggleFAQ(index)}
            />
          ))}
        </ul>
      </div>
      <Hero text={"Get Started"} para={para2} color={false} />
      <Footer />
    </>
  );
};

export default FAQSection;
