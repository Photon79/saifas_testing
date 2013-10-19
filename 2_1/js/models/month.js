App.Months = [];

App.Month = Em.Object.extend({
  	year: null, 
  	month: null,
  	monthName: null,
  	weeks: []
});

App.Week = Em.Object.extend({
	days: []
});

App.Day = Em.Object.extend({
	day: null,
	month: null,
	year: null,
	isSelected: function() {
		var date = new Date(this.year, this.month - 1, this.day);
		return (Em.get('App.DateValue.value') == moment(date).format('YYYY-MM-DD'));
	}.property('isSelected'),
	isCurrent: function() {
		var date = new Date();
		var el_date = new Date(this.year, this.month - 1, this.day);
		return (moment(date).format('YYYY-MM-DD') == moment(el_date).format('YYYY-MM-DD'));
	}.property('isCurrent')
});

// App.Month.FIXTURES = [];
// App.Week.FIXTURES = [];
// App.Day.FIXTURES = [];