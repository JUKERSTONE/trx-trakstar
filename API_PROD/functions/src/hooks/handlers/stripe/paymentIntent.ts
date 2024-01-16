export const stripePaymentIntent = async (req: any, res: any) => {
  const amount = req.body.amount;
  const currency = req.body.currency;
  const isLive = req.body.isLive;

  const stripe = require("stripe")(
    isLive
      ? "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"
      : "sk_test_51I6mKCDfXHQFQVOuA3XaPA97HkDujui6poN0rxtlV61N8fwxVOKpqPYKWZy0jNRhx9quwXlKCFU3ta1x6VooVV4M00367GwjOK"
  );

  // This example sets up an endpoint using the Express framework.
  // Watch this video to get started: https://youtu.be/rPR2aJ6XnAc.

  // Use an existing Customer ID if this is a returning customer.
  const customer = await stripe.customers.create();
  const ephemeralKey = await stripe.ephemeralKeys.create(
    { customer: customer.id },
    { apiVersion: "2022-11-15" }
  );
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency,
    customer: customer.id,
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.json({
    paymentIntent: paymentIntent.client_secret,
    ephemeralKey: ephemeralKey.secret,
    customer: customer.id,
    publishableKey: isLive
      ? "pk_live_51I6mKCDfXHQFQVOuJyBjQ91HD3nj81s5BjLuo2Ixovm0Y2iMEpSZ7O1LFvG5nXoTWFwDwVGnRIuXyojdDlsWtOWv00DEfb4RRD"
      : "pk_test_51I6mKCDfXHQFQVOullPWJg7eYcVE87dBsMUsLNNWUz0h9JxVEGXgNpEwVhlkEwOxZx7c82ga81J6mxm53FWP2G2a00LjjoGjtb",
  });
};
