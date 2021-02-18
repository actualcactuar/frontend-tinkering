import { Courier } from '/js/lib/PostMaster.js'

const courier = new Courier();

courier.default((data) => {
    console.log(data);
    return "reached default message handler"
})

courier.on('foo', () => {
    return 'piupau'
})


console.log('hello from view!', self);
