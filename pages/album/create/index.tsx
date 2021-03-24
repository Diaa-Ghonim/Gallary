import React, {
  ReactElement,
  useEffect,
  useRef,
  useReducer,
  ChangeEvent,
  Dispatch,
} from 'react';
import Styles from '../../../styles/createAlbum.module.scss';
import { v4 as uuidv4 } from 'uuid';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  DropdownButton,
  Dropdown,
  ButtonGroup,
  CardDeck,
  Card,
} from 'react-bootstrap';

import { useDrop } from '../../../customHooks/useDrop';

type FileInfo = {
  id: string;
  description: string;
  url: string;
  file: File;
};

type Privacy = { public: boolean; private: boolean };

type State = {
  files: FileInfo[];
  privacy: Privacy;
  description: string;
  name: string;
  isSubmitBtnDisabled: boolean;
};

let initialState: State = {
  files: [],
  privacy: { public: true, private: false },
  description: '',
  name: '',
  isSubmitBtnDisabled: true,
};

type ActionType =
  | 'SET_ALBUM_PRIVACY'
  | 'SET_ALBUM_NAME'
  | 'SET_ALBUM_DESCRIPTION'
  | 'DROP'
  | 'UPLOAD'
  | 'REMOVE_FILE'
  | 'ADD_FILE_DESCRIPTION';

type Action = {
  type: ActionType;
  payload: {
    id?: string;
    file?: FileInfo;
    privacy?: Privacy;
    description?: string;
    name?: string;
  };
};

function albumReducer(state: State, { type, payload }: Action): State {
  switch (type) {
    case 'SET_ALBUM_PRIVACY': {
      return {
        ...state,
        privacy: {
          public: payload.privacy.public,
          private: payload.privacy.private,
        },
      };
    }
    case 'SET_ALBUM_NAME': {
      return {
        ...state,
        name: payload.name,
      };
    }

    case 'SET_ALBUM_DESCRIPTION': {
      return {
        ...state,
        description: payload.description,
      };
    }
    case 'DROP':
    case 'UPLOAD':
      return {
        ...state,
        files: [...state.files, payload.file],
        isSubmitBtnDisabled: false,
      };

    case 'REMOVE_FILE': {
      return {
        ...state,
        files: state.files.filter((file) => file.id !== payload.id),
        isSubmitBtnDisabled: state.files.length > 0 ? true : false,
      };
    }

    case 'ADD_FILE_DESCRIPTION': {
      let files = state.files.map((file) => {
        if (file.id === payload.id) {
          return {
            ...file,
            description: payload.description,
          };
        }
        return file;
      });
      return {
        ...state,
        files,
      };
    }

    default:
      return state;
  }
}

export function readFile(
  dispatch: Dispatch<Action>,
  uploadedFile: File,
  actionType: 'DROP' | 'UPLOAD'
) {
  let reader = new FileReader();
  reader.onload = function () {
    let file: FileInfo = {
      url: String(reader.result),
      description: '',
      id: uuidv4(),
      file: uploadedFile,
    };
    dispatch({
      type: actionType,
      payload: {
        file,
      },
    });
  };
  reader.readAsDataURL(uploadedFile);
}

