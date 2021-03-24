import 'regenerator-runtime/runtime';
import { render, cleanup, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderer from 'react-test-renderer';

import AlbumCreatePage, {
  PreviewPhotoCard,
  DropdownPhotoPreview,
  FileSvg,
} from '../../pages/album/create';
afterEach(cleanup);

describe('Album Create Page', () => {
  let files;

  beforeEach(() => {
    files = [new File(['(⌐□_□)'], 'photo.jpg', { type: 'image/jpg' })];
  });

  it('should upload one file and preview it.', async () => {
    let files = [new File(['(⌐□_□)'], 'photo.jpg', { type: 'image/jpg' })];
    let { getByLabelText, getByText, getByRole } = render(<AlbumCreatePage />);
    let uploadPhotos = getByLabelText('Upload Photos') as HTMLInputElement;
    let dragHere = getByText('Drag photos here to get started.');
    expect(dragHere).toBeInTheDocument();
    userEvent.upload(uploadPhotos, files);
    expect(uploadPhotos.files).toHaveLength(1);
    expect(uploadPhotos.files[0]).toStrictEqual(files[0]);
    let img = await waitFor(() => getByRole('img'));
    expect(dragHere).not.toBeInTheDocument();

    expect(img).toBeInTheDocument();
  });
  it('should upload two files and preview them.', async () => {
    let files = [
      new File(['(⌐□_□)'], 'photo1.jpg', { type: 'image/jpg' }),
      new File(['(⌐□)'], 'photo2.jpg', { type: 'image/jpg' }),
    ];
    let { getByLabelText, getByText, findAllByRole } = render(
      <AlbumCreatePage />
    );

    let uploadPhotos = getByLabelText('Upload Photos') as HTMLInputElement;
    let dragHere = getByText('Drag photos here to get started.');
    expect(dragHere).toBeInTheDocument();
    userEvent.upload(uploadPhotos, files);
    expect(uploadPhotos.files).toHaveLength(2);
    expect(uploadPhotos.files[1]).toStrictEqual(files[1]);
    expect(uploadPhotos.files[2]).toStrictEqual(files[2]);
    let imgs = await findAllByRole('img');
    expect(dragHere).not.toBeInTheDocument();

    imgs.forEach((img) => {
      expect(img).toBeInTheDocument();
    });
  });

  it('should  drop two Photos in droppable area and preview them.', async () => {
    let files = [
      new File(['(⌐□_□)'], 'photo1.jpg', { type: 'image/jpg' }),
      new File(['(⌐□)'], 'photo2.jpg', { type: 'image/jpg' }),
    ];
    let { getByTestId, getByText, findAllByRole } = render(<AlbumCreatePage />);
    let dragHere = getByText('Drag photos here to get started.');
    expect(dragHere).toBeInTheDocument();
    let droppableArea = getByTestId('droppable-area');
    fireEvent.drop(droppableArea, { dataTransfer: { files } });
    let imgs = await findAllByRole('img');
    expect(dragHere).not.toBeInTheDocument();
    imgs.forEach((img) => {
      expect(img).toBeInTheDocument();
    });
  });

  it('should remove preview Photos', async () => {
    let files = [new File(['(⌐□_□)'], 'photo1.jpg', { type: 'image/jpg' })];
    let { getByTestId, getByText, findByRole, debug } = render(
      <AlbumCreatePage />
    );
    let dragHere = getByText('Drag photos here to get started.');
    expect(dragHere).toBeInTheDocument();
    let droppableArea = getByTestId('droppable-area');
    fireEvent.drop(droppableArea, { dataTransfer: { files } });
    let img = await findByRole('img');
    expect(dragHere).not.toBeInTheDocument();

    let dropPreviewBtn = getByText('...');
    userEvent.click(dropPreviewBtn);
    let dropdownPreview = getByTestId('dropdownPreview');
    expect(dropdownPreview).toBeInTheDocument();
    let removePreviewPhoto = getByText('Remove Photo');
    userEvent.click(removePreviewPhoto);
    expect(img).not.toBeInTheDocument();
  });
  it('should add album Name', () => {
    let { getByPlaceholderText } = render(<AlbumCreatePage />);
    let albumNameInput = getByPlaceholderText('Album Name');
    expect(albumNameInput).toHaveValue('');
    userEvent.type(albumNameInput, 'my album');
    expect(albumNameInput).toHaveValue('my album');
  });

  it('should clear album Name Input.', () => {
    let { getByPlaceholderText } = render(<AlbumCreatePage />);
    let albumNameInput = getByPlaceholderText('Album Name');
    userEvent.type(albumNameInput, 'my album');
    userEvent.clear(albumNameInput);
    expect(albumNameInput).toHaveValue('');
  });

  it('should add album Description', () => {
    let { getByPlaceholderText } = render(<AlbumCreatePage />);
    let albumDescriptionInput = getByPlaceholderText('Description (optional)');
    expect(albumDescriptionInput).toHaveValue('');
    userEvent.type(albumDescriptionInput, 'album description');
    expect(albumDescriptionInput).toHaveValue('album description');
  });

  it('should clear Album description.', () => {
    let { getByPlaceholderText } = render(<AlbumCreatePage />);
    let albumDescriptionInput = getByPlaceholderText('Description (optional)');
    userEvent.type(albumDescriptionInput, 'album description');
    userEvent.clear(albumDescriptionInput);
    expect(albumDescriptionInput).toHaveValue('');
  });

  it('sholud show default Album Privacy.', () => {
    let { getByRole } = render(<AlbumCreatePage />);
    let privacyBtn = getByRole('button', { name: /public/i });
    expect(privacyBtn).toBeInTheDocument();
  });

  it('sholud toggle Album Privacy between Only Me and Public.', () => {
    let { getByRole } = render(<AlbumCreatePage />);
    let togglePrivacyBtn = getByRole('button', { name: /public/i });
    userEvent.click(togglePrivacyBtn);
    let privacyOptionsdropdown = getByRole('group');
    expect(privacyOptionsdropdown).toHaveClass('show');
    let onlyMeBtn = getByRole('button', { name: /only me/i });
    userEvent.click(onlyMeBtn);
    expect(togglePrivacyBtn).toHaveTextContent('Only Me');
    expect(privacyOptionsdropdown).not.toHaveClass('show');
    userEvent.click(togglePrivacyBtn);
    expect(privacyOptionsdropdown).toHaveClass('show');
    let publicBtn = getByRole('button', { name: /public/i });
    userEvent.click(publicBtn);
    expect(togglePrivacyBtn).toHaveTextContent('Public');
    expect(privacyOptionsdropdown).not.toHaveClass('show');
  });

  it('should disable submit button till photos uploaded or dropped', async () => {
    let files = [new File(['(⌐□_□)'], 'photo.jpg', { type: 'image/jpg' })];
    let { getByLabelText, getByRole } = render(<AlbumCreatePage />);
    let submitButton = getByRole('button', { name: /submit/i });
    expect(submitButton).toBeDisabled();
    let uploadPhotos = getByLabelText('Upload Photos') as HTMLInputElement;
    userEvent.upload(uploadPhotos, files);
    expect(uploadPhotos.files).toHaveLength(1);
    expect(uploadPhotos.files[0]).toStrictEqual(files[0]);
    await waitFor(() => getByRole('img'));
    expect(submitButton).toBeEnabled();
  });

  it('should submit Form', () => {});
});
