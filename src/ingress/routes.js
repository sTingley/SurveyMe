/**********************************************************************
Current routes exposed/supported:
-GetSurveys, addSurvey, editSurvey, deleteSurvey
***********************************************************************/

const expose = async (application, db) => {

    /**********************************************************************
    ***********************************************************************/
    application.endpoints.get('api/v1/getSurveys', (req, res) => {

        if (!req.body.survey) {
            res.status(404).send({ message: 'must input a request.body' })
        }
    })

    /**********************************************************************
    ***********************************************************************/
    application.endpoints.post('/api/v1/addSurvey', (req, res) => {

        if (!req.body.ID) { //TODO: Pure functions to check for req values to remove duplicate code
            res.status(404).send({ message: 'must input a request.body.ID' })
        }

        //TODO-Check if the survey exists before adding it
        //TODO- Determine collection(s)
        //const collection = db.collection('survey');

    });

    /**********************************************************************
    ***********************************************************************/
    application.endpoints.post('/api/v1/editSurvey/:id', (req, res) => {

        if (!req.body.survey) { //TODO: Pure functions to check for req values to remove duplicate code
            res.status(404).send({ message: 'must input a request.body.ID' })
        }

    });

    /**********************************************************************
    ***********************************************************************/
    application.endpoints.post('api/v1/deleteSurvey/:id', (req, res) => {

        if (!req.body.survey) {
            res.status(404).send({ message: 'must input a request.body' })
        }
    })


}

module.exports = { expose }

