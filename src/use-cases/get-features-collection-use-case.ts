import { CoffeeDeliveryRepository } from '../repositories/coffee-delivery-repository'

export class GetFeaturesCollectionUseCase {
  private coffeeDeliveryRepository: CoffeeDeliveryRepository

  constructor(coffeeDeliveryRepository: CoffeeDeliveryRepository) {
    this.coffeeDeliveryRepository = coffeeDeliveryRepository
  }

  async execute() {
    const response = await this.coffeeDeliveryRepository.getFeaturesCollection()
    return response
  }
}
