const behavior = document.forms.sentence.behavior;
const emotion = document.forms.sentence.emotion;
const shareCanvas = document.getElementById('destination');
const sc = shareCanvas.getContext('2d');

emotion.addEventListener('change', () => {
	const emotionalState = emotion.selectedOptions[0].parentElement.label;
	switch (emotionalState) {
		case 'Sadness & Grief':
			document.body.id = 'sadness'; 
			break;
		case 'Anger & Frustration':
			document.body.id = 'anger'; 
			break;
		case 'Fear & Anxiety':
			document.body.id = 'fear'; 
			break;
		case 'Joy & Contentment':
			document.body.id = 'joy'; 
			break;
		default: 
			document.body.id= '';
	}

	updateCanvas(); 
	behavior.addEventListener('change', () => {
		updateCanvas();
	});
});

function updateCanvas() {
	if (behavior.value) {
		const backgroundColor = window.getComputedStyle( document.body ,null).getPropertyValue('background-color');
		const textColor = window.getComputedStyle( document.body ,null).getPropertyValue('color');
		const shareCanvasText = `When you ${behavior.value.trim()}, it made me feel ${emotion.value}`;
		sc.fillStyle = backgroundColor;
		sc.fillRect(0,0, shareCanvas.width, shareCanvas.height);
		sc.font = '40px Ubuntu';
		sc.fillStyle = textColor;
		sc.textAlign = 'center';
  	// sc.textBaseline = 'top';
		wrapText(shareCanvasText, shareCanvas.width/2, shareCanvas.height/2, shareCanvas.width - 40, 30, 'Ubuntu');
	}
	return shareCanvas;
}
function wrapText(text, x, y, maxWidth, fontSize, fontFace){
	let line = '';
	let totalHeight = 0;
  const words = text.split(' ');
	const lineHeight = fontSize * 1.286; // a good approx for 10-18px sizes
	const lines = [];
  words.forEach((word, index) => {
    const testLine = line + word + ' ';
		const metrics = sc.measureText(testLine);
		const testWidth = metrics.width;
		const endBehavior = index > 0 ? words[index-1][words[index-1].length-1] === ',' : false;
    if (testWidth > maxWidth || endBehavior) {
      lines.push({
      	text: line,
      	y: y
      });
  		totalHeight += lineHeight + (endBehavior ? 30 : 0);
      if ( index < words.length ){
          line = word + ' ';
          y += lineHeight + (endBehavior ? 30 : 0);
      }
    }
    else {
      line = testLine;
    }
  });
	
	lines.push({
  	text: line,
  	y: y
  });
	lines.forEach((line) => {
		sc.fillText(line.text, x, line.y - totalHeight/2);
	});
}

//  https://codepen.io/sunnysingh/pen/OPxbgq?editors=1010
(function(){
  var shareButtons = document.querySelectorAll('.share-btn');

  if (shareButtons) {
      [].forEach.call(shareButtons, function(button) {
      button.addEventListener('click', function(event) {
 				var width = 650,
            height = 450,
            nvdc = behavior.value && emotion.value ? 'When you ' + behavior.value + ', it makes me feel ' + emotion.value + '.' : 'I abhor violence',
            sentence = '';

        event.preventDefault();
        console.log(this);
        console.log(this.classList);
				if (this.classList.contains('share-fb')) sentence = 'https://www.facebook.com/sharer/sharer.php?u=http://www.bikeandjibe.net/nonviolent/&quote=' + nvdc;
					else sentence = 'https://twitter.com/intent/tweet?text=' + nvdc + ' - @nvdcgenerator';

        document.querySelectorAll('.share-btn').forEach((a) => a.href = sentence);
        window.open(this.href, 'Share Dialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+width+',height='+height+',top='+(screen.height/2-height/2)+',left='+(screen.width/2-width/2));
      });
    });
  }

})();