module.exports = {
  preset: 'ts-jest', // Для поддержки TypeScript
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Преобразование TypeScript файлов
    '^.+\\.jsx?$': 'babel-jest', // Преобразование ES6/ESM файлов
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'], // Преобразование внешних зависимостей
};
