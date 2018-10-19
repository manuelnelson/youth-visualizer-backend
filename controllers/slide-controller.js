var keystone = require('keystone');

/**
* Load slide and append to req.
*/
function load(req, res, next, id) {
    keystone.list('Slide').model.findById(id)
    .then((slide) => {
        req.slide = slide;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get slide
* @returns {Slide}
*/
function get(req, res) {
    return Promise.resolve(req.slide);
}

/**
* Get slide. Same as load but doesn't use middleware pipeline
* @returns {Slide}
*/
function getById(req, res, next, id) {
    return keystone.list('Slide').model.findById(id)
        .then(slide => {
            req.slide = slide;
            return slide;
        })
        .catch(e => next(e));
}

/**
* Checks if user exists with same email as slide.  If not, it creates a new User with the email provided and a default password. Then creates the Slide to reside in the new user
* @returns {Slide}
*/
function create(req, res, next) {
    const Slide = keystone.list('Slide').model;
    return new Slide(req.body)
        .save()
        .then(savedSlide => savedSlide)
        .catch(e => next(e));
}

/**
* Will update the db Slide (req.slide), with the parameters passed in (req.body.slide)
* @returns {Slide}
*/
function update(req, res, next) {
    const Slide = keystone.list('Slide');
    console.log(Object.keys(req.body));
    req.body.countries = req.body.countries.toString();
    // for(let prop in req.body.slide){
    //     req.slide[prop] = req.body.slide[prop];
    // }
    
    return new Promise((resolve) => {
        Slide.updateItem(req.slide,req.body, {fields: Object.keys(req.body)}, (slide) => {
            resolve(slide);
        });
    }) 
}

/**
* Get slide list.
* @property {number} req.query.skip - Number of slides to be skipped.
* @property {number} req.query.limit - Limit number of slides to be returned.
* @returns {Slide[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;

    let Slide = keystone.list('Slide').model;
    delete req.query.limit;
    delete req.query.skip;    
    return Slide.find(req.query).skip(parseInt(skip)).limit(parseInt(limit))
    //.populate({path:'services', populate:{ path: 'serviceSections'}})
    .populate('stats teams management clientImages')
    .then(slides => slides)
    .catch(e => next(e));
}

/**
* Delete slide.
* @returns {Slide}
*/
function remove(req, res, next) {
    const slide = req.slide;
    return slide.remove()
    .then(deletedSlide => deletedSlide)
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, getById };
