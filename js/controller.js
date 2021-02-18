import PostMaster from '/js/lib/PostMaster.js'

const model = new Worker('js/model.js', { type: 'module' });
const view = new Worker('js/view.js', { type: 'module' });

const master = new PostMaster(view);


master.subscribe('foo', (data) => { console.log('bar', { data }) });
console.log(master)
master.emit('foo', { fizz: "buzz" })