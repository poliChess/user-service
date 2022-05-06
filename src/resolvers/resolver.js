import User from "../models/user.model.js";
import { statusBad, statusGood, userResponse } from "../utils.js";

const resolver = {
    users: async () => { return await User.find() },
    user: async (args) => { return await User.findById(args.id) },
    
    findUser: async (args) => {
        // The username is unique (see user.model.js)
        const user = await User.findOne({ username: args.username });
        return user;
    },

    findUsers: async (args) => {
        const users = [];

        for (const username of args.usernames) {
            const user = await resolver.findUser({ username: username });
            if (user) users.push(user);
        }

        return users;
    },

    authenticate: async (args) => {
        const { username, password } =  args;

        try {
            const user = await resolver.findUser({ username: username });
            if (!user) return statusBad('Incorrect username')
            
            // TODO: password hashing
            if (user.password !== password) return statusBad('Incorrect password')
            
            return userResponse(user);

        } catch(err) { return statusBad(err.message) }
    },

    addUser: async (args) => {
        const { mail, username, password } = args;

        const newUser = new User({ mail, username, password });

        try {
            await newUser.save();
            return statusGood;
        } catch (err) { return statusBad(err.message) }
    },

    updateUser: async (args) => {
        const { id, mail, username, password, playedGames, wonGames, rating } = args;

        try {
            const user = await User.findByIdAndUpdate(id, {
                mail: mail,
                username: username,
                password: password,
                playedGames: playedGames,
                wonGames: wonGames,
                rating: rating
              }, { new: true });
            return userResponse(user);
        } catch (err) { return statusBad(err.message) }
    },

    deleteUser: async (args) => {
        const id = args.id;

        try {
            await User.findByIdAndDelete(id);
            return statusGood;
        } catch(err) { return statusBad(err.message) }
    }
};

export default resolver;
