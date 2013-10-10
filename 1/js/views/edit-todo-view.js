Todos.EditTodoView = Em.TextField.extend({
	didInsertElement: function () {
	this.$().focus();
	}
});
Em.Handlebars.helper('edit-todo', Todos.EditTodoView);