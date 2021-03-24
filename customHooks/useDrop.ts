import { useEffect, useState, MutableRefObject } from 'react';

type Props = {
  droppableElementRef: MutableRefObject<HTMLDivElement>;
};

export function useDrop({ droppableElementRef }: Props) {
  const [droppedData, setDroppedData] = useState<File[]>([]);
  useEffect(() => {
    function dragover_handler(evt) {
      evt.preventDefault();
      // evt.stopPropagation();
    }
    function dragEnter_handler(evt) {
      evt.preventDefault();
      // evt.stopPropagation();
    }

    function drop_handler(evt) {
      evt.preventDefault();
      // evt.stopPropagation();
      let files = evt.dataTransfer.files;
      setDroppedData([...files]);
    }
    if (!droppableElementRef && droppableElementRef.current) return;
    let droppableEle = droppableElementRef.current;
    droppableEle.addEventListener('dragenter', dragEnter_handler, false);
    droppableEle.addEventListener('dragover', dragover_handler);
    droppableEle.addEventListener('drop', drop_handler);
    return () => {
      droppableEle.removeEventListener('dragenter', dragEnter_handler, false);
      droppableEle.removeEventListener('dragover', dragover_handler);
      droppableEle.removeEventListener('drop', drop_handler);
    };
  }, [droppableElementRef.current]);

  return droppedData;
}
