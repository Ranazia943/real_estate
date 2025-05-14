import express from 'express';
import dotenv from 'dotenv';
import Database from './config/database.js';
dotenv.config();
import cors from 'cors';
import UserRouter from './router/userRouter.js';
import User from './model/AuthModel.js';

import cookieParser from 'cookie-parser';
import PropertyRouter from './router/propertyRouter.js';
import PropertyContactRouter from './router/properyContact.js';
import SellerRouter from './router/sellerRouter.js';
import TeamRouter from './router/teamRouter.js';
import ContactRouter from './router/contactRouter.js';
import ReviewRouter from './router/reviewRouter.js';
import ServiceRouter from './router/serviceRouter.js';
import WhishRouter from './router/whishRouter.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({
  origin: process.env.client_url,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'],
  methods: ["GET", "POST", "PUT", "DELETE"]
}));
app.use(cookieParser())

app.use("/user",UserRouter)
app.use("/property",PropertyRouter)
app.use("/p_contact",PropertyContactRouter)
app.use("/seller",SellerRouter)
app.use("/team",TeamRouter)
app.use("/contact",ContactRouter)
app.use("/review",ReviewRouter)
app.use("/service",ServiceRouter)
app.use("/whish",WhishRouter)

Database();
User();

app.get('/', (req, res) => {
  res.send('Hello, World! server is running');
});


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
})