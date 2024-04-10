// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
// import User from "../model/userModel";

import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_KEY);


const YOUR_DOMAIN = "http://localhost:3000";
let session=''

export const stripePayment = async (req, res) => {
  try {
    const _id = req.user._id; // Assuming this is an ObjectId
console.log(_id.toString()); // Convert ObjectId to string and log it


    session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Express Reports Subscription",
            },
            unit_amount: 999,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${YOUR_DOMAIN}/upgrade`,

    });
    // console.log("sessionnnn", session);
    res.status(200).json({ url: session.url });

  } catch (err) {
    console.error("Error creating Stripe checkout session:", err);
    return res.status(500).send({ error: err.message });
  }
};

export const confirmPayment = async (req, res) => {
  const { session_id } = req.query;
  console.log(session_id)

  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    
    if (session.payment_status === 'paid') {
      const user = req.user // Ensure you pass client_reference_id when creating the session
      if (user) {
        user.subscription.hass = true;
        user.subscription.gereratedReports=10;
        await user.save();
        return res.json({ paymentVerified: true });
      }
    }
    return res.status(404).json({ message: "Session not found or payment incomplete." });
  } catch (err) {
    console.error("Error verifying payment:", err);
    return res.status(500).send({ error: err.message });
  }
};
