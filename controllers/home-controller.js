import keystone from 'keystone';

/**
* Load home and append to req.
*/
function load(req, res, next, id) {
    keystone.list('Home').model.findById(id).populate('slides')
    .then((home) => {
        req.home = home;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get home
* @returns {Home}
*/
function get(req, res) {
    return Promise.resolve(req.home);
}

/**
* Get home. Same as load but doesn't use middleware pipeline
* @returns {Home}
*/
function getById(req, res, next, id) {
    return keystone.list('Home').model.findById(id).populate('slides')
        .then(home => {
            req.home = home;
            return home;
        })
        .catch(e => next(e));
}

/**
* Checks if user exists with same email as home.  If not, it creates a new User with the email provided and a default password. Then creates the Home to reside in the new user
* @returns {Home}
*/
function create(req, res, next) {
    const Home = keystone.list('Home').model;
    return new Home(req.body)
        .save()
        .then(savedHome => savedHome)
        .catch(e => next(e));
}

/**
* Will update the db Home (req.home), with the parameters passed in (req.body.home)
* @returns {Home}
*/
function update(req, res, next) {
    for(let prop in req.body.home){
        req.home[prop] = req.body.home[prop];
    }
    return req.home.save()
    .then(savedHome => savedHome)
    .catch(e => next(e));
}

/**
* Get home list.
* @property {number} req.query.skip - Number of homes to be skipped.
* @property {number} req.query.limit - Limit number of homes to be returned.
* @returns {Home[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;

    let Home = keystone.list('Home').model;
    delete req.query.limit;
    delete req.query.skip;    
    return Home.find(req.query).skip(parseInt(skip)).limit(parseInt(limit))
    .then(homes => homes)
    .catch(e => next(e));
}

/**
* Delete home.
* @returns {Home}
*/
function remove(req, res, next) {
    const home = req.home;
    return home.remove()
    .then(deletedHome => deletedHome)
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, getById };
