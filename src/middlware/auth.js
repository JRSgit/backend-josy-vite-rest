import jwt from 'jsonwebtoken'

export const authTokenAuthorization = (req, res, next) => {
  const header = req.headers.authorization;

  const [bearer, token] = header.split(' ')


  if (bearer !== "Bearer") {
    return res.status(400).json({ error: "Token mau formatado" })
  }

  if (!token) {
    return res.status(400).json({ error: " Token não informado" })
  }

  const decoded = jwt.decode(token, process.env.SECRET_HASH_TOKEN)

  if (!decoded) {
    return res.status(400).json({ error: " Decodificação mal sucedida" })
  }
  req.userId = decoded.userId

  next()

  // console.log(decoded)

}