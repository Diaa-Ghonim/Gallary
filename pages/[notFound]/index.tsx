import { useRouter } from 'next/router';
import Link from 'next/link';

import { useState } from 'react';
import {
  Button,
  Container,
  Alert,
  Toast,
  ToastHeader,
  ToastBody,
} from 'react-bootstrap';

interface Props {}

export default function NotFound({}: Props): JSX {
  let [show, toggleShow] = useState(false);

  return (
    <Container className='p-3 m-auto'>
      <Alert show={show} variant='danger'>
        <Alert.Heading>Oh, You Get Error Page</Alert.Heading>
        <p>This Page Not Found</p>
      </Alert>
      {!show && (
        <Button onClick={() => toggleShow(true)}>showMoreAboutError</Button>
      )}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <ToastHeader>Hello, Iam a Toast Headre</ToastHeader>
        <ToastBody>I Recommend To Go To Home Page</ToastBody>
        <Link href='/home'>
          <Button variant='link'> Go To Home </Button>
        </Link>
      </Toast>
    </Container>
  );
}
