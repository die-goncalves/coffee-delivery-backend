import { CustomerRepository } from '../repositories/customer-repository'

export class VerifyTokenUseCase {
  private customerRepository: CustomerRepository

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  async execute(refresh_token: any) {
    const response = await this.customerRepository.tokenExpired(refresh_token)
    return response
  }
}
