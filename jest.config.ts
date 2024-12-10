/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import nextJest from 'next/jest.js'

import type { Config } from '@jest/types';



const config: Config.InitialOptions = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    moduleNameMapper: {
        '^@server/(.*)$': '<rootDir>/src/server/$1'  // $1 추가
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
};

export default config
