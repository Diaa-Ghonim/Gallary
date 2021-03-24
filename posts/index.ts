import '../customHooks/decorator';

let paths = [
  {
    params: {
      id: '1',
    },
  },
];

let posts = [
  { id: '1', title: 'hello', content: 'hello world' },
  { id: '2', title: 'hi', content: 'good night' },
  { id: '3', title: 'welcome', content: 'everythings ok' },
  { id: '4', title: 'ok', content: 'iam done!' },
];
export function getAllPostsIds() {
  return paths;
}

export function getPostById(id) {
  return posts.find((post) => post.id === id);
}
