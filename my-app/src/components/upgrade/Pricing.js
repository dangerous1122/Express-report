import React, { useEffect, useState } from "react";
import { payment } from "../../utils/Slices/paymentSlice";
import { useStripe} from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import {useNavigate} from 'react-router-dom'

const Pricing = () => {
  const stripe = useStripe();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const navigate=useNavigate()
  const token=localStorage.getItem('expr')


  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!token){
    navigate('/login')
    }

    if (!stripe) {
      console.log("Stripe has not loaded yet.");
      return;
    }

    try {
      const actionResult = await dispatch(payment(process.env.REACT_APP_STRIPE_KEY));
      const { url } = actionResult.payload; 

      if (url) {
        window.location.href = url;
      } else {
        console.log("No URL received for Stripe Checkout.");
      }
    } catch (error) {
      console.error("Payment submission error:", error);
    }
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);
  const plans = [
    {
      id: 1,
      name: "Free Plan",
      price: "$0",
      description: "Generate 1 report",
      popular: false,
    },
    {
      id: 2,
      name: "Pro Plan",
      price: "$9.99",
      description: "Generate 10 reports",
      popular: true, // This plan is marked as popular
    },
  ];

  return (
    <div className="lg:my-12 my-12">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mx-auto sm:mt-7 lg:mx-0 lg:flex justify-around lg:max-w-none">
          {plans.map((plan) => (
            <form
              onSubmit={handleSubmit}
              key={plan.id}
              className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-sm lg:flex-shrink-0 mb-4"
            >
              <div
                className={`rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16 ${
                  plan.popular ? "relative" : ""
                }`}
              >
                {plan.popular && (
                  <span className="top-4 left-44 md:-translate-x-7 -translate-x-9  absolute inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    Popular
                  </span>
                )}
                <div className="mx-auto max-w-xs px-8">
                  <p className="text-base font-semibold text-gray-600 mt-3">
                    {plan.name}
                  </p>
                  <p className="mt-6 flex items-baseline justify-center gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-gray-900">
                      {plan.price}
                    </span>
                  </p>
                  <button
                    type="submit"
                    className={`mt-10 block w-full lg:px-12 rounded-md ${plan.id===1 && token ?'bg-white text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-500 cursor-pointer' } px-3 py-2 text-center text-sm font-semibold shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                  >
                    {plan.id === 1 && token ? "Already access" : "Get access"}
                  </button>
                  <p className="mt-6 text-sm font-medium leading-5 text-gray-600">
                    {plan.description}
                  </p>
                </div>
              </div>
            </form>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
