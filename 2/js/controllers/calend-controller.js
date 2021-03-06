App.CalendarController = Em.ObjectController.extend({
  filled: false,
  fillModel: function() {
    if (this.get('filled') === false) {
      console.log('Record count:', this.get('content.model.length'));
      if (this.get('content.model.length') == 0 ) {
        this.set('filled', true);
        var params = this.get('content.params');
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
          day.save();
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
          day.save();
          week.get('days').pushObject(day);
          dayCounter++;
          j++;
        }
        week.save();
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
              day.save();
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
              day.save();
              week.get('days').pushObject(day);
            }
            week.save();
          }  
          month.get('weeks').pushObject(week);
        }
        month.save(); 
        var date = new Date(params.year, params.month-1, params.day);
        Ember.set('App.DateValue.value', moment(date).format("YYYY-MM-DD"));  
        this.set('model', month);
      }
      else {
        this.set('filled', true);
        console.log('First object', this.get('content.model.firstObject'));
        this.set('model', this.get('content.model.firstObject'));
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
      var route = '#/calendar/'
      console.log('Next month', route + year + '/' + month + '/' + day);
      this.set('filled', false);
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
      console.log('prev month', route + year + '/' + month + '/' + day);
      this.set('filled', false);
      window.location.href= route + year + '/' + month + '/' + day;
    },
    next_year: function() {
      var month = this.get('model.month');
      var year = this.get('model.year') + 1;
      var day = 1;
      var route = '#/calendar/'
      console.log('Next year', route + year + '/' + month + '/' + day);
      this.set('filled', false);
      window.location.href= route + year + '/' + month + '/' + day;
    },
    prev_year: function() {
      var month = this.get('model.month');
      var year = this.get('model.year') - 1;
      var day = 1;
      var route = '#/calendar/'
      console.log('Prev year', route + year + '/' + month + '/' + day);
      this.set('filled', false);
      window.location.href= route + year + '/' + month + '/' + day;
    },
    today: function() {
      var date = new Date();
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      var day = date.getDate();
      var route = '#/calendar/'
      console.log('Today', route + year + '/' + month + '/' + day);
      this.set('filled', false);
      window.location.href= route + year + '/' + month + '/' + day;
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