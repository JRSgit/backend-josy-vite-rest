import bcrypit from 'bcrypt'
import prisma from '../config/prisma.js'

class UserCtrl {
  async findOne(req, res) {
    try {
      const { email } = req.body;

      const user = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (!user) {
        return res.status(400).json({ error: " Useuario não encontrado!" })
      }

      return res.status(200).json(user)

    } catch (error) {

    }
  }
  async find(req, res) {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
        }
      })
      return res.status(200).json(users)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
  async store(req, res) {
    try {
      const { name, email, password } = req.body.data;

      const password_hash = await bcrypit.hash(password, 10)


      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: password_hash
        }
      })

      return res.status(200).json(user)

    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async update(req, res) {
    try {

    } catch (error) {

    }
  }
  async delete(req, res) {
    try {
      console.log("No delete")
    } catch (error) {

    }
  }
}

const User = new UserCtrl();

export default User;
