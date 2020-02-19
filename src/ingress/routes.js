

/******************************************************************************************
Expose all routes here
******************************************************************************************/

const expose = async (application, db) => {

    application.logger.trace('we will need to set up the APIs inside here');
    console.log('exposeeee');


    application.endpoints.post('/api/v1/addSurvey', (req, res) => {
        if (!req.body) {
            res.status(404).send({ message: 'must input a request.body' })
        }
    
        application.logger.info('here we select a collection and insertOne ... ')

        // //TODO-Check if the survey exists before adding it
        // const collection = db.collection('survey');
        // collection.insertOne(req.body.survey, (err, result) => {
        //     assert.equal(err, null);
        //     res.status(200).send({ message: 'stock added' });
        // })
    
    });

    application.endpoints.get('/getSurveys', (req, res) => {

        if(!req.body) {
            res.status(404).send({ message: 'must input a request.body' })
        }
    })

    
}

module.exports = { expose }

