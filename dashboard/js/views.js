(function(sn) {
  sn = sn || {};
  var views = {};
  var View = Backbone.View;

  views.Page = View.extend({
    el: $('#main'),
    insert: 'html',
    initialize: function(config) {
      config = config || {};
      this.vars = config.vars || this.vars || {};

      _.each(['template', 'insert'], _.bind(function(prop) {
        this[prop] = config[prop] || this[prop];
      }, this));

      _.bindAll(this);
    },
    render: function() {
      _.bindAll(this);
      this.$el
        [ this.insert ]( ich[ this.template ]( this.vars ) );
      return this;
    },
    drawToday: function() {},
    drawHistory: function() {}
  });

  views.Sidebar = views.Page.extend({
    initialize: function(config) {
      this._super(config);
      this.render();
    },
    drawToday: function(data) {
      simplePie(
        '#todaySegmentationPie', 
        [
          {value: data.male, label: 'male'},
          {value: data.female, label: 'female'}
        ]
      );

      this.$el
        .find('#peopleToday')
          .text(data.people)

    },
    drawLast: function(data) {
      var at = data.at
        .replace('minutes', 'min')
        .replace('minute', 'min')
        .replace('hours', 'hrs')
        .replace('seconds', 'sec');

      this.$el
        .find('#lastReading')
          .text(at);
    }
  });


  views.Main = views.Page.extend({
    initialize: function(config) {
      this._super(config);
      this.render();
    },
    drawToday: function(data) {
      timeLine('#graph', data, 900, 400, 'People')();
    },
    drawHistory: function(data) {
      // timeLine(1, data)();
    }
  });

  sn.views = views;




var timeLine = function(selector, data, w, h, name) {


  var init = function() {

    // graph size
    var graphw = w - 140,
      graphh = h - 200;

    var tweets = data.minutes;
    var dates = _.map(_.keys(tweets), function(d) {
      return new Date(d * 1000);
    });

    // first find out the timerange of the tweets
    var begin = _.min(dates);
    var end = _.max(dates);
    var range = (end - begin);

    var msInInterval = 2 * 15 * 60 * 1000;
    var interval = Math.ceil(range / msInInterval);

    if(interval > 10) {
      msInInterval *= 2;
      interval /= 2;
    }

    if(interval < 6) {
      msInInterval /= 2;
      interval *= 2;
    }

    var createdSorted = function(interval, input) {
      var beginMom = moment(begin);

      var sorted = _.range(interval);
      sorted = _.map(sorted, function() { return 0; });
      _.each(input, function(date) {
        var dif = moment(date).diff( beginMom );
        var day = Math.floor(dif / msInInterval);
        sorted[day]++;
      });
      return sorted;
    }

    // stuff the tweets in the sorted array
    var sortedTweets = createdSorted(interval, dates);

    // fugly
    var x = function(data) { return d3.scale.linear().domain([0, data.length]).range([50, graphw]) };
    var y = function(data) { return d3.scale.linear().domain([0, _.max(data)]).range([20, graphh]) };
    var xTweets = x(sortedTweets)
    var yTweets = y(sortedTweets);
    x = xTweets;
    y = yTweets;

    var line = function(x, y) {
      return d3.svg.area()
        .x(function(d, i) { return x(i); })
        .y0(h)
        .y1(function(d) { return h + (-y(d)) + 19; });
    };

    // fugly
    var tweetsLine = line(x, y);
    line = tweetsLine;

    // create the svg
    var svg = d3.select(selector)
      .append('svg:svg')
      .attr("width", w)
      .attr("height", h);

    // helpers
    var utils = {
      grow: function(node) {
        d3.select(node)
          .style('visibility', 'visible')
          .transition(500)
          .attr('r', 7);
      },
      shrink: function(node) {
         d3.select(node)
          .style('visibility', 'hidden')
          .attr('r', 0);
      }
    }

    var graph = svg.append('svg:g')
       .attr("transform", "translate(0, -100)");

    var draw = {
      pointers: function(set, selector) {
        graph
          .selectAll('.' + selector)
          .data(set)
          .enter()
            .append('svg:circle')
              .style('visibility', 'hidden')
              .attr('class', selector)
              .attr('cx', function(d, i) { return x(i) })
              .attr('cy', function(d) { return -y(d) + h + 20 })
              .attr('r', 1);
      },
      graphArea: function(set, selector) {
        graph
          .append('svg:path')
            .attr('class', selector)
            .attr('d', tweetsLine(set))
            .attr("x", 0)
            .attr("y", 0);
      },
      timeRange: function(from, to, selector, text, offset) {
        from = (from - begin) / msInInterval;
        to = (to - begin) / msInInterval;
        graph
          .append('svg:rect')
            .attr('class', selector)
            .attr('x', function() { return x(from + 1) - (graphw / interval / 2) })
            .attr('width', function() { return x(to) - x(from) + (graphw / interval) })
            .attr('y', h - graphh - 90)
            .attr('height', graphh + 90);

        graph
          .append('svg:text')
            .text(text)
            .attr("y", h - graphh - 100 - offset * 25)
            .attr("x", function() { return x(from) + (x(to) - x(from)) / 2 + (graphw / interval) + offset * 5 })
            .attr("text-anchor", "middle");
      },
      legenda: function(i, text, selector) {
        graph
          .append('svg:g')
            .attr('class', selector)
            .attr("transform", "translate(" + (graphw + 70) + ", " + (580 - i * 26) + ")")
              .append('svg:text')
                .text(text)
                .attr('x', 0)
                .attr('y', 0)
                .attr('dy', 5);

        graph
          .selectAll('.' + selector)
            .append('svg:circle')
              .attr('r', 8)
              .attr('cx', -15)
              .attr('cy', 0);
      }
    }

    draw.graphArea(sortedTweets, 'tweets');
    draw.pointers(sortedTweets, 'tweetPointer');

    var tooltip = d3.select("body")
      .append("div")
      .attr('class', 'tooltip')
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden")
      .text("a simple tooltip");

    var hooverBlocks = _.range(interval);


    // precalculate the hover messages
    var hooverMesages = [];
    _.each(hooverBlocks, function(i) {
      var mom = moment(begin).add(msInInterval * i);
      var start = mom.format('HH:mm:ss');
      var end = mom.add('ms', msInInterval).format('HH:mm:ss');

      hooverMesages.push([
        sortedTweets[i] + ' people',
        '<strong>' + start + ' - ' + end + '</strong>'
      ].join('<br>'));
    })


    var blockWidth = graphw / interval;
    graph
      .selectAll('.hooverBlock')
      .data(hooverBlocks)
      .enter()
        .append('svg:rect')
        .attr('class', 'hooverBlock')
        .attr('y', h - graphh)
        .attr('x', function(d) { return x(d) - blockWidth / 2 })
        .attr('width', blockWidth)
        .attr('height', graphh)
        .on("mouseover", function(i){
          
          // set the text
          tooltip.html( hooverMesages[i] )

          // make the pointers visible
          utils.grow( graph.selectAll('.tweetPointer')[0][i] );

          tooltip.style("visibility", "visible");
        })
        .on("mousemove", function(){
          tooltip.style("top", (event.pageY - 10) + "px").style("left", (event.pageX + 10) + "px");
        })
        .on("mouseout", function(i){ 
            utils.shrink( graph.selectAll('.tweetPointer')[0][i] );
            tooltip.style("visibility", "hidden");
        });

    // add the y axe labels
    graph
      .selectAll('.ylabel')
      .data(yTweets.ticks(4))
        .enter()
        .append('svg:text')
          .attr("class", "ylabel")
          .text(String)
          .attr("x", 35)
          .attr("y", function(d) { return -1 * y(d) + h + 20 })
          .attr("text-anchor", "end")
          .attr("dy", -4);

    // the label for the whole axe
    graph
      .append('svg:text')
      .attr('class', 'label')
      .text(name + ' per hour')
      .attr('text-anchor', 'end')
      .attr('x', 100)
      .attr('y', h - graphh - 20);


    // return console.log(sortedTweets.length);

    // add the x axe labels
    var dates = xTweets.ticks(sortedTweets.length);
    // it counts to far somehow, remove last item
    dates.pop();

    var getTimeForOffset = function(offset) {
      return moment(begin)
        .add('ms', offset * msInInterval)
        .format('HH:mm');
    }


    graph
      .selectAll('.xlabel')
      .data(dates)
        .enter()
        .append('svg:text')
          .attr("class", "ylabel")
          .text(function(d) { 
            return moment(begin)
              .add('milliseconds', d * msInInterval)
              .format('HH:mm');
          })
          .attr("x", function(d) { return x(d)})
          .attr("y", h + 30)
          .attr("text-anchor", "middle");

    // the triangles to indicate where exactly the date is
    // innerGraph
    //   .selectAll('.triangle')
    //   .data(dates)
    //   .enter()
    //     .append('svg:path')
    //       .attr('class', 'triangle')
    //       .attr("transform", function(d) { return "translate(" + x(d) + "," + (h + 3) + ")"; })
    //       .attr("d", 
    //         d3.svg.symbol()
    //           .size(30)
    //           .type('triangle-down')
    //       );

    // legenda
    // draw.legenda(0, 'mentions', 'legendaMentions');
    // draw.legenda(1, 'tweets', 'legendaTweets');
  }

  return init;

}










  var simplePie = function(selector, data) {
    var w = 210,                        //width
    h = 200,                            //height
    r = 100,                            //radius
    color = d3.scale.category20c();     //builtin range of colors
    
    var vis = d3.select(selector)
        .append("svg:svg")              //create the SVG element inside the <body>
        .data([data])                   //associate our data with the document
            .attr("width", w)           //set the width and height of our visualization (these will be attributes of the <svg> tag
            .attr("height", h)
        .append("svg:g")                //make a group to hold our pie chart
            .attr("transform", "translate(" + r + "," + r + ")")    //move the center of the pie chart from 0, 0 to radius, radius

    var arc = d3.svg.arc()              //this will create <path> elements for us using arc data
        .outerRadius(r);

    var pie = d3.layout.pie()           //this will create arc data for us given a list of values
        .value(function(d) { return parseInt(d.value); });    //we must tell it out to access the value of each element in our data array

    var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
        .data(pie)                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties) 
        .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
            .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
                .attr("class", "slice");    //allow us to style things in the slices (like text)

        arcs.append("svg:path")
                .attr("fill", function(d, i) { return d.data.label === 'male' ? 'lightblue' : 'pink'; } ) //set the color for each slice to be chosen from the color function defined above
                .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

        arcs.append("svg:text")                                     //add a label to each slice
                .attr("transform", function(d) {                    //set the label's origin to the center of the arc
                //we have to make sure to set these before calling arc.centroid
                d.innerRadius = 0;
                d.outerRadius = r;
                return "translate(" + arc.centroid(d) + ")";        //this gives us a pair of coordinates like [50, 50]
            })
            .attr("text-anchor", "middle")                          //center the text on it's origin
            .text(function(d, i) { return data[i].label; });        //get the label from our original data array
        
  }


}(sn));