export default function (): ReactElement {
  const [
    { files, description, privacy, name, isSubmitBtnDisabled },
    dispatch,
  ] = useReducer(albumReducer, initialState);
  const droppableElementRef = useRef<HTMLDivElement>(null);
  let droppedFiles = useDrop({ droppableElementRef });

  useEffect(() => {
    for (const droppedFile of droppedFiles) {
      readFile(dispatch, droppedFile, 'DROP');
    }
  }, [droppedFiles]);

  function onPrivacyPublicSelect() {
    dispatch({
      type: 'SET_ALBUM_PRIVACY',
      payload: { privacy: { public: true, private: false } },
    });
  }

  function onPrivacyPrivateSelect() {
    dispatch({
      type: 'SET_ALBUM_PRIVACY',
      payload: { privacy: { public: false, private: true } },
    });
  }

  function onAlbumNameChange(evt: ChangeEvent<HTMLInputElement>) {
    dispatch({ type: 'SET_ALBUM_NAME', payload: { name: evt.target.value } });
  }

  function onAlbumDescriptionChange(evt: ChangeEvent<HTMLInputElement>) {
    dispatch({
      type: 'SET_ALBUM_DESCRIPTION',
      payload: { description: evt.target.value },
    });
  }

  function onInputFileChange(evt: ChangeEvent<HTMLInputElement>) {
    let uploadedFiles = Array.from(evt.target.files); // beacause files:FileList
    for (const uplodedFile of uploadedFiles) {
      readFile(dispatch, uplodedFile, 'UPLOAD');
    }
  }

  function onSubmit(evt) {
    evt.preventDefault();
    // name,desc,privacy,files
    let album = new FormData();
    album.append('name', name);
    album.append('privacy', JSON.stringify(privacy.public || privacy.private));
    album.append('description', description);
    for (const { id, file, description } of files) {
      album.append(id, file, 'photoFile');
      album.append(id, JSON.stringify({ id, file, description }));
    }
    /** here i will send request to server */
  }

  return (
    <Container className={`${Styles.createAlbumContainer} ${'border'}`} fluid>
      <Row style={{ height: '100%' }}>
        <Col
          xs={{ span: 12, order: 2 }}
          sm={12}
          md={{ span: 5, order: 1 }}
          lg={4}
          xl={3}
          className={Styles.dashboardCol}
        >
          <Form className='pt-2'>
            <Form.Group>
              <p className='h5 pt-2 pb-3 border-bottom '>Create Album</p>
            </Form.Group>

            <Form.Group>
              <DropdownButton
                as={ButtonGroup}
                title={privacy.public ? 'Public' : 'Only Me'}
                id='bg-vertical-dropdown-1'
              >
                <Dropdown.Item
                  eventKey='Only Me'
                  onSelect={onPrivacyPrivateSelect}
                >
                  Only Me
                </Dropdown.Item>
                <Dropdown.Item
                  eventKey='Public'
                  onSelect={onPrivacyPublicSelect}
                >
                  Public
                </Dropdown.Item>
              </DropdownButton>
            </Form.Group>

            <Form.Group>
              <Form.Control
                size='lg'
                value={name}
                onChange={onAlbumNameChange}
                type='text'
                style={{ fontSize: '1rem' }}
                placeholder='Album Name'
              />
            </Form.Group>

            <Form.Group controlId='exampleForm.ControlTextarea1'>
              <Form.Control
                as='textarea'
                rows={3}
                value={description}
                onChange={onAlbumDescriptionChange}
                style={{ height: '120px', resize: 'none' }}
                placeholder='Description (optional)'
              />
            </Form.Group>

            <Form.Group>
              <div className={Styles.fileWrapper}>
                <div className={Styles.inputFileWrapper}>
                  <Form.Label
                    htmlFor='uploadImage'
                    className={Styles.fileLabel}
                  >
                    <FileSvg />
                    Upload Photos
                  </Form.Label>
                  <Form.File
                    type='file'
                    name='image'
                    multiple
                    id='uploadImage'
                    data-testid='uploadImages'
                    accept='image/*'
                    onChange={onInputFileChange}
                  />
                </div>
              </div>
            </Form.Group>

            <Button
              onClick={onSubmit}
              variant='primary'
              type='submit'
              block
              disabled={isSubmitBtnDisabled}
            >
              Submit
            </Button>
          </Form>
        </Col>

        <Col
          xs={{ span: 12, order: 1 }}
          sm={12}
          md={{ span: 7, order: 2 }}
          lg={8}
          xl={9}
          style={{ height: '100%', padding: '0px' }}
        >
          <div
            className={`bg-light border-left d-flex flex-direction-row justify-content-center align-items-center ${Styles.changeBorder}`}
            style={{ minHeight: '200px', height: '100%' }}
            ref={droppableElementRef}
            data-testid='droppable-area'
          >
            {files.length === 0 ? (
              <div className={Styles['dragHereContainer']}>
                <DragHere />
              </div>
            ) : (
              <CardDeck className={Styles.customCardDeck}>
                {
                  /*files.length > 0 &&*/
                  files.map(({ id, url, description }, i) => {
                    let img = new Image();
                    img.src = url;
                    let width = img.width;
                    let height = img.height;
                    let isHeightBiggerThanWidth = false;
                    if (height > width) {
                      isHeightBiggerThanWidth = true;
                    }
                    return (
                      <PreviewPhotoCard
                        key={id}
                        dispatch={dispatch}
                        id={id}
                        url={url}
                        description={description}
                        isHeightBiggerThanWidth={isHeightBiggerThanWidth}
                      />
                    );
                  })
                }
              </CardDeck>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export function DragHere(): JSX.Element {
  return (
    <>
      <p className='text-center'>
        <svg viewBox='0 0 24 24' width='60' height='60'>
          <path d='M5 8.5c0-.828.672-1.5 1.5-1.5s1.5.672 1.5 1.5c0 .829-.672 1.5-1.5 1.5s-1.5-.671-1.5-1.5zm9 .5l-2.519 4-2.481-1.96-4 5.96h14l-5-8zm8-4v14h-20v-14h20zm2-2h-24v18h24v-18z' />
        </svg>
      </p>
      <p className='h5 text-center'>Drag photos here to get started.</p>
    </>
  );
}

type DropdownPhotoPreview = {
  dispatch: Dispatch<Action>;
  id: string;
};

export function DropdownPhotoPreview({
  dispatch,
  id,
}: DropdownPhotoPreview): JSX.Element {
  function onDropdown() {
    dispatch({ type: 'REMOVE_FILE', payload: { id: id } });
  }

  return (
    <Dropdown className={Styles['previewDropdown']}>
      <Dropdown.Toggle as='div' className={Styles['dropdownToggle']}>
        <div>...</div>
      </Dropdown.Toggle>

      <Dropdown.Menu data-testid='dropdownPreview'>
        <Dropdown.Item href='' onClick={onDropdown}>
          Remove Photo
        </Dropdown.Item>
        <Dropdown.Item href=''>Rotate Left</Dropdown.Item>
        <Dropdown.Item href=''>Rotate Right</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export function FileSvg(): JSX.Element {
  return (
    <svg viewBox='0 0 24 24'>
      <path d='M18.5 15c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-7.18 4h-12.82v-24h8.409c4.857 0 3.335 8 3.335 8 3.009-.745 8.256-.419 8.256 3v2.501c-.771-.322-1.614-.501-2.5-.501-3.584 0-6.5 2.916-6.5 6.5 0 1.747.696 3.331 1.82 4.5zm-.252-23.925c2.202 1.174 5.938 4.883 7.432 6.881-1.286-.9-4.044-1.657-6.091-1.179.222-1.468-.185-4.534-1.341-5.702z' />
    </svg>
  );
}

type PreviewPhotoCard = {
  dispatch: Dispatch<Action>;
  id: string;
  url: string;
  description: string;
  isHeightBiggerThanWidth: boolean;
};

export function PreviewPhotoCard({
  dispatch,
  id,
  url,
  description,
  isHeightBiggerThanWidth,
}: PreviewPhotoCard): JSX.Element {
  function onDescriptionChange(evt: ChangeEvent<HTMLTextAreaElement>) {
    dispatch({
      type: 'ADD_FILE_DESCRIPTION',
      payload: {
        id,
        description: evt.target.value,
      },
    });
  }
  return (
    <Card
      className={Styles.previewCard}
      draggable='true'
      onDragStart={(evt) => {
        // evt.preventDefault();
        evt.stopPropagation();
        evt.dataTransfer.setData('text/html', '');
      }}
      onDragEnter={(evt) => {
        // evt.preventDefault();
        evt.stopPropagation();
        // console.log(evt.currentTarget, 'target');
      }}
      onDragOver={(evt) => {
        evt.preventDefault();
        evt.stopPropagation();
        // console.log(evt.currentTarget, 'over');
      }}
      onDrop={(evt) => {
        console.log(evt);
      }}
    >
      <div
        className={
          isHeightBiggerThanWidth
            ? (Styles['heightBigger'], Styles['customCardPhotoContainer'])
            : Styles['customCardPhotoContainer']
        }
      >
        <DropdownPhotoPreview dispatch={dispatch} id={id} />
        <Card.Img variant='top' className={Styles['photo']} src={url} />
      </div>
      <Card.Body>
        <Form.Control
          as='textarea'
          rows={3}
          value={description}
          className={Styles['customCardBodyTextarea']}
          placeholder='Description (optional)'
          onChange={onDescriptionChange}
        />
      </Card.Body>
    </Card>
  );
}
