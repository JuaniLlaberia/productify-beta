import * as WebSocketLibrary from 'ws';

export interface CustomWebSocket extends WebSocketLibrary {
  userId?: string;
}
