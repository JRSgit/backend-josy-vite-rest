import prisma from '../config/prisma.js'

class EntregasCtrl {
  async findOne(req, res) {
    try {
      const { id } = req.params;

      const entregas = await prisma.entregas.findUnique({
        where: {
          id
        }
      })

      if (!entregas) {
        return res.status(400).json({ error: " Entrega não encontrada!" })
      }

      return res.status(200).json(entregas)

    } catch (error) {

    }
  }
  async find(req, res) {
    try {
      const entregas = await prisma.entregas.findMany()

      return res.status(200).json(entregas)

    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async store(req, res) {
    try {
      const { empresa, refeicao, quantidade, status, dataTime } = req.body.data;

      const entrega = await prisma.entregas.create({
        data: {
          empresa,
          refeicao,
          quantidade: parseInt(quantidade),
          status,
          data: dataTime
        }
      })

      return res.status(200).json(entrega)

    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;


      const entrega = await prisma.entregas.update({
        where: {
          id
        },
        data: {
          status,
        }
      })

      return res.status(200).json(entrega)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body

      const entrega = await prisma.entregas.delete({
        where: {
          id
        },
      })
      return res.status(200)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}

const Entregas = new EntregasCtrl();

export default Entregas;
