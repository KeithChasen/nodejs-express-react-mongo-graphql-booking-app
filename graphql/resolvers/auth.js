const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../../models/user')

module.exports = {
    createUser: async args => {
        try {
            const user = User.findOne({
                email: args.userInput.email
            })
            if (user) {
                throw new Error('User already exists')
            }

            const hashedPassword = await bcrypt
                .hash(args.userInput.password, 12)

            const newUser = new User({
                email: args.userInput.email,
                password: hashedPassword
            })

            const result = await newUser.save()

            return {
                ...result._doc,
                password: null,
                _id: result.id
            }
        } catch(err) {
            throw err
        }
    },
    login: async ({ email, password }) =>  {
        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error('User does not exist')
        }
        const isEqual = await bcrypt.compare(password, user.password)
        if (!isEqual) {
            throw new Error('Password is incorrect')
        }
        const token = jwt.sign({userId: user.id, email: user.email}, 'supersecretkey', {
            expiresIn: '1h'
        })
        return { userId: user.id, token: token, tokenExpiration: 1}
    }
}