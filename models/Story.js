var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Story = new keystone.List('Story');

Story.add({
	created: { type: Date, default: Date.now, index:true },
	slides: { type: Types.Relationship, ref: 'Slide', many:true},
	userName: {type: Types.Name},
	userPosition: {type: String},
	userEmail: {type: String},
	name: {type: String}
});

Story.schema.post('remove', function(next) {
	if(this.slides && this.slides.length > 0){
		this.slides.forEach(slide => {
			keystone.list('Slide').model.findById(slide)
				.remove(function(err) {
					// slide has been deleted
					console.log(`slide with id ${slide} has been removed`)
				});
		});
	}
});

/**
 * Registration
 */
Story.defaultColumns = 'created,name';
Story.register();
