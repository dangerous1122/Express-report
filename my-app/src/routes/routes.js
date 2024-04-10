import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Dashboard from "../components/dashboard/Dashboards";
import Pricing from "../components/upgrade/Pricing";
import Demo from "../components/Demo/Demo";
import Workflow from "../components/Workflow/Workflow";
import Layout from "../components/Layout";
import LandingPage from "../components/Landing/LandingPage";
import SenderList from "../components/senderList/SenderList";
import Reports from "../components/reports/Reports";
import { loginLoader } from "../components/Login";
import Notfound from "../components/Notfound";
import Register from "../components/Register";
import ProtectedRoute from "./ProtectedRoute";
import Success from "../components/upgrade/Success";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import FAQSection from '../components/FAQs'
import UseCases from "../components/UseCases";

import Profile from "../components/profile/Profile";
const stripePromise = loadStripe(
  "pk_test_51Og0vPSDnqTXAd4W0dtM92QZhz6k6MmtlTZUj5dOwNxME674MT6FpvCSS6RNVL6DJRfyoFTICWB3CgvV7dwwDrcG00SWAgvArr"
);

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
    loader: loginLoader,
  },
  {
    path: "/register",
    element: <Register />,
    loader: loginLoader,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: "success",
        element: <Success />,
      },

      {
        path: "upgrade",
        element: (
          <Elements stripe={stripePromise}>
            <Pricing />
          </Elements>
        ),
      },
      {
        path: "demo",
        element: <Demo />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            {" "}
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/sender-list",
        element: (
          <ProtectedRoute>
            <SenderList add={"sender"} />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/receiver-list",
        element: (
          <ProtectedRoute>
            <SenderList add={"receiver"} />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/reports",
        element: (
          <ProtectedRoute>
            {" "}
            <Reports />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/workflow",
        element: (
          <Elements stripe={stripePromise}>
            <ProtectedRoute>
              <Workflow />
            </ProtectedRoute>
          </Elements>
        ),
      },
      {
        path: "dashboard/demo",
        element: <Demo />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path:"/faqs",
        element:<FAQSection/>
      },
      {
        path:"/use-cases",
        element:<UseCases/>
      },
    ],
  },


  {
    path: "*",
    element: <Notfound />,
  },
]);

export default router;
