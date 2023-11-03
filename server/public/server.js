import Server from 'json-server'
import jwt from 'jsonwebtoken'
import https from 'https'
import cookies from 'cookie-parser'
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";
import cors from 'cors'
import Stripe from 'stripe';


const server = Server.create()
const router = Server.router('public/database.json')
const middlewares = Server.defaults()

server.use(cors({
    origin: '*'
}))
server.use(cookies())
server.use(middlewares)
server.use(Server.bodyParser)

const ACCESS_TOKEN_SECRET = '97ddc9d56853d818546508da54ec6cd37dbef97a2f9a5ce45ff8faacfafdf844f7605cb8290faacf38356cb10e1fbb7e0ab7f9ffbc00a37955f0063d5bc06656'

const stripe = new Stripe(
    'sk_test_51NPlisJ2tgeUZLVsr6I1EQzv5RBy2X0KfIow8PZU1fU7XI3HhuoVurNfkHqdo9DfaUeD6DQITTuV5Ht8RjgETLwl00kzvtgcrp'
    , {
        apiVersion: '2022-11-15',
    })
server.post("/create-payment-intent", async (req, res) => {
    const { amount } = req.body;

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount),
        currency: "usd",
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

server.post("/login", (req, res) => {
    const data = req.body
    const users = router.db.get('users').value()
    const userInfo = users.find(user => user.email === data.email)
    const userData = {
        email: data.email,
        password: data.password
    }

    const expiresIn = 3600
    const token = jwt.sign(userData, ACCESS_TOKEN_SECRET, {expiresIn})
    res.json({message: "login successfully", user: userInfo, token, expiresIn})
})

server.put('/shoppingCart/all', async (req, res) => {
    const data = req.body;
    await res.json(router.db.set('shoppingCart', data).value());
})

const sendMail = async (data) => {
    let transporter = nodemailer.createTransport({
        service: "gmail",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
            user: 'yoad208@gmail.com', // generated ethereal user
            pass: 'e c e x o x t k a e p l c u k y'.trim(), // generated ethereal password
        },
    });


    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <yoad208@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: "confirm your email", // Subject line
        text: "confirm your email!!!", // plain text body, // plain text body
        html: "<b>your confirmation code is: </b>" + data.pinCode, // html body
    });

    console.log("Message sent: %s", info.messageId);
}

server.post('/email-confirmation', async (req, res) => {
    const data = req.body;
    console.log(data.email)
    sendMail(data).catch(err => {
        console.log(err)
    })

})

server.use(router)


const keyFile = './cert-key.pem';
const certFile = './certificate.pem';
https
    .createServer(
        {
            key: fs.readFileSync(keyFile),
            cert: fs.readFileSync(certFile),
        },
        server
    )
    .listen(3000, () => {
        console.log(
            'Go to https://127.0.0.1:3000/'
        );
    });