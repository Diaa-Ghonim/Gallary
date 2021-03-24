import React, { ReactElement } from 'react';
import { Card, Form } from 'react-bootstrap';
import Styles from '../styles/createAlbum.module.scss';

interface Props {
  photoSrc: string;
}

export default function PreviewPhoto({ photoSrc }: Props): JSX.Element {
  return (
    <>
      <Card
        className={Styles.previewCard}
        draggable='true'
        onDragStart={(evt) => {
          // evt.preventDefault();
          // evt.stopPropagation();
          // evt.dataTransfer.setData('text/html', '');
        }}
        onDragEnter={(evt) => {
          evt.preventDefault();
          evt.stopPropagation();
        }}
        onDragOver={(evt) => {
          evt.preventDefault();
          evt.stopPropagation();
        }}
      >
        <div className={Styles['customCardPhotoContainer']}>
          <Card.Img variant='top' className={Styles['photo']} src={photoSrc} />
        </div>
        <Card.Body>
          <Form.Control
            as='textarea'
            rows={3}
            className={Styles['customCardBodyTextarea']}
            placeholder='Description (optional)'
          />
        </Card.Body>
      </Card>
    </>
  );
}
