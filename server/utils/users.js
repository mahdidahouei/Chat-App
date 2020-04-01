// [{
//     id: 'lsfdhanrhsjkfhb',
//     name: 'Mahdi',
//     room: 'Fucking room'
// }]

class Users{
    constructor(){
        this.users = [];
    }

    addUser(id, name, room){
        let user = {id, name, room};
        this.users.push(user);
        return user;
    }

    getUserList(room){
        let users = this.users.filter((user) => user.room === room);
        let namesArray = users.map((user) => user.name);
        return namesArray;
    }

    getUserById(id){
        return this.users.filter((user) => user.id === id)[0];
    }

    removeUser(id){
        let user = this.getUserById(id);
        
        if(user){
            this.users = this.users.filter((user) => user.id !== id);
        }

        return user;
    }
}

module.exports = {Users};