const User = require('../models/user.model');


class UserService {

    async getUser(id){
        const user = User.findOne({id});
        return user;
    }

    async findUserByEmail(email){
        const user = await User.findOne({email});
        return user;
    }
    
    async findUserById(id){
        const user = await User.findOneById(id);
        return user;
    }

    async createUser(newUser){
        const user = await User.create(newUser);
        return user;
    }

    async getUsers(){
        const users = await User.find({});
        return users;
    }


}
 
module.exports = new UserService;




