import prisma from '../config/prisma.js'

class EmpresasCtrl {
  async findOne(req, res) {
    try {
      const { id } = req.params;

      const empresa = await prisma.empresa.findUnique({
        where: {
          id
        }
      })

      if (!empresa) {
        return res.status(400).json({ error: " Empresa não encontrada!" })
      }

      return res.status(200).json(empresa)

    } catch (error) {

    }
  }
  async find(req, res) {
    try {
      const empresa = await prisma.empresa.findMany()

      return res.status(200).json(empresa)

    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
  async store(req, res) {
    try {
      const { name, telefone } = req.body;

      const empresa = await prisma.empresa.create({
        data: {
          name,
          telefone,
        }
      })

      return res.status(200).json(empresa)

    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, telefone } = req.body;

      const empresa = await prisma.empresa.update({
        where: {
          id
        },
        data: {
          name,
          telefone
        }
      })

      if (!empresa) {
        return res.status(400).json({ error: " Empresa não encontrada!" })
      }

      return res.status(200).json(empresa)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;

      await prisma.empresa.delete({
        where: {
          id
        }
      })

      return res.status(200).json(true)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

const Empresa = new EmpresasCtrl();

export default Empresa;
