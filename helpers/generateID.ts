export default function () {
  let str = 'hello worild';
  return str
    .toString()
    .repeat(4)
    .substr(5)
    .split(' ')
    .concat([Math.random()])
    .reverse.split();
}
