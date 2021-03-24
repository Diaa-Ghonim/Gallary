import '../styles/globals.scss';
// import '../styles/global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import dynamic from 'next/dynamic';
import Spinner from '../components/Spinner';
// import NProgress from 'nprogress';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { AppProps } from 'next/app';
import Head from '../components/Head';
import { Container } from 'react-bootstrap';
import React from 'react';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head title='' description='' url=''>
        <link rel='stylesheet' href='style.css' />
      </Head>
      <div className='app-wrapper'>
        <Navbar username='Diaa.saleh' />
        <div className='app-container'>
          <Component {...pageProps} />
        </div>
      </div>
    </>
  );
}

export default MyApp;
