import keystone from 'keystone';

/**
* Load story and append to req.
*/
function load(req, res, next, id) {
    keystone.list('Story').model.findById(id).populate('slides')
    .then((story) => {
        req.story = story;
        return next();
    })
    .catch(e => next(e));
}

/**
* Get story
* @returns {Story}
*/
function get(req, res) {
    return Promise.resolve(req.story);
}

/**
* Get story. Same as load but doesn't use middleware pipeline
* @returns {Story}
*/
function getById(req, res, next, id) {
    return keystone.list('Story').model.findById(id).populate('slides')
        .then(story => {
            req.story = story;
            return story;
        })
        .catch(e => next(e));
}

/**
* Checks if user exists with same email as story.  If not, it creates a new User with the email provided and a default password. Then creates the Story to reside in the new user
* @returns {Story}
*/
function create(req, res, next) {
    const Story = keystone.list('Story').model;
    return new Story(req.body)
        .save()
        .then(savedStory => savedStory)
        .catch(e => next(e));
}

/**
* Will update the db Story (req.story), with the parameters passed in (req.body.story)
* @returns {Story}
*/
function update(req, res, next) {
    for(let prop in req.body.story){
        req.story[prop] = req.body.story[prop];
    }
    return req.story.save()
    .then(savedStory => savedStory)
    .catch(e => next(e));
}

/**
* Get story list.
* @property {number} req.query.skip - Number of storys to be skipped.
* @property {number} req.query.limit - Limit number of storys to be returned.
* @returns {Story[]}
*/
function list(req, res, next) {
    const { limit = 20, skip = 0 } = req.query;

    let Story = keystone.list('Story').model;
    delete req.query.limit;
    delete req.query.skip;    
    return Story.find(req.query).skip(parseInt(skip)).limit(parseInt(limit))
    //.populate({path:'services', populate:{ path: 'serviceSections'}})
    .populate('stats teams management clientImages')
    .then(storys => storys)
    .catch(e => next(e));
}

/**
* Delete story.
* @returns {Story}
*/
function remove(req, res, next) {
    const story = req.story;
    return story.remove()
    .then(deletedStory => deletedStory)
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove, getById };
