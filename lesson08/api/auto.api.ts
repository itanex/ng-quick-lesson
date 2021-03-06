import * as express from 'express';

import * as Autos from '../data/auto.db';

let router = express.Router();

/**
 * Read ALL resources (cRud)
 * 
 * Get all autos
 */
router.get('/', (request, response) => {
    return response.status(200).json(Autos.getAll());
});

/**
 * Read Specific resource (cRud)
 * 
 * Get auto by ID
 */
router.get('/:id', (request, response) => {
    // Need to validate input for security
    // Validation of data from user prevents SQL Injection Attacks
    let id = request.params.id;

    let record = Autos.getById(id);

    if (record) {
        return response.status(200)
            .json(record)
            .end();
    }

    return response.status(404)
        .json('Auto Not Found')
        .end();
});

/**
 * ADD a resource (Crud)
 * 
 * Add a new auto to the list
 */
router.post('/', (request, response) => {
    // Need to validate input for security
    // Validation of data from user prevents SQL Injection Attacks
    let auto = request.body;

    // save auto in collection
    auto = Autos.addAuto(auto);

    return response.status(201)
        .header('Location', `api/autos/${auto.id}`)
        .json(auto);
});

/**
 * UPDATE Specific resource (crUd)
 * 
 * Update specific auto by ID
 */
router.put('/:id', (request, response) => {
    // Need to validate input for security
    // Validation of data from user prevents SQL Injection Attacks
    let id = parseInt(request.params.id);
    let auto = request.body;

    if (Autos.updateAuto(id, auto)) {
        return response.status(204) // 204 - No Content
            .end();
    }

    return response.status(404)
        .json('Auto Not Found')
        .end();
});



/**
 * DELETE Specific resource (cruD)
 * 
 * DELETE specific auto by ID
 */
router.delete('/:id', (request, response) => {
    // Need to validate input for security
    // Validation of data from user prevents SQL Injection Attacks
    let id = request.params.id;

    if (Autos.deleteAuto(id)) {
        return response.status(204) // 204 - No Content
            .end();
    }

    return response.status(404)
        .json('Auto Not Found')
        .end();
});


export default router;