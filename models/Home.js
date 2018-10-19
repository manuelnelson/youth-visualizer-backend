var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Home = new keystone.List('Home');

Home.add({
	created: { type: Date, default: Date.now, index:true },
	name: { type: String, required:true, default: 'Home'},
	title: {type: String},
	introText: {type: Types.Html, wysiwyg: true},
	example: { type: Types.Relationship, ref: 'Story', many:false}
});


/**
 * Registration
 */
Home.defaultColumns = 'name';
Home.register();
