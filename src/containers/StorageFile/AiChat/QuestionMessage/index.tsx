import {
  memo, useCallback,
} from 'react';
import { useDispatch } from 'react-redux';
import {
  Message,
} from '@chatscope/chat-ui-kit-react';

import { Button } from 'components';
import { chatSendMessage } from 'store/chat/actionCreators';

import styles from './styles.module.scss';

const questions = ['Give me a short summary of this paper.', 'Generate question1', 'Generate question2'];

type QuestionMessageProps = {
  isDisabled: boolean
};

export const QuestionMessage = memo<QuestionMessageProps>(({ isDisabled }) => {
  const dispatch = useDispatch();

  const onClickQuestion = useCallback((text: string) => {
    dispatch(chatSendMessage({ message: text }));
  }, [dispatch]);

  return (
    <Message
      model={{
        direction: 'incoming',
        position: 'single',
        sender: 'AI_Bot',
      }}
    >
      <Message.CustomContent className={styles.customContent}>
        {questions.map((text) => (
          <Button
            key={text}
            onClick={() => onClickQuestion(text)}
            className={styles.button}
            disabled={isDisabled}
          >
            {text}
          </Button>
        ))}
      </Message.CustomContent>
    </Message>
  );
});
