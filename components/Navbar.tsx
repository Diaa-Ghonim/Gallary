import { useRouter, Router } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useWindowWidth } from '../customHooks/useWindowWidth';
import { useMediaQuery } from '../customHooks/useMedia';

import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Container,
} from 'react-bootstrap';
import Link from 'next/link';

interface Props {
  username: string;
}

export default function ({ username }: Props): JSX.Element {
  let router = useRouter();
  // let width = useWindowWidth();
  let { isMatchSmallBreakPoint } = useMediaQuery();
  console.log(isMatchSmallBreakPoint);
  const [activeKey, setActiveKey] = useState('');
  useEffect(() => {
    setActiveKey(router.asPath);
  }, [router.asPath]);
  return (
    <Navbar
      fixed='top'
      expand='lg'
      bg='white'
      style={{ boxShadow: '0 -2px 9px 0 rgb(0 0 0 / 20%)' }}
    >
      <>
        <Link href='/home'>
          <Navbar.Brand href='/home' className='font-weight-bold'>
            Instagram
          </Navbar.Brand>
        </Link>

        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav
            // variant='tabs'
            defaultActiveKey='/home'
            activeKey={activeKey}
            className='mr-auto'
          >
            <Nav.Item>
              <Link href='/home'>
                <Nav.Link href='/home' className='font-weight-600'>
                  Home
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href='/album/create'>
                <Nav.Link href='/album/create' className='font-weight-600'>
                  Create Album
                </Nav.Link>
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link href={`/profile/${username}`}>
                <Nav.Link
                  href={`/profile/${username}`}
                  className='font-weight-600'
                >
                  {username}
                </Nav.Link>
              </Link>
            </Nav.Item>
            <NavDropdown
              title='Dropdown'
              id='basic-nav-dropdown'
              className='font-weight-600'
            >
              <Link href='/user/setting'>
                <NavDropdown.Item href='/user/setting'>
                  Setting
                </NavDropdown.Item>
              </Link>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl
              type='text'
              placeholder='Search'
              style={{ marginBottom: isMatchSmallBreakPoint ? '5px' : '' }}
              className='mr-sm-2'
            />
            <Button variant='outline-success'>Search</Button>
          </Form>
        </Navbar.Collapse>
      </>
    </Navbar>
  );
}
