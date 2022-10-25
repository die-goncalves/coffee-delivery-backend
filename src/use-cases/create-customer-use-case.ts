import { CustomerRepository } from '../repositories/customer-repository'

export class CreateCustomerUseCase {
  private customerRepository: CustomerRepository

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  async execute(client: any) {
    const response = await this.customerRepository.createCustomer(client)
    return response
  }
}
