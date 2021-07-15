import { ClientScope } from './lib/BetterWorker.js';
import './lib/ReactiveView.js';

const workerButton = document.getElementById('workerbutton');
const view = new ClientScope('js/worker.js', { type: 'module' });

workerButton.onclick = () => {
  view.execute('ping');
};

view.on('ping', (responseMessage) => {
  alert(`Worker says "${responseMessage}"`);
});

const blog = document.getElementById('blog');
const blogData = {
  list: ['one', 'two', 'three'],
  link: 'https://google.com',
  linkText: 'Google',
  palette: {
    primary: 'red',
  },
  title: 'Example Title',
  body:
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque, vero corporis magnam adipisci quis veniam aliquam modi ut esse perspiciatis, veritatis in sit iste numquam suscipit eum repellat voluptate distinctio.',
};
blog.setDataSource(blogData);
