import { CustomerRepository } from '../repositories/customer-repository'

export class SessionCustomerUseCase {
  private customerRepository: CustomerRepository

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  async execute(client: any) {
    const response = await this.customerRepository.sessionCustomer(client)
    return response
  }
}
