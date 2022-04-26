import User from "../models/user.model.js";

const resolver = {
    getUsers: () => { return User.find() },
    getUser: (args) => { return User.findById(args.id) }
};

export default resolver;
