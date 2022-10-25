import { CoffeeDeliveryRepository } from '../repositories/coffee-delivery-repository'

export class PostOrderUseCase {
  private coffeeDeliveryRepository: CoffeeDeliveryRepository

  constructor(coffeeDeliveryRepository: CoffeeDeliveryRepository) {
    this.coffeeDeliveryRepository = coffeeDeliveryRepository
  }

  async execute(order: any) {
    await this.coffeeDeliveryRepository.postOrder(order)
  }
}
