var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var Slide = new keystone.List('Slide');

Slide.add({
	url: { type: String, index: true },
	graphType: { type: String},
	xAxisLabel: { type: String},
	yAxisLabel: { type: String},
	showLinearRegression: { type: Boolean},
	title: { type: String},
	text: { type: Types.Html, wysiwyg: true},
	countries: { type: String},
	selectedGoalUrl: { type: String},
	index: { type: Number },
	active: {type: Boolean, default:false},
});


/**
 * Registration
 */
Slide.defaultColumns = 'title';
Slide.register();
