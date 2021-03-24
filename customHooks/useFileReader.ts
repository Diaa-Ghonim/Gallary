import { useEffect, useRef } from 'react';

export type FileInfo = {
  fileId: string;
  file: File;
  description: string;
};

type Props = {
  filesInfo: FileInfo[];
  callback: (data: FileInfo) => void;
};

export function useFileReader({ filesInfo, callback }: Props) {
  const savedCallback = useRef<Props['callback']>();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (filesInfo.length > 0) {
      for (const fileInfo of filesInfo) {
        console.log(fileInfo);
        if (!fileInfo.file.type.startsWith('image/')) {
          continue;
        }
        let fileReader = new FileReader();
        fileReader.onload = function (ev) {
          let url = String(ev.target.result);
          savedCallback.current({ ...filesInfo, file: url });
        };
        fileReader.readAsDataURL(fileInfo.file);
      }
    }
  }, [filesInfo]);
}

// type PProps = {
//   filesInfo: FileInfo[];
//   callback: (url: string) => void;
// };
// export function useFileReader({ filesInfo, callback }: PProps) {
//   useCustomFileReader(filesInfo);
// }
