import { CustomerRepository } from '../repositories/customer-repository'

export class RefreshTokenUseCase {
  private customerRepository: CustomerRepository

  constructor(customerRepository: CustomerRepository) {
    this.customerRepository = customerRepository
  }

  async execute(refresh_token: any) {
    const response = await this.customerRepository.refreshToken(refresh_token)
    return response
  }
}
