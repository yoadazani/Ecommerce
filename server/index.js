import Server from 'json-server'
import jwt from 'jsonwebtoken'
import cookies from 'cookie-parser'

const index = Server.create()
const router = Server.router('public/database.json')
const middlewares = Server.defaults()

index.use(cookies())
index.use(middlewares)
index.use(Server.bodyParser)

const ACCESS_TOKEN_SECRET= '97ddc9d56853d818546508da54ec6cd37dbef97a2f9a5ce45ff8faacfafdf844f7605cb8290faacf38356cb10e1fbb7e0ab7f9ffbc00a37955f0063d5bc06656'

index.post("/login", (req, res) => {
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

index.put('/shoppingCart/all', async (req, res) => {
    const data = req.body;
    await res.json(router.db.set('shoppingCart', data).value());
})

index.post('/email-confirmation', async (req, res) => {
    const data = req.body;
})

index.use(router)
index.listen(3000, () => {
    console.log('JSON Server is running')
})