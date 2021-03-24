import 'regenerator-runtime';
import { useRouter } from 'next/router';
import { getAllPostsIds, getPostById } from '../../posts';

type Props = {
  post: { id: string; title: string; content: string };
  error: null | string;
};

export default function ({ post, error }: Props): JSX.Element {
  // let {
  //   query: { pid },
  // } = useRouter();
  console.log({ post, error });
  if (error) return <div>{error}</div>;
  return (
    <div>
      <div>Post id : {post.id}</div>
      <div>Post title : {post.title}</div>
      <div>Post content :: {post.content}</div>
    </div>
  );
}

export async function getStaticPaths() {
  console.log('run now');
  let paths = getAllPostsIds();
  console.log(paths);
  return {
    paths,
    fallback: 'blocking',
  };
}
export async function getStaticProps({ params }) {
  // detch data here and pass it as props to home component
  console.log('detch data here and pass it as props to home component');
  let getd = function () {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(getPostById(params.id));
      }, 1000);
    });
  };
  let post = await getd();
  let error = null;
  if (post === undefined) {
    error = 'this post not exist';
  }
  console.log(post);
  return {
    props: { post, error },
  };
}
