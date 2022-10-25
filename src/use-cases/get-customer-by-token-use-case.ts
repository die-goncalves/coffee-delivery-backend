import { CustomerRepository } from '../repositories/customer-repository'

export class GetCustomerByTokenUseCase {
  private customerRepository: CustomerRepository

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  async execute(token: any) {
    const response = await this.customerRepository.getCustomerByToken(token)
    return response
  }
}
