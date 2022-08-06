/* eslint-disable spaced-comment */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import * as request from 'supertest';
import app from '../../../../index';

jest.mock('typeorm', () => {
  const contact = {
    id: 1,
    identifier: '99999999999',
    type: {
      id: 1,
      type: 1,
    },
  };

  return {
    __esModule: true,
    getCustomRepository: jest.fn(),
    PrimaryGeneratedColumn: jest.fn(),
    Column: jest.fn(),
    CreateDateColumn: jest.fn(),
    UpdateDateColumn: jest.fn(),
    Entity: jest.fn(),
    EntityRepository: jest.fn(),
    Repository: jest.fn(),
    DataSource: class {
      public getRepository() {
        return {
          findAndCount: jest.fn().mockResolvedValue(null),
        };
      }

      public initialize() {
        return {
          then() {
            return { catch: jest.fn() };
          },
        };
      }
    },
    OneToMany: jest.fn(),
    ManyToOne: jest.fn(),
    JoinColumn: jest.fn(),
  };
});

describe('/api/v1/contact/', () => {
  test('It should GET many users (server error)', async () => {
    const response = await request(app).get('/api/v1/contact?offset=0&page=0');
    expect(response.statusCode).toBe(500);
  });
});
