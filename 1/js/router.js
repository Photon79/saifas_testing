Todos.Router.map(function () {
	this.resource('todos', { path: '/' }, function() {
		this.route('active');
		this.route('completed');
	});
});
Todos.TodosRoute = Em.Route.extend({
	model: function () {
    	return this.store.find('todo');
  	}
});
Todos.TodosIndexRoute = Em.Route.extend({
	model: function () {
		return this.modelFor('todos');
	}
});
Todos.TodosActiveRoute = Em.Route.extend({
	model: function() {
		return this.store.filter('todo', function(todo) {
			return !todo.get('isCompleted');
		});
	},
	renderTemplate: function(controller) {
		this.render('todos/index', {controller: controller});
	}
});
Todos.TodosCompletedRoute = Em.Route.extend({
	model: function() {
		return this.store.filter('todo', function(todo) {
			return todo.get('isCompleted');
		});
	},
	renderTemplate: function(controller) {
		this.render('todos/index', {controller: controller});
	}
});