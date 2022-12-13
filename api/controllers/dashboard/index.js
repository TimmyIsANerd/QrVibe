module.exports = {
    friendlyName: 'Dashboard',

    description : 'Dashboard Page',

    inputs:{},

    exits:{},

    fn: async function(){
        return sails.inertia.render('dashboard/index',{
            name:'QR Vibe | Dashboard'
        })
    }
}