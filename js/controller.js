import PostMasterGeneral from '/js/lib/PostMasterGeneral.js'

const model = new Worker('js/model.js', { type: 'module' });
const view = new Worker('js/view.js', { type: 'module' });

const master = new PostMasterGeneral(view);

setTimeout(() => {
    master.post('foo1').then(response => console.log({ response }))
})
master.post('foo2').then(response => console.log({ response }))
