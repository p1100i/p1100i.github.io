var
  svg,
  back,
  group,

  listen = function listen(event, elem, fn) {
    if (elem.addEventListener) {
      return elem.addEventListener(event, fn,false);
    } else if (elem.attachEvent) {
      return elem.attachEvent('on' + event, fn);
    } else {
      console.error('Can\'t attach :/');
    }
  },

  config = {
    w : 600,
    h : 400
  },

  dataset = [
    {
      'cx'     : 10,
      'cy'     : 10,
      'r'     : 3,
      'fill'  : 'green'
    },
    {
      'cx'     : 10,
      'cy'     : 20,
      'r'     : 4,
      'fill'  : 'blue'
    },
  ],

  map = function map(property, object) {
    return object[property];
  },

  mapAttributes = function mapAttributes(objects, data) {
    if (!data || !data.length) {
      console.error('mapAttributes called w/o any data');
    }

    var
      i,
      key,
      keys = Object.keys(data[0]);

    for (i = 0; i < keys.length; i++) {
      key = keys[i];

      objects.attr(key, map.bind(null, key));
    }
  },

  setMetaAttributes = function setMetaAttributes(svg, group, config) {
    svg.attr('width', config.w).attr('height', config.h);
    group.attr('transform', 'translate(' + [0, config.h].join(', ') + '), scale(1,-1)');
  },

  addBackgroundRect = function addBackgroundRect(rect) {
    rect.attr('width', '100%').attr('height', '100%').attr('fill', 'grey');
  },

  addCircles = function addCircles(group, data) {
    var circles = group.selectAll('circle').data(data).enter().append('circle');
    
    mapAttributes(circles, data);
  },

  getBaseLog = function getBaseLog(x, y) {
    return Math.log(y) / Math.log(x);
  },


  drawPowerOfTwoHowMuchNulls = function drawPowerOfTwoHowMuchNulls() {
    //Create SVG element
    window.svg    = svg   = d3.select('body').append('svg');
    window.back   = back  = svg.append('rect');
    window.group  = group = svg.append('g');

    var
      exponent,
      maxX = 100,
      maxY = getBaseLog(10, Math.pow(2, maxX - 1)),
      newData = [];

    for (exponent = 0; exponent < maxX; exponent++) {
      var
        power       = Math.pow(2, exponent),
        howMuchNull = getBaseLog(10, power);

      newData.push({
        'cx'    : exponent    / maxX * config.w,
        'cy'    : howMuchNull / maxY * config.h,
        'r'     : 3,
        'fill'  : 'green'
      });
    }

    setMetaAttributes(svg, group, config);
    addBackgroundRect(back);
    addCircles(group, newData);
  },

  init = function init() {
    // drawPowerOfTwoHowMuchNulls();
  };


listen('load', window, init);
