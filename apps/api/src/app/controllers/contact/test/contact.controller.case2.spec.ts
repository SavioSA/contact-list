/* eslint-disable spaced-comment */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-undef */
import * as request from 'supertest';
import app from '../../../../index';
import ContactInputInterface from '../../../interfaces/contact-input.interface';

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
          findOne: jest.fn().mockResolvedValue(contact),
          find: jest.fn().mockResolvedValue([contact]),
          findAndCount: jest.fn().mockResolvedValue([[contact], 1]),
          update: jest.fn().mockResolvedValue(contact),
          delete: jest.fn(),
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
  const contactInput: ContactInputInterface = {
    id: 1,
    identifier: '11111111111',
    contactTypeId: 1,
    userId: 1,
    isWhatsapp: true,
  };
  test('It should GET specific contact', async () => {
    const response = await request(app).get('/api/v1/contact/1');
    expect(response.statusCode).toBe(200);
  });

  test('It should GET many contacts', async () => {
    const response = await request(app).get('/api/v1/contact?offset=0&page=0');
    expect(response.statusCode).toBe(200);
  });

  test('It should POST existing contact', async () => {
    const response = await request(app).post('/api/v1/contact').send(contactInput);
    expect(response.statusCode).toBe(409);
  });

  test('It should POST contact with body error', async () => {
    const response = await request(app).post('/api/v1/contact').send();
    expect(response.statusCode).toBe(403);
  });

  test('It should PUT contact', async () => {
    const response = await request(app).put('/api/v1/contact').send(contactInput);
    expect(response.statusCode).toBe(200);
  });

  test('It should PUT contact with body error', async () => {
    const response = await request(app).put('/api/v1/contact').send();
    expect(response.statusCode).toBe(403);
  });

  test('It should DELETE contact', async () => {
    const response = await request(app).delete('/api/v1/contact/1').send();
    expect(response.statusCode).toBe(200);
  });
});
