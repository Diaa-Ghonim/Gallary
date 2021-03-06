import React, { ReactElement } from 'react';

interface Props {
  files: File[];
}

export default function ({ files }: Props): ReactElement {
  // files = Array.from(files);

  return (
    <>
      {files.map((file) => {
        if (!file.type.startsWith('image/')) {
          continue;
        }
      })}
    </>
  );
}

function handleFiles(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (!file.type.startsWith('image/')) {
      continue;
    }

    const img = document.createElement('img');
    img.classList.add('obj');
    img.file = file;
    preview.appendChild(img); // Assuming that "preview" is the div output where the content will be displayed.

    const reader = new FileReader();
    reader.onload = (function (aImg) {
      return function (e) {
        aImg.src = e.target.result;
      };
    })(img);
    reader.readAsDataURL(file);
  }
}
