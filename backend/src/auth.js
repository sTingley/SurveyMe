
const auth = async (application, user, token) => {

    /**********************************************************************
    Implementation TBD: Could require user ID and token so we dont have to
    do repeated authentication
    ***********************************************************************/

    application.endpoints.post('api/v1/authenticate', (req, res) => {
        if (!req.body) {
            res.status(404).send({ message: 'must input a request.body' })
        }
    })

    console.log('here we will authenticate .. sometime .. ');

}

module.exports = { auth }