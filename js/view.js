import PostMasterGeneral from '/js/lib/PostMasterGeneral.js'
const courier = new PostMasterGeneral.Courier();

console.log('hello from view!', self);

courier.onMessage(async (data) => {
    console.log({data});
    return data+'bar'
})
