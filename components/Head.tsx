import NextHead from 'next/head';
import React, { PropsWithChildren } from 'react';

interface Props {
  title: string;
  description: string;
  url: string;
}

let defaultDescription = 'insta website';
let defaultOGURL = 'your website url';

export default function Head({
  title,
  description,
  url,
  children,
}: PropsWithChildren<Props>): JSX.Element {
  return (
    <NextHead>
      {/* Here i suppose add content tom meta tags and titles and keywords 
      to make site good with seo  */}

      <meta charSet='UTF-8' />
      <title> {title || ''}</title>
      <meta name='description' content={description || defaultDescription} />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <meta property='og:url' content={url || defaultOGURL} />
      <meta property='og:title' content={title || ''} />
      <link rel='apple-touch-icon' sizes='180x180' href='favicon.png' />
      {/* <link rel="preconnect" href="https://fonts.gstatic.com"> */}
      <link
        href='https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap'
        rel='stylesheet'
      ></link>
    </NextHead>
  );
}
