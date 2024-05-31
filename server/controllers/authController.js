const users = {
    'user@example.com': 'password123' //Replace with your actual data
};

const signIn = (req, res) => {
    const { email, password } = req.body;
    if (users[email] && users[email] === password) {
        return res.json({ success: true, message: 'Sign-in successful!' });
    }
    return res.json({ success: false, message: 'Invalid email or password' });
};

module.exports = {
    signIn,
};