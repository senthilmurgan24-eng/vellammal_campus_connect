import { Client } from '@stomp/stompjs';
import { tokenStore } from '@/utils/tokenStore';

const WS_URL = import.meta.env.VITE_WS_URL ?? '/ws-connect';

export const createWsClient = () => {
  const token = tokenStore.getAccessToken();
  return new Client({
    brokerURL: WS_URL.startsWith('ws') ? WS_URL : undefined,
    webSocketFactory: WS_URL.startsWith('ws') ? undefined : () => new WebSocket(WS_URL),
    connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
    reconnectDelay: 3000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000
  });
};
