const bcrypt = require('bcryptjs')
const User = require('../../models/user')

module.exports = {   
    // Create User Resolver __________________________________________________
    createUser: async args =>{
        try{
            const existingUser = await User.findOne({email:args.userInput.email})
            if(existingUser) throw new Error('User exists already.')

            const hashedPassword =  await bcrypt.hash(args.userInput.password, 12)

            const user = new User({
                email: args.userInput.email,
                password: args.userInput.password
            })

            const result = await user.save()

            return {...result._doc, password:null,  _id: result.id}    

        }catch(err) { throw err }
    },
    // end of User Resolver __________________________________________________
}
