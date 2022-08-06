/* eslint-disable spaced-comment */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import * as request from 'supertest';
import app from '../../../../index';

jest.mock('typeorm', () => {
  const user = {
    id: 1,
    name: 'Teste',
    surname: 'Teste',
    contacts: [
      {
        id: 1,
        identifier: '99999999999',
        type: {
          id: 1,
          type: 1,
        },
      },
    ],
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
          findOne: jest.fn().mockResolvedValue(null),
          find: jest.fn().mockResolvedValue([user]),
          findAndCount: jest.fn().mockResolvedValue(null),
          update: jest.fn().mockResolvedValue(user),
          delete: jest.fn(),
          save: jest.fn().mockResolvedValue(user),
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
  const user = {
    id: 1,
    name: 'Teste',
    surname: 'Teste',
    contacts: [
      {
        id: 1,
        identifier: '99999999999',
        contactTypeId: 1,
        isWhatsapp: true,
      },
    ],
  };

  test('It should GET specific user (not found)', async () => {
    const response = await request(app).get('/api/v1/user/1');
    expect(response.statusCode).toBe(404);
  });

  test('It should POST user', async () => {
    const response = await request(app).post('/api/v1/user').send(user);
    expect(response.statusCode).toBe(200);
  });

  test('It should POST user with body error', async () => {
    const response = await request(app).post('/api/v1/user').send({
      id: 1,
      name: '',
      surname: 'Teste',
      contacts: [
        {
          id: 1,
          identifier: '99999999999',
          contactTypeId: 1,
          isWhatsapp: true,
        },
      ],
    });

    expect(response.statusCode).toBe(403);
  });

  test('It should PUT contact not found contact', async () => {
    const response = await request(app).put('/api/v1/user').send(user);
    expect(response.statusCode).toBe(404);
  });

  test('It should PUT contact with body error', async () => {
    const response = await request(app).put('/api/v1/user').send({
      id: 1,
      name: '',
      surname: 'Teste',
      contacts: [
        {
          id: 1,
          identifier: '99999999999',
          contactTypeId: 1,
          isWhatsapp: true,
        },
      ],
    });
    expect(response.statusCode).toBe(403);
  });

  test('It should DELETE contact (not found)', async () => {
    const response = await request(app).delete('/api/v1/user/1').send();
    expect(response.statusCode).toBe(404);
  });
});
