declare namespace Express {
  interface Request {
    awsCognitoUser: {
      userId?: string
      role?: 'dnp' | 'steAm' | 'expo'
      username?: string
      email?: string
    }
    answer: any
    question: any
  }
}
