import {
  FC, memo, useRef, useState, 
} from 'react';

import {
  Button,
  RadioButtons,
  TextInput,
  Typography,
} from 'components';

import styles from './styles.module.scss';
import { EditItem } from './EditItem';
import { GraphResponseType } from '../types';

// const newEdge = {
//   head: 'New',
//   tail: '',
//   type: '',
//   meta: {
//     spans: [[]],
//   },
// };

interface FileInfoProps {
  edges: GraphResponseType[];
  // setEdges: (edges: GraphResponseType[]) => void;
  onSaveClick: () => void;
}

const {
  name,
  field,
} = {
  name: 'Newest breakthroughs in gene therapy',
  field: 'Gene therapy',
};

export const FileInfoEdit: FC<FileInfoProps> = memo(({ edges, onSaveClick }) => {
  const storageFileItemRef = useRef<HTMLDivElement>(null);
  // const [lastEdgeFields, setLastEdgeFields] = useState({
  //   head: '',
  //   type: '',
  //   tail: '',
  // });
  const [nameFile, setNameFile] = useState(name);
  const [fieldFile, setFieldFile] = useState(field);
  // const lastEdgeAvaliable = lastEdgeFields.head && lastEdgeFields.type && lastEdgeFields.tail;

  // const updateGraphItem = (index: number, updatedItem: GraphResponseType) => {
  //   const updatedGraphItems = [...edges];
  //   updatedGraphItems[index] = updatedItem;
  //   setEdges(updatedGraphItems);
  // };

  // useEffect(() => {
  //   const lastItem = edges[edges.length - 1];
  //   if (lastItem) {
  //     setLastEdgeFields({
  //       head: lastItem.head,
  //       type: lastItem.type,
  //       tail: lastItem.tail,
  //     });
  //   }
  // }, [edges]);

  // const addNewEdgeClick = useCallback(() => {
  //   if (lastEdgeFields.head && lastEdgeFields.type && lastEdgeFields.tail) {
  //     setEdges([...edges, newEdge]);
  //     if (storageFileItemRef.current) {
  //       setTimeout(() => {
  //         if (storageFileItemRef.current) {
  //           storageFileItemRef.current.scrollTop = storageFileItemRef.current.scrollHeight;
  //         }
  //       }, 100);
  //     }
  //   }
  // }, [edges, lastEdgeFields.head, lastEdgeFields.tail, lastEdgeFields.type, setEdges]);

  // const onDelete = useCallback((indexToDelete: number) => {
  //   const updatedGraphItems = [...edges];
  //   updatedGraphItems.splice(indexToDelete, 1);
  //   setEdges(updatedGraphItems);
  // }, [edges, setEdges]);

  return (
    <>
      <div className={styles.storageFile__file}>
        <Typography type="h1">File information</Typography>
        <div className={styles.storageFile__wrapper}>
          <div className={styles.storageFile__item}>
            File name:
            <TextInput
              onChangeValue={setNameFile}
              value={nameFile}
              classNameContainer={styles.storageFile__item_input}
              classNameInputBox={styles.storageFile__item_input_box}
            />
          </div>
          <div className={styles.storageFile__item}>
            Field: 
            <TextInput
              onChangeValue={setFieldFile}
              value={fieldFile}
              classNameContainer={styles.storageFile__item_input}
              classNameInputBox={styles.storageFile__item_input_box}
            />
          </div>
          <div className={styles.storageFile__item}>
            Graph edges: 
            {/* <Button
              onClick={addNewEdgeClick}
              theme="secondary"
              disabled={!lastEdgeAvaliable}
            >
              Add new edge
            </Button> */}
          </div>
          <div className={styles.storageFile__edit} ref={storageFileItemRef}>
            {!!edges?.length && (
              edges.map(({ head, tail, type }, index) => (
                <EditItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className={styles.storageFile__edit_item}
                  index={index}
                  head={head}
                  type={type}
                  tail={tail}
                  // updateGraphItem={updateGraphItem}
                  // onDelete={onDelete}
                />
              ))
            )}
            
          </div>
          <div className={styles.storageFile__item}>
            Access:
            <RadioButtons
              containerClassName={styles.radio_buttons}
              options={[
                {
                  value: '1',
                  label: 'Open-sourced',
                },
                {
                  value: '2',
                  label: 'Permission-based',
                },
              ]}
              currentValue="1"
              onChange={() => {}}
            />
          </div>
        </div> 
      </div>
      <div className={styles.storageFile__buttons}>
        <Button theme="secondary" onClick={onSaveClick}>Save changes</Button>
        <Button theme="secondary">Revert to last saved</Button>
        <Button>Revert to last published</Button>
      </div>
    </>
  );
});
