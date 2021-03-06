App.Router.map(function() {
    this.route('home'),
    this.resource('calendar', {path: 'calendar/:year/:month/:day'})
});

App.CalendarRoute = Em.Route.extend({
  model: function (params) {
    console.log(params);
    return {
      model: this.store.find(App.Month, {"month": parseInt(params.month), "year": parseInt(params.year)}),
      params: params
    }
  },
  setupController: function(controller, model) {
    controller.set('content', model);
  }
});