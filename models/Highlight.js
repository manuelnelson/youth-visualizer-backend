var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Highlight = new keystone.List('Highlight');

Highlight.add({
	created: { type: Date, default: Date.now, index:true },
	stories: { type: Types.Relationship, ref: 'Story', many:true}
});


/**
 * Registration
 */
Highlight.defaultColumns = 'name';
Highlight.register();
