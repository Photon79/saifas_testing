window.App = Em.Application.create({
  title: 'Ember Datepicker Testing'
});

// App.ApplicationAdapter = DS.FixtureAdapter.extend({
// 	simulateRemoteResponse: false
// });

// App.ApplicationAdapter = DS.LSAdapter.extend({
// 	namespace: 'Calendar'
// })

App.Datepicker = Em.TextField.extend({
	click: function() {
		$('#popover').show();
		var date = new Date(this.value);
		var month = date.getMonth()+1;
		var year = date.getFullYear();
		var route = '#/calendar/'
		window.location.href= route + year + '/' + month + '/' + date.getDate();
	},
	valueBinding: 'App.DateValue.value'
});

App.DateValue = Em.Object.create({
    value: moment().format('YYYY-MM-DD')
});

Ember.Handlebars.registerBoundHelper('month', function(currentMonth) {
  return moment().month(currentMonth-1).format('MMMM');
});