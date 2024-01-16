const stripe = require("stripe")(
  "sk_test_51JoVjBElqiqnGEzQYrZOBWxnaZX4CE8r3Y2dpWrrjN68WaRGMYkYritnQlpbY4va7exnKrxM966Wlcm9ohD3f2OK008R3VMz8y"
);

export const signStripeTransaction = (req: any, res: any) => {
  const paymentIntent = stripe.paymentIntents.create({
    amount: 1099,
    currency: "gbp",
  });
  const clientSecret = paymentIntent.client_secret;

  return res.json(clientSecret);
};
