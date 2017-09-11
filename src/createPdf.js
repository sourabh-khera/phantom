/**
 * Created by sourabh on 21/6/17.
 */

var page=require('webpage').create();
var filename='demo.png';

page.viewportsize={width:500,height:800};

page.open('https://en.wikipedia.org',function(){
    page.render(filename);
    phantom.exit();
});
