import { Spinner } from 'react-bootstrap';
interface Props {}

export default function (props: Props): JSX.Element {
  return (
    <Spinner animation='border' role='status'>
      <span className='sr-only'>Loading...</span>
    </Spinner>
  );
}
