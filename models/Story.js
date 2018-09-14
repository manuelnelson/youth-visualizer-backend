var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Story = new keystone.List('Story');

Story.add({
	created: { type: Date, default: Date.now, index:true },
	slides: { type: Types.Relationship, ref: 'Slide', many:true}
});

/**
 * Registration
 */
Story.defaultColumns = 'created';
Story.register();
