import PostMaster from '/js/lib/PostMaster.js'
const courier = new PostMaster.Courier();

console.log('hello from view!', self);

courier.onMessage(async (data) => {
    console.log({data});
    return data+'bar'
})
