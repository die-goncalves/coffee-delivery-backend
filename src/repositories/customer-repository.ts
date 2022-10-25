export type Customer = {
  email: string
  password: string
}

export interface CustomerRepository {
  createCustomer: ({email, password}: Customer) => Promise<any>
  sessionCustomer: ({email, password}: Customer) => Promise<any>
  refreshToken: (refresh_token: string) => Promise<any>
  getCustomerByToken: (token: string) => Promise<any>
  getMyPurchases: (customerId: string) => Promise<any>
  tokenExpired: (token: string) => Promise<any>
}
