import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Success() {
    const navigate=useNavigate()
  const token = localStorage.getItem("expr");
  const [message, setMessage] = useState("");
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const sessionId = query.get("session_id");

    if (sessionId) {
      // Call a function to verify the session
      verifySession(sessionId);
    }
  }, []);

  const verifySession = async (sessionId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/confirm-status?session_id=${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.paymentVerified) {
        setMessage("Payment successful! Your subscription has been activated.");
        navigate('/dashboard')
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setMessage(
        "There was an issue verifying your payment. Please contact support."
      );
    }
  };

  return (
    <>
      <div>{message}</div>
      <button onClick={()=>navigate('/dashboard')} className="mt-4 py-2 px-3 bg-blue-600 rounded-sm text-white">
        Go back
      </button>
    </>
  );
}

export default Success;
