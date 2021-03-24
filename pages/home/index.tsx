import 'regenerator-runtime';
import Head from '../../components/Head';
import Spinner from '../../components/Spinner';
import Layout, { siteTitle } from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';
import { Jumbotron, Button } from 'react-bootstrap';
interface Props {
  title: string;
  content: string;
}

export default function Home({ title, content, date }: Props): JSX.Element {
  let description = 'this is home page to this site';
  return (
    // <Layout home>
    <>
      <Head description={description} title={siteTitle} url=''></Head>
      <section className={utilStyles.headingMd}>
        <Jumbotron>
          <h1>Hello, world!</h1>
          <p>
            This is a simple hero unit, a simple jumbotron-style component for
            calling extra attention to featured content or information.
          </p>
          <div>
            <p>
              <b>{title}</b>
            </p>
            <p>
              <big>
                <i>{content}</i>
              </big>
            </p>
            <p>
              <big>
                <i>{date}</i>
              </big>
            </p>
          </div>
          <p>
            <Button variant='primary'>Learn more</Button>
          </p>
        </Jumbotron>
      </section>
    </>
    // </Layout>
  );
}

/**
 * in development will run on every request
 * but in production will run oly once at build time
 */
/*
export async function getStaticProps() {
  // detch data here and pass it as props to home component
  console.log('detch data here and pass it as props to home component');
  let getd = function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ title: 'Cairo', content: 'hello from getStaticProps.' });
      }, 10000);
    });
  };
  let data = await getd();
  console.log(data);
  return {
    props: data,
  };
}
*/
/**
 * run on every request at request time
 */
export async function getServerSideProps(context) {
  console.log('detch data here and pass it as props to home component');
  let getd = function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          title: 'Cairo',
          content: 'hello from getStaticProps.',
          date: new Date().toISOString(),
        });
      }, 1000);
    });
  };
  let data = await getd();
  console.log(data);
  return {
    props: data,
  };
}

/**
 * If you do not need to pre-render the data, you can also use the following strategy (called 
 * Client-side Rendering):
 * generate static page at build time and then send request by js after js is loaded
 * and then populate the data in your page
 * This approach works well for user dashboard pages, for example. Because a dashboard is a
 * private, user-specific page, SEO is not relevant, 


 */
/**
 * import useSWR from 'swr'
 * use this hook with fetching data because it make improvements on data as caching revaildtion
 */
