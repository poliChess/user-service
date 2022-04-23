import { Router } from "express";
import User from "../models/user.model.js"

const router = Router();

router.route('/').get((req, res) => {
    User.find()
        .then((users) => { return res.json(users) })
        .catch((err) => { return res.status(400).json(`Error: ${err}`) });
});

router.route('/add').post((req, res) => {
    const { mail, username, password } = req.body;

    const newUser = new User({ mail, username, password });

    newUser.save()
        .then(() => { return res.json('User added') })
        .catch((err) => { return res.status(400).json(`Error: ${err}`) });
});

router.route('/update').post(async (req, res) => {
    const { id, mail, username, password, playedGames, wonGames, rating } = req.body;
    if (!id) return res.status(400).json(`Bad request`);

    try {
        const user = await User.findOne({ username: username });
        if (user) return res.status(404).json(`Username already taken`);

        await User.findByIdAndUpdate(id, {
            mail: mail,
            username: username,
            password: password,
            playedGames: playedGames,
            wonGames: wonGames,
            rating: rating
        });
        return res.json('User updated');

    } catch (err) {
        return res.status(400).json(`Error: ${err}`);
    }
});

router.route('/delete').post((req, res) => {
    const id = req.body.id;
    if (!id) return res.status(400).json(`Bad request`);

    User.findByIdAndDelete(id)
        .then(() => { return res.json('User deleted') })
        .catch((err) => { return res.status(404).json(`Error: ${err}`) });
});

export default router;

// TODO: login + auto update last login on login