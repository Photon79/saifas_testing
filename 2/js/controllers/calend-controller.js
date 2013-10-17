App.CalendarController = Em.ObjectController.extend({
  actions: {
    next_month: function() {
      var currentMonth = this.get('model.month');
      var month = parseInt(currentMonth) + 1;
      var year = this.get('model.year');
      if (month > 12) {
        month = 1;
        year = year + 1;
      }
      var day = 1;
      var route = '#/calendar/'
      window.location.href= route + year + '/' + month + '/' + day;
    },
    prev_month: function() {
      var currentMonth = this.get('model.month');
      var month = parseInt(currentMonth) - 1;
      var year = this.get('model.year');
      if (month < 1) {
        month = 12;
        year = year - 1;
      }
      var day = 1;
      var route = '#/calendar/'
      window.location.href= route + year + '/' + month + '/' + day;
    },
    next_year: function() {
      var month = this.get('model.month');
      var year = this.get('model.year') + 1;
      var day = 1;
      var route = '#/calendar/'
      window.location.href= route + year + '/' + month + '/' + day;
    },
    prev_year: function() {
      var month = this.get('model.month');
      var year = this.get('model.year') - 1;
      var day = 1;
      var route = '#/calendar/'
      window.location.href= route + year + '/' + month + '/' + day;
    },
    today: function() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var day = date.getDate();
      var route = '#/calendar/'
      window.location.href= route + year + '/' + month + '/' + day;
    },
    select: function(day) {
      var day = day;
      var month = this.get('model.month');
      var year = this.get('model.year');
      var date = new Date(year, month-1, day);
      Em.set('App.DateValue.value', moment(date).format("YYYY-MM-DD"));
      var route = '#/calendar/'
      window.location.href= route + year + '/' + month + '/' + date.getDate();
      $('#popover').hide();
    }
  }
});