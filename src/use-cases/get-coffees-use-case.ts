import { CoffeeDeliveryRepository } from '../repositories/coffee-delivery-repository'

export class GetCoffeesUseCase {
  private coffeeDeliveryRepository: CoffeeDeliveryRepository

  constructor(coffeeDeliveryRepository: CoffeeDeliveryRepository) {
    this.coffeeDeliveryRepository = coffeeDeliveryRepository
  }

  async execute() {
    const response = await this.coffeeDeliveryRepository.getCoffees()
    return response
  }
}
