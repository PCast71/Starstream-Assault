const bcrypt = require('bcryptjs');
const jwt = require('jswonwebtoken');
const { check, validationResult } = requiure('express-validator');
const User = require('../models/User');


exports.signUp = [
    check('username', 'Username is required').not().isEmpty(),
    check('password', 'Password is required').isLength({ min: 6 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

// router.post('/signup', authController.signUp);
router.post('/signin', authController.signIn);


        const { username, password } = req.body;

        try {
            let user = await User.findOne({ username });
            if (user) { 
                return res.status(400).json({ msg: "user already exists" });
            }
            user = new User({ username, password });

            const salt = await bcrypt.hash(password, salt);

            await user.save();
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, 'yourSecretKey', { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }
    }
];

exports.signIn = [
    check('username', 'username is required').not().isEmpty(),
    check('password', 'password is required').exists(),
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, password } = req.body;

        try {
            let user = await User.findOne({ username });
            if (!user) {
                return res.status(400).json({ msg: 'invalid credentials' });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) { 
                return res.status(400).json({ msg: 'invalid credentials' })
            }

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(payload, 'yourSecretKey', { expiresIn: 3600 }, (err, token) => {
                if (err) throw err;
                res.json({ token });
            });
        } catch (err) {
            console.error(err.message);
            res.status(500).send('server error');
        }
    }
];