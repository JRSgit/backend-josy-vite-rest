import express from 'express'

import Entregas from './controller/EntregasCtrl.js'
import Empresa from './controller/EmpresasCtrl.js'
import Session from './controller/Session.js'
import User from './controller/User.js'

import { authTokenAuthorization } from './middlware/auth.js'

const router = express.Router()


router.get('/user', User.find)
router.post('/user', User.store)

router.post('/session', Session.store)

router.get('/entrega/:id', authTokenAuthorization, Entregas.findOne)
router.get('/entregas', authTokenAuthorization, Entregas.find)

router.get('/empresa/:id', authTokenAuthorization, Empresa.findOne)
router.get('/empresas', authTokenAuthorization, Empresa.find)

router.post('/entrega', authTokenAuthorization, Entregas.store)
router.post('/empresa', authTokenAuthorization, Empresa.store)

router.put('/entrega/:id', authTokenAuthorization, Entregas.update)
router.put('/session', Session.update)
// router.put('/empresa', authTokenAuthorization, Empresa.update)

router.delete('/entrega', authTokenAuthorization, Entregas.delete)
router.delete('/empresa/:id', authTokenAuthorization, Empresa.delete)

export default router;
