require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);

const storeItems = new Map([]);

const cartItems = new Map([
  [1, { priceInCents: 10000, name: "Learn React Today" }],
  [2, { priceInCents: 20000, name: "Learn CSS Today" }],
]);

app.post("/send-item-details", async (req, res) => {
  for (let i = 0; i < req.body.local.length; i++) {
    storeItems.set(i, req.body.local[i]);
  }
  res.send({ local: [...storeItems], cart: [...cartItems] });
});

app.post("/create-checkout-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: req.body.items.map((item) => {
        const storeItem = storeItems.get(item.id);
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: storeItem?.name,
            },
            unit_amount: storeItem?.priceInCents,
          },
          quantity: storeItem?.quantity,
        };
      }),
      success_url: `${process.env.CLIENT_URL}`,
      cancel_url: `${process.env.CLIENT_URL}`,
    });
    res.json({ url: session.url });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.listen(3001);
