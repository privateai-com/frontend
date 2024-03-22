import { memo } from 'react';
import {
  Message,
} from '@chatscope/chat-ui-kit-react';

import { Button } from 'components';

import styles from './styles.module.scss';

const questions = ['Give me a short summary of this paper.', 'Generate question1', 'Generate question2'];

type QuestionMessageProps = {
  isDisabled: boolean;
  onSend: (text: string) => void;
};

export const QuestionMessage = memo<QuestionMessageProps>(({ isDisabled, onSend }) => (
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
          onClick={() => onSend(text)}
          className={styles.button}
          disabled={isDisabled}
        >
          {text}
        </Button>
      ))}
    </Message.CustomContent>
  </Message>
));
