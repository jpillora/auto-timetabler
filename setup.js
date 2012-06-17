//@project: Auto-Timetabler
//@author: jpillora
//@date: 15/6/2012
//
//Setup name space and utility functions
$(function(){
    
    
    window.guid = function(){return(((1+Math.random())*65536)|0).toString(16).substring(1)}
    
    window.App = {};
    window.App.Util = {};
    
    console.log("setup complete.");
});