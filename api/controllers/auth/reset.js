module.exports = {
    friendlyName:'Reset Password',

    description:'Reset Password Form',

    fn: async function(){
        return sails.inertia.render('auth/reset')
    }
}