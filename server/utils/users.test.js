const expect = require('expect');
const {Users} = require('./users');

describe('Users', ()=>{


    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: "1",
            name: "ali",
            room: "The Office Fans",
        },{
            id: "2",
            name: "tooraj",
            room: "Scrubs Fans",
        },{
            id: "3",
            name: "mammad",
            room: "The Office Fans",
        },]
    });

    it('adds new user', () => {
        let users = new Users();
        let user = {
            id: "sdfsdf",
            name: "Mahdi",
            room: "The Office Fans",
        };

        let reUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('returns names for the office fans', () => {
        let userList = users.getUserList('The Office Fans')
        
        expect(userList).toEqual(['ali', 'mammad']);
    });

    it('returns names for Scrubs Fans', () => {
        let userList = users.getUserList('Scrubs Fans')
        
        expect(userList).toEqual(['tooraj']);
    });


    it('finds user by id', () => {
        let userID = '2', user = users.getUserById(userID);
 
        expect(user.id).toBe(userID);
    });

    it('doesn\'t find user by id', () => {
        let userID = '69',
            user = users.getUserById(userID);
 
        expect(user).toBeUndefined();
    });

    it('removes a user', () => {
        let userID = '3',
            user = users.removeUser(userID);

        expect(user.id).toBe(userID);
        expect(users.users.length).toBe(2);
    });

    it('doesn\'t remove a user', () => {
        let userID = '85',
            user = users.removeUser(userID);

        expect(user).toBeUndefined();
        expect(users.users.length).toBe(3);
    });
});