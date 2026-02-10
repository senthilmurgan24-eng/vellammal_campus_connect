import { useEffect, useMemo, useRef } from 'react';
import { Client, IMessage, StompSubscription } from '@stomp/stompjs';
import { useToast } from '@/components/ui/Toast';
import { tokenStore } from '@/utils/tokenStore';

interface Options {
  onMessage?: (msg: IMessage) => void;
  topics: string[];
}

const WS_URL = import.meta.env.VITE_WS_URL ?? '/ws-connect';

export default function useWebSocket({ onMessage, topics }: Options) {
  const { push } = useToast();
  const clientRef = useRef<Client | null>(null);
  const subsRef = useRef<StompSubscription[]>([]);

  useEffect(() => {
    const token = tokenStore.getAccessToken();

    const client = new Client({
      brokerURL: WS_URL.startsWith('ws') ? WS_URL : undefined,
      connectHeaders: token ? { Authorization: `Bearer ${token}` } : {},
      webSocketFactory: WS_URL.startsWith('ws') ? undefined : () => new WebSocket(WS_URL),
      reconnectDelay: 3000,
      heartbeatIncoming: 10000,
      heartbeatOutgoing: 10000,
      debug: import.meta.env.DEV ? console.debug : undefined,
      onStompError: (frame) => push({ variant: 'error', title: 'WebSocket error', description: frame.body }),
      onWebSocketClose: () => push({ variant: 'warning', title: 'Disconnected', description: 'Realtime updates paused' }),
      onWebSocketError: () => push({ variant: 'error', title: 'WebSocket error' })
    });

    client.onConnect = () => {
      subsRef.current = topics.map((topic) =>
        client.subscribe(topic, (message) => {
          onMessage?.(message);
        })
      );
      push({ variant: 'success', title: 'Realtime connected' });
    };

    client.activate();
    clientRef.current = client;

    return () => {
      subsRef.current.forEach((s) => s.unsubscribe());
      subsRef.current = [];
      client.deactivate();
      clientRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topics.join('|')]);

  return useMemo(
    () => ({
      send: (destination: string, body: any) => clientRef.current?.publish({ destination, body: JSON.stringify(body) }),
      connected: clientRef.current?.connected ?? false
    }),
    []
  );
}
