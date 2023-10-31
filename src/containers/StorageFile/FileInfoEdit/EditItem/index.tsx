import { FC, useCallback } from 'react';
import cx from 'classnames';

import {
  // ButtonIcon,
  TextInput,
} from 'components';
// import { trashIcon } from 'assets';
// import { GraphResponseType } from 'containers/StorageFile/types';

import styles from './styles.module.scss';

interface EditItemProps {
  className?: string;
  index: number;
  head: string;
  type: string;
  tail: string;
  // updateGraphItem: (index: number, updatedItem: GraphResponseType) => void;
  // onDelete: (index: number) => void;
}

export const EditItem: FC<EditItemProps> = ({
  className,
  index,
  head,
  type,
  tail,
  // updateGraphItem,
  // onDelete,
}) => {
  const handleInputChange = useCallback(() => {
    // const updatedItem = {
    //   head: name === 'subj' ? text : head,
    //   type: name === 'verb' ? text : type,
    //   tail: name === 'obj' ? text : tail,
    //   meta: {
    //     spans: [[]],
    //   },
    // };
    // updateGraphItem(index, updatedItem);
  }, []);

  return (
    <div className={cx(styles.edit_item__container, className)}>
      <span>{`${index + 1}.`}</span>
      <div className={styles.edit_item_inputs}>
        <TextInput
          name="subj"
          onChangeValue={handleInputChange}
          value={head}
          classNameContainer={styles.edit_item_input_container}
          classNameInputBox={styles.edit_item_inputBox}
          placeholder="Artificial Intelligence SUBJ"
          disabled
        />
        <TextInput
          name="verb"
          onChangeValue={handleInputChange}
          value={type}
          classNameContainer={styles.edit_item_input_container}
          classNameInputBox={styles.edit_item_inputBox}
          placeholder="Analyzes VERB"
          disabled
        />
        <TextInput
          name="obj"
          onChangeValue={handleInputChange}
          value={tail}
          classNameContainer={styles.edit_item_input_container}
          classNameInputBox={styles.edit_item_inputBox}
          placeholder="Individual genome OBJ"
          disabled
        />
      </div>
      {/* <ButtonIcon
        className={styles.edit_item_icon}
        image={trashIcon}
        onClick={() => onDelete(index)}
      /> */}
    </div>
  );
};
