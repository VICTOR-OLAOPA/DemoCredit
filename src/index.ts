import app from './app';
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({
    name: "DemoCredit API",
    version: "1.0.0",
    description: "Welcome to the DemoCredit API. This API allows you to manage users, wallets, and transactions for a micro-lending platform.",
    endpoints: {
      users: "/api/users",
      wallets: "/api/wallets",
      transactions: "/api/transactions"
    },
    documentation: "https://docs.google.com/document/d/1vCOIqZOaTzzKvLD7s_VDk8uxOwpg3u-hjIzy2z0D8sk/edit?usp=sharing",
    contact: {
      email: "olaopavictor@gmail.com",
      website: "olaopa-victor-lendsqr-be-test.vercel.app"
    }
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});