App.Router.map(function() {
    this.route('home'),
    this.resource('calendar', {path: 'calendar/:year/:month/:day'})
});

App.CalendarRoute = Em.Route.extend({
  activate: function() {
    $(document).attr('title', 'Ember Datepicker Testing');
  },
  serialize: function(obj) {
    this.store.findAll("month", function(record) {
      record.deleteRecord();
    });
    this.store.findAll("week", function(record) {
      record.deleteRecord();
    });
    this.store.findAll("day", function(record) {
      record.deleteRecord();
    });
    return {
        year: obj.year, month: obj.month, day: obj.day
    }
  },
  model: function (params) {
    var curDate = new Date();
    var dayCount = new Date(params.year, params.month, 0).getDate();
    var start = new Date(params.year, params.month - 1, 1).getDay();
    var week = null;
    var day = null;
    var cnt = 1;
    var j = 1;
    var dayCounter = 1;
    month = this.store.createRecord('month', {
      month: parseInt(params.month),
      monthName: moment(new Date(params.year, params.month - 1, 1)).format('MMMM'),
      year: parseInt(params.year),
      weeks: []
    });
    week = this.store.createRecord('week', {
      month: month,
      days: []
    });
    while (start != j) {
      var date = new Date(params.year, params.month - 1, dayCounter);
      day = this.store.createRecord('day', {
        num: null, 
        current: false,
        selected: false,
        week: week
      });
      week.get('days').pushObject(day);
      j++;
    }      
    while (j <= 7) {
      var date = new Date(params.year, params.month - 1, dayCounter);
      day = this.store.createRecord('day', {
        num: moment(date).format('DD'), 
        current: (curDate == date)?true:false,
        selected: false,
        week: week
      });
      week.get('days').pushObject(day);
      dayCounter++;
      j++;
    }
    month.get('weeks').pushObject(week);
    for (var i=dayCounter; i<=dayCount; i+=7) {
      week = this.store.createRecord('week', {
        month: month,
        days: []
      });
      var cnt = 0;
      for (var k = i; k < i + 7; k++) {
        cnt++;
        if (k > dayCount) {
          var date = new Date(params.year, params.month - 1, dayCounter);
          day = this.store.createRecord('day', {
            num: null, 
            current: false,
            selected: false,
            week: week
          });
          week.get('days').pushObject(day);
        } 
        else {
          var date = new Date(params.year, params.month - 1, k);
          day = this.store.createRecord('day', {
            num: moment(date).format('DD'), 
            current: (curDate == date)?true:false,
            selected: false,
            week: week
          });
          week.get('days').pushObject(day);
        }
      }  
      month.get('weeks').pushObject(week);
    } 
    var date = new Date(params.year, params.month-1, params.day);
    Ember.set('App.DateValue.value', moment(date).format("YYYY-MM-DD"));  
    return month;
  }
});