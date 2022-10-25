import { JwtPayload, sign, TokenExpiredError, verify } from 'jsonwebtoken';

export class GenerateTokenProvider {
  async createToken (customerId: string): Promise<any> {
    const token = sign({}, 'super-secret', {
      subject: customerId,
      expiresIn: 30, // 30 segundos
    });

    return token
  }

  async verifyToken (token: string): Promise<string | JwtPayload | null> {
    try {
      const decoded = verify(token, 'super-secret');
      return decoded
    } catch (error) {
      throw error;
    }
  }

  async isTokenExpired (token: string): Promise<{isExpired: boolean}> {
    try {
      const decoded = verify(token, 'super-secret');
      return { isExpired: false }
    } catch (error) {
      if (error instanceof TokenExpiredError)
        return { isExpired: true }
      throw error;
    }
  }
}


