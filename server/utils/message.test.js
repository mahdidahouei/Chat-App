let expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', function(){
    it('generates correct message object', function(){
        let from = "Mahdi",
            text = "hi",
            message = generateMessage(from, text);
        
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,text});
    });
});

describe('generate location message', function(){
    it('generates correct location object', function(){
        let from = 'tooraj',
            lat = 69, 
            lng = 85,
            url = `https://www.google.com/maps?q=${lat}, ${lng}`,
            message = generateLocationMessage(from,lat,lng);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from,url})
    });
})