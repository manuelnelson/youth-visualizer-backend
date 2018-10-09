import keystone from 'keystone';

/**
* Load highlight and append to req.
*/
function load(req, res, next, id) {
    keystone.list('Highlight').model.findById(id).populate('slides')
    .then((highlight) => {
        req.highlight = highlight;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get highlight
* @returns {Highlight}
*/
function get(req, res) {
    return Promise.resolve(req.highlight);
}

/**
* Get highlight. Same as load but doesn't use middleware pipeline
* @returns {Highlight}
*/
function getById(req, res, next, id) {
    return keystone.list('Highlight').model.findById(id).populate('stories')
        .then(highlight => {
            req.highlight = highlight;
            return highlight;
        })
        .catch(e => next(e));
}

/**
* Checks if user exists with same email as highlight.  If not, it creates a new User with the email provided and a default password. Then creates the Highlight to reside in the new user
* @returns {Highlight}
*/
function create(req, res, next) {
    const Highlight = keystone.list('Highlight').model;
    return new Highlight(req.body)
        .save()
        .then(savedHighlight => savedHighlight)
        .catch(e => next(e));
}

/**
* Will update the db Highlight (req.highlight), with the parameters passed in (req.body.highlight)
* @returns {Highlight}
*/
function update(req, res, next) {
    for(let prop in req.body.highlight){
        req.highlight[prop] = req.body.highlight[prop];
    }
    return req.highlight.save()
    .then(savedHighlight => savedHighlight)
    .catch(e => next(e));
}

/**
* Get highlight list.
* @property {number} req.query.skip - Number of highlights to be skipped.
* @property {number} req.query.limit - Limit number of highlights to be returned.
* @returns {Highlight[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;

    let Highlight = keystone.list('Highlight').model;
    delete req.query.limit;
    delete req.query.skip;    
    return Highlight.find(req.query).skip(parseInt(skip)).limit(parseInt(limit))
    .then(highlights => highlights)
    .catch(e => next(e));
}

/**
* Delete highlight.
* @returns {Highlight}
*/
function remove(req, res, next) {
    const highlight = req.highlight;
    return highlight.remove()
    .then(deletedHighlight => deletedHighlight)
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, getById };
