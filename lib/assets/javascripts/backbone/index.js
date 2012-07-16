//= require ./json3
//= require ./underscore
//= require ./backbone-min
//= require ./backbone-localStorage-min


//after inclusion of underscore - set mustache template style
_.templateSettings = {
    interpolate: /\{\{\=(.+?)\}\}/g,
       evaluate:   /\{\{(.+?)\}\}/g
};