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
          findOne: jest.fn().mockResolvedValue(null),
          find: jest.fn().mockResolvedValue([contact]),
          findAndCount: jest.fn().mockResolvedValue(null),
          update: jest.fn().mockResolvedValue(contact),
          delete: jest.fn(),
          save: jest.fn().mockResolvedValue(contact),
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

  test('It should GET specific contact (not found)', async () => {
    const response = await request(app).get('/api/v1/contact/1');
    expect(response.statusCode).toBe(404);
  });

  test('It should POST contact', async () => {
    const response = await request(app).post('/api/v1/contact').send(contactInput);
    expect(response.statusCode).toBe(200);
  });

  test('It should POST contact with business rule error: phone as email', async () => {
    const response = await request(app).post('/api/v1/contact').send({
      id: 1,
      identifier: '11111111111',
      contactTypeId: 2,
      userId: 1,
      isWhatsapp: true,
    });
    expect(response.statusCode).toBe(403);
  });

  test('It should POST contact with business rule error: email is Whatsapp', async () => {
    const response = await request(app).post('/api/v1/contact').send({
      id: 1,
      identifier: 'teste@teste.com',
      contactTypeId: 2,
      userId: 1,
      isWhatsapp: true,
    });
    expect(response.statusCode).toBe(403);
  });

  test('It should POST contact with business rule error: email as phone', async () => {
    const response = await request(app).post('/api/v1/contact').send({
      id: 1,
      identifier: 'teste@teste.com',
      contactTypeId: 1,
      userId: 1,
      isWhatsapp: true,
    });
    expect(response.statusCode).toBe(403);
  });

  test('It should PUT contact not found contact', async () => {
    const response = await request(app).put('/api/v1/contact').send(contactInput);
    expect(response.statusCode).toBe(404);
  });

  test('It should DELETE contact (not found)', async () => {
    const response = await request(app).delete('/api/v1/contact/1').send();
    expect(response.statusCode).toBe(404);
  });
});
