module.exports = {
  friendlyName: 'Delete QR Code Record',
  exits: {
    success: {
      description: 'Succesffully deleted QR Code record',
      statusCode: 200,
    },
  },
  fn: async function () {
    const { id } = req.params
    if (!id) {
      return res.badRequest()
    }

    const deletedRecord = await QR.destroy({ id }).fetch()

    if (!deletedRecord) {
      return res.recordNotFound()
    }
  },
}
