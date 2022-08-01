import * as express from 'express';
import { customConnection } from "./database/dbConnection";

const app = express();

customConnection(process.env.MYSQL_HOST)

app.get('/api', (req, res) => {
  res.send({ message: 'Welcomes to api!' });
});

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
