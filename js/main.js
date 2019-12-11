var emotion = document.forms.sentence.emotion,
		behavior = document.forms.sentence.behavior;

emotion.addEventListener('change', () => {
	var emotionalState = emotion.selectedOptions[0].parentElement.label;
	switch (emotionalState) {
		case "Sadness & Grief":
			document.body.id = "sadness"; break;
		case "Anger & Frustration":
			document.body.id = "anger"; break;
		case "Fear & Anxiety":
			document.body.id = "fear"; break;
		case "Joy & Contentment":
			document.body.id = "joy"; break;
		default: 
			document.body.id= "";
	}
});


//  https://codepen.io/sunnysingh/pen/OPxbgq?editors=1010
(function(){
  var shareButtons = document.querySelectorAll(".share-btn");

  if (shareButtons) {
      [].forEach.call(shareButtons, function(button) {
      button.addEventListener("click", function(event) {
 				var width = 650,
            height = 450;

        event.preventDefault();
        var sentence = "&quote=When you " + behavior + ", it makes me feel " + emotion + ".";

        document.querySelectorAll(".share-btn").forEach((a) => a.href += a.href + sentence);
        window.open(this.href, 'Share Dialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+width+',height='+height+',top='+(screen.height/2-height/2)+',left='+(screen.width/2-width/2));
      });
    });
  }

})();