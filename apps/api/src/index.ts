import * as cors from 'cors';
import * as express from 'express';
import ContactTypeController from './app/controllers/contact-type/contact-type.controller';
import ContactController from './app/controllers/contact/contact.controller';
import UserController from './app/controllers/user/user.controller';
import dbConnection from './database/dbConnection';

const app = express();
app.use(cors());
app.use(express.json());
dbConnection.initialize().then(() => {
  console.log('Database connected.');
}).catch((error) => {
  console.log(error);
});

app.use('/api/v1/user', UserController);
app.use('/api/v1/contact', ContactController);
app.use('/api/v1/contact-type', ContactTypeController);

app.get('/api', (req, res) => {
  res.send({ message: 'Welcomes to api!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);

export default app;
