const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8000;
const stripe = require("stripe")(
  "YOUR-STRIPE-API-SECRET-KEY"
);
const app = express();
app.use(cors());
app.use(bodyParser.json());

// POST REQUEST FOR STRIPE

app.post("/payment-sheet", async (req, res) => {
  const amount = req.body.amount
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2024-06-20" }
  );

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });
  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret, // Correct spelling
    customer: customer.id,
    publishableKey:
      "YOUR-STRIPE-API-PUBLIC-KEY",
  });
});

app.listen(PORT, () => {
  console.log(`SERVER IS LIVE ON PORT: ${PORT}`);
});
