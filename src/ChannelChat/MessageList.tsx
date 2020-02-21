import React, { useEffect, useReducer, useRef } from 'react';
import { Id } from '../id';
import { OrderedMap } from 'immutable';
import { Message, Preview } from '../api/messages';
import { get } from '../api/request';
import { MessageItem } from './MessageItem';
import { ColorList } from '../api/channels';
import { MessagePreviewItem } from './MessagePreviewItem';
import { MESSAGE_DELETED, MESSAGE_PREVIEW, NEW_MESSAGE } from '../api/events';
import { Loading } from '../Loading/Loading';
import { ChannelAction, EVENTS_LOADED, EventsLoaded, MESSAGES_LOADED, MessagesLoaded, SWITCH_CHANNEL } from './actions';

interface Props {
  channelId: Id;
  colorList: ColorList;
}

interface State {
  channelId: Id;
  loaded: boolean;
  messages: OrderedMap<Id, Message>;
  previews: OrderedMap<Id, Preview>;
  after: number;
}

const initState = (channelId: Id): State => ({
  channelId,
  loaded: false,
  messages: OrderedMap(),
  previews: OrderedMap(),
  after: new Date().getTime(),
});

const handleMessagesLoaded = (state: State, action: MessagesLoaded): State => {
  const loaded = true;
  const previews: typeof state['previews'] = OrderedMap();
  let messages: typeof state['messages'] = OrderedMap();
  for (const message of action.messages) {
    messages = messages.set(message.id, message);
  }
  return { ...state, loaded, previews, messages };
};

const handleEventsLoaded = (state: State, { events }: EventsLoaded): State => {
  let { after, messages, previews } = state;
  for (const event of events) {
    if (event.mailbox !== state.channelId) {
      continue;
    }
    if (event.body.type === NEW_MESSAGE) {
      const newMessage = event.body.message;
      messages = messages.set(newMessage.id, newMessage);
      previews = previews.remove(newMessage.id);
    } else if (event.body.type === MESSAGE_PREVIEW) {
      const newPreview = event.body.preview;
      previews = previews.set(newPreview.id, newPreview);
    } else if (event.body.type === MESSAGE_DELETED) {
      messages = messages.remove(event.body.messageId);
    }
    after = event.timestamp;
  }
  return { ...state, after, messages, previews };
};

const reducer = (state: State, action: ChannelAction): State => {
  console.log(action);
  switch (action.tag) {
    case MESSAGES_LOADED:
      return handleMessagesLoaded(state, action);
    case EVENTS_LOADED:
      return handleEventsLoaded(state, action);
    case SWITCH_CHANNEL:
      return initState(action.channelId);
  }
};

const usePolling = (dispatch: (action: EventsLoaded) => void, channelId: Id, after: number) => {
  const afterRef = useRef(after);
  const timeoutRef = useRef<number | undefined>();
  afterRef.current = after;

  useEffect(() => {
    const polling = async () => {
      const mailbox = channelId;
      const after = afterRef.current;
      const result = await get('/events/subscribe', { mailbox, after });
      if (timeoutRef.current === undefined) {
        return;
      }
      if (result.isOk && result.value.length > 0) {
        dispatch({
          tag: EVENTS_LOADED,
          events: result.value,
        });
      }
      timeoutRef.current = window.setTimeout(polling, 0);
    };
    timeoutRef.current = window.setTimeout(polling, 0);
    return () => {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    };
  }, [channelId]);
};

const useLoadMessages = (dispatch: (action: MessagesLoaded) => void, channelId: Id) => {
  useEffect(() => {
    get('/messages/by_channel', { channelId }).then(result => {
      if (result.isOk) {
        dispatch({
          tag: MESSAGES_LOADED,
          messages: result.value,
        });
      }
    });
  }, [channelId]);
};

export const MessageList: React.FC<Props> = ({ channelId, colorList }) => {
  const [{ messages, previews, loaded, after }, dispatch] = useReducer(reducer, initState(channelId));

  useLoadMessages(dispatch, channelId);
  usePolling(dispatch, channelId, after);

  if (!loaded) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const messageList = messages
    .valueSeq()
    .map(message => <MessageItem key={message.id} message={message} colorList={colorList} />);

  const previewList = previews
    .valueSeq()
    .map(preview => <MessagePreviewItem key={preview.id} preview={preview} colorList={colorList} />);
  return (
    <div>
      {messageList}
      {previewList}
    </div>
  );
};