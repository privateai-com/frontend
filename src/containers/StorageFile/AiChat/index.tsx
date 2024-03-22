import {
  memo, useCallback, useEffect, useState, 
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cx from 'classnames';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import { Button } from 'components';
import {
  chatExit,
  chatSendMessage,
  chatStart,
} from 'store/chat/actionCreators';
import { chatSelectors } from 'store/chat/selectors';

import { ChatActionTypes } from 'store/chat/actionTypes';
import { RequestStatus } from 'types';
import styles from './styles.module.scss';
import { QuestionMessage } from './QuestionMessage';

type AiChatProps = {
  articleId: string
  articleName: string
};

export const AiChat = memo<AiChatProps>(({ articleId, articleName }) => {
  const dispatch = useDispatch();
  const [showChat, setShowChat] = useState(false);
  const messages = useSelector(chatSelectors.getProp('messages'));
  const statusSendMessage = useSelector(chatSelectors.getStatus(ChatActionTypes.SendMessage));

  const toggleShowChat = useCallback(() => {
    setShowChat((state) => !state);
    if (!showChat) {
      dispatch(chatStart({
        articleId, articleName,
      }));
    }
  }, [articleId, articleName, dispatch, showChat]);

  const onSendMessage = useCallback((text: string) => {
    dispatch(chatSendMessage({ articleId, message: text }));
  }, [articleId, dispatch]);
    
  useEffect(() => () => {
    if (showChat) {
      dispatch(chatExit({
        articleId,
      }));
    }
  }, [articleId, dispatch, showChat]);

  return (
    <div className={styles.chat_container}>
      <div className={cx(styles.chat, { [styles.show]: showChat })}>
        <MainContainer>
          <ChatContainer>       
            <MessageList
              typingIndicator={
                statusSendMessage === RequestStatus.REQUEST && <TypingIndicator content="AI assistant is typing" />
              }
            >
              {messages.map((m, i) => ({ ...m, id: `message_${i}` })).map((msg) => (
                msg.message === 'questions'
                  ? (
                    <QuestionMessage
                      key={msg.id}
                      isDisabled={messages.length > 2}
                      onSend={onSendMessage}
                    />
                  )
                  : <Message key={msg.id} model={{ ...msg }} />
              ))}
            </MessageList>
            <MessageInput onSend={onSendMessage} placeholder="Type message here" attachButton={false} autoFocus />        
          </ChatContainer>
        </MainContainer>
      </div>

      <Button className={styles.chat_button} onClick={toggleShowChat}>
        AI
        <br />
        Assistant
      </Button>
    </div>
  );
});
