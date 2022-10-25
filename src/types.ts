export type CreateSession = {
  email: string;
  password: string;
}

export type RefreshTokensStore = Map<string, string[]>