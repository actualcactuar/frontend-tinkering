import { Courier } from '/js/lib/postMaster.js'
const courier = new Courier();

console.log('hello from view!', self);

courier.onMessage(async (data) => {
    console.log({data});
    return data+'bar'
})
