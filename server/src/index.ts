import mongoose from 'mongoose';
import dotenv from 'dotenv';
import ws from 'ws';
import jwt from 'jsonwebtoken';

import { app } from './app';
import { messageDataType } from './utils/types/messagesTypes';
import { CustomWebSocket } from '../types/ws';
import { Message } from './models/Message';

dotenv.config({ path: './config.env' });

mongoose
  .connect(process.env.MONGODB_URL!)
  .then(() => console.log('Connected to database.'));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`App running in ${process.env.NODE_ENV}`);
});

//Web socket functionalities for messaging
const wss = new ws.WebSocketServer({ server });

wss.on('connection', (connection: CustomWebSocket, req) => {
  //Handle users and user id inside the connection object
  const cookies = req.headers.cookie;

  //Checking if we have cookies and if inside those cookies we have a JWT token
  if (cookies) {
    const jwtToken = cookies
      .split(';')
      .find(str => str.startsWith('jwt='))
      ?.split('=')
      .at(1);

    if (jwtToken) {
      const decodedPayload = jwt.verify(jwtToken, process.env.JWT_SECRET!) as {
        id: string;
      };

      connection.userId = decodedPayload.id;
    }
  }

  //Handle messages
  connection.on('message', async (message: Buffer) => {
    //Parsing client message
    const messageData: messageDataType = JSON.parse(message.toString());
    const { content, chatId, sendBy } = messageData;

    //Store message in DB
    const messageDB = await Message.create({
      content,
      chatId,
      sendBy: sendBy._id,
    });

    const messageToSend = {
      ...messageDB.toJSON(),
      sendBy,
    };

    //Send received message to all users in the chat
    [...wss.clients]
      .filter((client: any) => messageData.recipients.includes(client.userId))
      .forEach((client: any) => client.send(JSON.stringify(messageToSend)));
  });
});
