import { CustomerRepository } from '../repositories/customer-repository'

export class GetMyPurchasesUseCase {
  private customerRepository: CustomerRepository

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  async execute(customerId: string) {
    const response = await this.customerRepository.getMyPurchases(customerId)
    return response
  }
}
