import User from "../models/user.model.js";
import { statusBad, statusGood } from "../utils.js";

const resolver = {
    getUsers: () => { return User.find() },
    getUser: (args) => { return User.findById(args.id) },

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
            await User.findByIdAndUpdate(id, {
                mail: mail,
                username: username,
                password: password,
                playedGames: playedGames,
                wonGames: wonGames,
                rating: rating
            });
            return statusGood;
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
