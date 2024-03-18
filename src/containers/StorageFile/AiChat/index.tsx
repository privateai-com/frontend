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
} from '@chatscope/chat-ui-kit-react';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';

import { Button } from 'components';
import { chatGetMessages, chatSendMessage } from 'store/chat/actionCreators';
import { chatSelectors } from 'store/chat/selectors';

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

  const toggleShowChat = useCallback(() => {
    setShowChat((state) => !state);
  }, []);

  const onSendMessage = useCallback((text: string) => {
    dispatch(chatSendMessage({ message: text }));
  }, [dispatch]);
    
  useEffect(() => {
    dispatch(chatGetMessages({
      articleId, articleName,
    }));
  }, [articleId, articleName, dispatch]);

  return (
    <div className={styles.chat_container}>
      <div className={cx(styles.chat, { [styles.show]: showChat })}>
        <MainContainer>
          <ChatContainer>       
            <MessageList>
              {messages.map((msg) => (
                msg.message === 'questions'
                  ? <QuestionMessage isDisabled={messages.length > 2} />
                  : <Message model={{ ...msg }} style={{ color: 'red' }} />
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
