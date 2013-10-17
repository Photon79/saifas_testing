DS.Store.extend({
  revision: 12
});

App.Month = DS.Model.extend({
  	year: DS.attr('number'), 
  	month: DS.attr('number'),
  	monthName: DS.attr('string'),
  	weeks: DS.hasMany(App.Week, {inverse: 'month'})
});

App.Week = DS.Model.extend({
	num: DS.attr('number'),
	month: DS.belongsTo(App.Month, {inverse: 'weeks'}),
	days: DS.hasMany(App.Day, {inverse: 'week'})
});

App.Day = DS.Model.extend({
	num: DS.attr('number'),
	week: DS.belongsTo(App.Week, {inverse: 'days'}),
	isSelected: function() {
		var date = new Date(this.get('week').get('month').get('year'), this.get('week').get('month').get('month') - 1, this.get('num'));
		return (Em.get('App.DateValue.value') == moment(date).format('YYYY-MM-DD'));
	}.property('isSelected'),
	isCurrent: function() {
		var date = new Date();
		var el_date = new Date(this.get('week').get('month').get('year'), this.get('week').get('month').get('month') - 1, this.get('num'));
		return (moment(date).format('YYYY-MM-DD') == moment(el_date).format('YYYY-MM-DD'));
	}.property('isCurrent')
});

App.Month.FIXTURES = [];
App.Week.FIXTURES = [];
App.Day.FIXTURES = [];