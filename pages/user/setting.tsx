import { Container, Form, Button, Col, InputGroup } from 'react-bootstrap';
import { useState } from 'react';

interface Props {}

export default function ({}: Props): JSX.Element {
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    console.log(form.checkValidity());

    if (form.checkValidity() === false) {
      console.log('not validate');
      return;
    }

    setValidated(true);
  };

  return (
    <>
      <div></div>
      <div
        style={{
          border: '1px solid #ddd',
          padding: '20px',
          borderRadius: '10px',
          margin: 'auto',
          maxWidth: '800px',
          // width: '80%',
        }}
      >
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col} md='4' controlId='validationCustom01'>
              <Form.Label>First name</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='First name'
                defaultValue='Mark'
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='4' controlId='validationCustom02'>
              <Form.Label>Last name</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='Last name'
                defaultValue='Otto'
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md='4' controlId='validationCustomUsername'>
              <Form.Label>Username</Form.Label>
              <InputGroup hasvalidation>
                <InputGroup.Prepend>
                  <InputGroup.Text id='inputGroupPrepend'>@</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type='text'
                  placeholder='Username'
                  aria-describedby='inputGroupPrepend'
                  required
                />
                <Form.Control.Feedback type='invalid'>
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Form.Row>

          <Form.Row>
            <Form.Group as={Col} controlId='formGridEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control type='email' placeholder='Enter email' required />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control type='password' placeholder='Password' />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId='formGridAddress1'>
            <Form.Label>Address</Form.Label>
            <Form.Control placeholder='1234 Main St' required />
          </Form.Group>

          <Form.Group controlId='formGridAddress2'>
            <Form.Label>Address 2</Form.Label>
            <Form.Control placeholder='Apartment, studio, or floor' />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId='formGridCity'>
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId='formGridState'>
              <Form.Label>State</Form.Label>
              <Form.Control as='select' defaultValue='Choose...'>
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId='formGridZip'>
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form.Row>

          <Form.Control as='select'>
            <option>Default select</option>
          </Form.Control>

          <Form.Group>
            <Form.File
              id='exampleFormControlFile1'
              label='Example file input'
            />
          </Form.Group>

          <Form.Group id='formGridCheckbox'>
            <Form.Check type='checkbox' label='Check me out' />
          </Form.Group>

          <Button variant='primary' type='submit'>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
