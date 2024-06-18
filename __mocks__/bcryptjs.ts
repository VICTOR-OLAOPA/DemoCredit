const bcryptjs = {
    hash: jest.fn((password: string, salt: number) => Promise.resolve(`hashed-${password}`)),
    compare: jest.fn((password: string, hashedPassword: string) => Promise.resolve(password === hashedPassword)),
    genSalt: jest.fn((saltRounds: number) => Promise.resolve('salt'))
  };
  
  export default bcryptjs;
  