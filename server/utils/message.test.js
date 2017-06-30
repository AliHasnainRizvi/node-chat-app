var expect = require('expect')
var {generateMessage} = require ('./message'    )
describe('generateMessage', ()=> {
    it('should generate correct message obj', ()=> {
        var from = 'ali'
        var text = 'Text'
        var message = generateMessage(from, text)
        expect(message.createdAt).toBeA('number')
        expect(message).toInclude({from, text})
    })
})