module.exports = {


  friendlyName: 'Get user id',


  description: '',


  inputs: {

  },


  exits: {

    success: {
      outputFriendlyName: 'User id',
    },

  },


  fn: async function (inputs) {

    // Get user id.
    var userId = this.req.session.userId;
    // TODO

    // Send back the result through the success exit.
    return userId;

  }


};

