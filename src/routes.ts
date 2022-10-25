import express from 'express'
import { PrismaCoffeeDeliveryRepository } from './repositories/prisma/prisma-coffee-delivery-repository'
import { GetFeaturesCollectionUseCase } from './use-cases/get-features-collection-use-case'
import { GetCoffeesUseCase } from './use-cases/get-coffees-use-case'
import { PostOrderUseCase } from './use-cases/post-order-use-case'
import { CreateSession } from './types'
import { CreateCustomerUseCase } from './use-cases/create-customer-use-case'
import { PrismaCustomerRepository } from './repositories/prisma/prisma-customer-repository'
import { checkAuthMiddleware } from './middlewares/auth-middleware'
import { SessionCustomerUseCase } from './use-cases/session-customer-use-case'
import { RefreshTokenUseCase } from './use-cases/refresh-token-user-case'
import { GetCustomerByTokenUseCase } from './use-cases/get-customer-by-token-use-case'
import { GetMyPurchasesUseCase } from './use-cases/get-my-purchases-use-case'
import { VerifyTokenUseCase } from './use-cases/verify-token-use-case'

export const routes = express.Router()

routes.get('/stores', async (req, res) => {
  const prismaCoffeeDeliveryRepository = new PrismaCoffeeDeliveryRepository()
  const getFeaturesCollectionUseCase = new GetFeaturesCollectionUseCase(prismaCoffeeDeliveryRepository)

  const response = await getFeaturesCollectionUseCase.execute()

  return res.status(200).send(response)
})

routes.get('/coffees', async (req, res) => {
  const prismaCoffeeDeliveryRepository = new PrismaCoffeeDeliveryRepository()
  const getCoffeesUseCase = new GetCoffeesUseCase(prismaCoffeeDeliveryRepository)

  const response = await getCoffeesUseCase.execute()

  return res.status(200).send(response)
})

routes.post('/order', async (req, res) => {
  const { body } = req

  const prismaCoffeeDeliveryRepository = new PrismaCoffeeDeliveryRepository()
  const postOrderUseCase = new PostOrderUseCase(prismaCoffeeDeliveryRepository)

  await postOrderUseCase.execute(body)

  return res.status(200).send({ data: 'Success' })
})

routes.post('/signup', async (req, res) => {
  const { email, password } = req.body as CreateSession;

  const prismaCustomerRepository = new PrismaCustomerRepository()
  const createCustomerUseCase = new CreateCustomerUseCase(prismaCustomerRepository)

  const customer = await createCustomerUseCase.execute({ email, password })

  return res.json(customer)
});

routes.post('/session', async (req, res) => {
  const { email, password } = req.body as CreateSession;

  const prismaCustomerRepository = new PrismaCustomerRepository()
  const sessionCustomerUseCase = new SessionCustomerUseCase(prismaCustomerRepository)

  const token = await sessionCustomerUseCase.execute({ email, password })

  return res.json(token)
})

routes.post('/refresh-token', async (req, res) => {
  const { refresh_token } = req.body;
  
  const prismaCustomerRepository = new PrismaCustomerRepository()
  const refreshTokenUseCase = new RefreshTokenUseCase(prismaCustomerRepository)

  const token = await refreshTokenUseCase.execute(refresh_token)
  
  return res.json(token)
})

routes.get('/customer', async (req, res) => {
  const { token } = req.query

  const prismaCustomerRepository = new PrismaCustomerRepository()
  const getCustomerByTokenUseCase = new GetCustomerByTokenUseCase(prismaCustomerRepository)

  const response = await getCustomerByTokenUseCase.execute(token)
  return res.status(200).json(response)
})

routes.get('/me', checkAuthMiddleware, async (req, res) => {
  const { customer: customerId} = req
  
  const prismaCustomerRepository = new PrismaCustomerRepository()
  const getMyPurchasesUseCase = new GetMyPurchasesUseCase(prismaCustomerRepository)

  if (customerId) {
    const response = await getMyPurchasesUseCase.execute(customerId)
    return res.status(200).json(response)
  }
});

routes.get('/verify-token', async (req, res) => {
  const { token } = req.query

  const prismaCustomerRepository = new PrismaCustomerRepository()
  const verifyTokenUseCase = new VerifyTokenUseCase(prismaCustomerRepository)

  const response = await verifyTokenUseCase.execute(token)
  return res.status(200).json(response)
})