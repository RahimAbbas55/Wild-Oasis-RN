const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = 8000;
const stripe = require("stripe")(
  "sk_test_51OD8ueKdpJpi62pjsBjYVTZXooq6uNmb0dAYdoU0YXBDiJ0dktK94sk9enCVQmr1PHm3kVp6OYc7Vqn4SVPPpDqq00Jgc1Bpai"
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
      "pk_test_51OD8ueKdpJpi62pjGycuvfFpLLKfnoFOXk6Qnfl3Bb5tF1vw5RbQ7qtjYeE6lS1tGXadxVXaVeS0DHEbSiXl4QRj00frWRlDm7",
  });
});

app.listen(PORT, () => {
  console.log(`SERVER IS LIVE ON PORT: ${PORT}`);
});