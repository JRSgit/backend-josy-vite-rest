import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from "../config/prisma.js";


class SessionCtrl {
  async store(req, res) {
    try {
      const { email, password } = req.body.data;

      const user = await prisma.user.findUnique({
        where: { email }
      })

      if (!user) {
        return res.status(400).json({ error: "Email não cadastrado" })
      }


      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: "Senha  informada é invalida!" })
      }

      if (user.isLoged) {
        return res.status(400).json({ error: "Esse usuario já esta logado" })
      }

      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          isLoged: true
        }
      })

      const token = jwt.sign({ id: user.id }, process.env.SECRET_HASH_TOKEN, { expiresIn: '7d' })
      if (!token) {
        return res.status(400).json({ errro: " Error ao gerar o token" })
      }

      const sessionUser = {
        name: user.name,
        email,
        token
      }

      return res.status(200).json(sessionUser)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }


  async update(req, res) {
    try {
      const { email, isLoged } = req.body.data;

      await prisma.user.update({
        where: { email },
        data: {
          isLoged
        }
      })

      return res.send()

    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

const Session = new SessionCtrl();

export default Session;
