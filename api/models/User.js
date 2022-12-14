/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
    //  ╔═╗╦═╗╦╔╦╗╦╔╦╗╦╦  ╦╔═╗╔═╗
    //  ╠═╝╠╦╝║║║║║ ║ ║╚╗╔╝║╣ ╚═╗
    //  ╩  ╩╚═╩╩ ╩╩ ╩ ╩ ╚╝ ╚═╝╚═╝
    fullName: {
      type: 'string',
      description: "Users's Full Name",
    },

    emailAddress: {
      type: 'string',
      required: true,
      isEmail: true,
      unique: true,
      example: 'john@123.com',
      description: "User's Emaill Address",
    },

    password: {
      type: 'string',
      maxLength: 200,
      example: 'passwordLol',
      minLength: 8,
      required: true,
    },

    accountStatus: {
      type: 'string',
      isIn: ['unverified', 'verified'],
    },
    accountType: {
      type: 'string',
      isIn: ['free', 'paid'],
    },

    emailProofToken: {
      type: 'string',
      description:
        'A pseudorandom, probabilistically-unique token for use in our account verification emails.',
    },

    emailProofTokenExpiresAt: {
      type: 'number',
      description:
        "A JS timestamp (epoch ms) representing the moment when this user's `emailProofToken` will expire (or 0 if the user currently has no such token).",
      example: 1502844074211,
    },

    //  ╔═╗╔╦╗╔╗ ╔═╗╔╦╗╔═╗
    //  ║╣ ║║║╠╩╗║╣  ║║╚═╗
    //  ╚═╝╩ ╩╚═╝╚═╝═╩╝╚═╝

    //  ╔═╗╔═╗╔═╗╔═╗╔═╗╦╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
    //  ╠═╣╚═╗╚═╗║ ║║  ║╠═╣ ║ ║║ ║║║║╚═╗
    //  ╩ ╩╚═╝╚═╝╚═╝╚═╝╩╩ ╩ ╩ ╩╚═╝╝╚╝╚═╝

    services: {
      description: 'Services this user uses on the platform',
      via: 'qrUser',
      collection: 'qr',
    },
  },
}
