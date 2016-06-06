// generate a map of {<offset>: <elm>} so we don't have to do that every time we scroll
var elms = document.querySelectorAll(".container div"),
    elmOffsets = {};
for (var i = 0, j = elms.length; i < j; ++i) {
	var offset = elms[i].offsetTop + elms[i].clientHeight;
  elmOffsets[offset] = elms[i];
}

console.log(elmOffsets);

// listen for scroll events. might want to throttle this
var parent = document.getElementsByClassName("container")[0],
    output = document.getElementsByClassName("outp")[0];
parent.addEventListener("scroll", function(){
  var offset = parent.scrollTop,
  // note: this finds the lowest offset that is above the scroll offset
  // if `elmOffsets` contained just `elms[i].offsetTop`, this would mean that it would jump to "second"
  // as soon as the top of the first element is scrolled past
      minOffset = Object.keys(elmOffsets).reduceRight(function(prev,current){
        console.log("offset: " + offset)
        console.log("current: " + current)
        console.log("prev: " + prev)
        //if offset less than current, then current, else prev
      	return offset < current - 150 ? current : prev;
      });
  output.textContent = elmOffsets[minOffset].getAttribute("data-text");
});
