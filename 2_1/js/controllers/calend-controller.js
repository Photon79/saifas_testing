App.CalendarController = Em.ObjectController.extend({
  filled: false,
  fillModel: function() {
    if (this.get('filled') === false) {
      if (this.get('content.model') == null ) {
        console.log('Filling');
        var params = this.get('content.params');
        var curDate = new Date();
        var dayCount = new Date(params.year, params.month, 0).getDate();
        var start = new Date(params.year, params.month - 1, 1).getDay();
        if (start == 0) {
          start = 7;
        }
        var week = null;
        var day = null;
        var cnt = 1;
        var j = 1;
        var dayCounter = 1;
        var date = new Date(params.year, params.month-1, params.day);
        if (!this.get('content.no_change')) {
          Ember.set('App.DateValue.value', moment(date).format("YYYY-MM-DD"));  
        }
        var month = App.Month.create({
          month: parseInt(params.month),
          monthName: moment(new Date(params.year, params.month - 1, 1)).format('MMMM'),
          year: parseInt(params.year),
          weeks: []
        });
        week = App.Week.create({
          days: []
        });
        while (start != j) {
          var date = new Date(params.year, params.month - 1, dayCounter);
          day = App.Day.create({
            day: null, 
            month: parseInt(params.month),
            year: parseInt(params.year)
          });
          week.days.push(day);
          j++;
        }      
        while (j <= 7) {
          var date = new Date(params.year, params.month - 1, dayCounter);
          day = App.Day.create({
            day: moment(date).format('DD'), 
            month: parseInt(params.month),
            year: parseInt(params.year)
          });
          week.days.push(day);
          dayCounter++;
          j++;
        }
        month.weeks.push(week);
        for (var i=dayCounter; i<=dayCount; i+=7) {
          week = App.Week.create({
            days: []
          });
          var cnt = 0;
          for (var k = i; k < i + 7; k++) {
            cnt++;
            if (k > dayCount) {
              var date = new Date(params.year, params.month - 1, dayCounter);
              day = App.Day.create({
                day: null, 
                month: parseInt(params.month),
                year: parseInt(params.year)
              });
              week.days.push(day);
            } 
            else {
              var date = new Date(params.year, params.month - 1, k);
              day = App.Day.create({
                day: moment(date).format('DD'), 
                month: parseInt(params.month),
                year: parseInt(params.year)
              });
              week.days.push(day);
            }
          }  
          month.weeks.push(week);
        }
        App.Months.push(month);
        this.set('filled', true);
        this.set('model', month);
      }
      else {
        this.set('filled', true);
        this.set('model', this.get('content.model'));
      }
    }
  }.observes('content'),
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
      this.set('filled', false);
      this.set('content', {model: null, params: {year: year, month: month, day: day}, no_change: true});
    },
    prev_month: function() {
      var day = 1;
      var month = parseInt(this.get('model.month')) - 1;
      var year = this.get('model.year');
      if (month < 1) {
        month = 12;
        year = year - 1;
      }
      this.set('filled', false);
      this.set('content', {model: null, params: {year: year, month: month, day: day}, no_change: true});
    },
    next_year: function() {
      var month = this.get('model.month');
      var year = this.get('model.year') + 1;
      var day = 1;
      this.set('filled', false);
      this.set('content', {model: null, params: {year: year, month: month, day: day}, no_change: true});
    },
    prev_year: function() {
      var month = this.get('model.month');
      var year = this.get('model.year') - 1;
      var day = 1;
      this.set('filled', false);
      this.set('content', {model: null, params: {year: year, month: month, day: day}, no_change: true});
    },
    today: function() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var day = date.getDate();
      this.set('filled', false);
      this.set('content', {model: null, params: {year: year, month: month, day: day}, no_change: true});
    },
    select: function(day) {
      var day = day;
      var month = this.get('model.month');
      var year = this.get('model.year');
      var date = new Date(year, month-1, day);
      Em.set('App.DateValue.value', moment(date).format("YYYY-MM-DD"));
      var route = '#/calendar/'
      this.set('filled', false);
      $('#popover').hide();
      window.location.href= route + year + '/' + month + '/' + date.getDate();
    }
  }
});