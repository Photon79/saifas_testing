App.Router.map(function() {
    this.resource('calendar', {path: 'calendar/:year/:month/:day'})
});

App.CalendarRoute = Em.Route.extend({
  model: function (params) {
    return {
      model: null,
      params: params,
      no_change: false
    }
  },
  setupController: function(controller, model) {
    controller.set('content', model);
  }
});