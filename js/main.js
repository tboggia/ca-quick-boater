const behavior = document.forms.sentence.behavior;
const emotion = document.forms.sentence.emotion;
const shareCanvas = document.getElementById('destination');
const sc = shareCanvas.getContext('2d');
setFormFromQuery(getUrlParam());
updateBodyId();
document.forms.sentence.addEventListener("submit", (event) => {
	event.preventDefault();
	if (behavior.value && emotion.value) {
		setUrlParams(behavior.value, emotion.value);
		shareItAll();
		// updateCanvas(); 
	}
	return false;
});
emotion.addEventListener('change', () => {
	updateBodyId();
	if (behavior.value) {
		setUrlParams(behavior.value, emotion.value);
		// updateCanvas(); 
	}
});

behavior.addEventListener('change', () => {
	if (emotion.value) {
		setUrlParams(behavior.value, emotion.value);
		// updateCanvas();
	}
});

function updateBodyId() {
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
	return document.body.id;
}

/**
 * [getUrlParam description]
 * @return {[type]} [description]
 */
function getUrlParam() {
	const hashes = window.location.search.substr(1, window.location.search.length).split('&');
	const params = hashes[0] === "" ? null : hashes.reduce((params, hash) => {
	  const [key, val] = hash.split('=');
	  params[key] = decodeURIComponent(val);
	  return params;
	}, {});
	return params;
}

/**
 * Sets the form values on the url query
 * @param {String} behavior
 * @param {String} emotion 
 */
function setUrlParams(behavior, emotion) {
	console.log("Params changing");
	if (history.pushState) {
		const newUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}?emotion=${emotion}&behavior=${behavior}`;
		window.history.pushState({path:newUrl},'',newUrl);
	}
}


function setFormFromQuery(params) {
	if (params) {
		emotion.value = decodeURI(params.emotion) || '';
		behavior.value = decodeURI(params.behavior) || '';
	}
}

function shareItAll(event) {
	const width = 650;
  const height = 450;
  const nvdc = behavior.value && emotion.value ? `When you ${behavior.value}, it makes me feel ${emotion.value}.` : `I abhor violence`;
  let url = '';
  let platform = 'facebook';

  if (event) {
  	event.preventDefault();
  	platform = !this.classList.contains('share-fb') ? 'facebook' : 'twitter';
  }
	if (platform === 'facebook') url = 'https://www.facebook.com/sharer/sharer.php?u=http://www.bikeandjibe.net/nonviolent/&quote=' + nvdc;
		else url = 'https://twitter.com/intent/tweet?text=' + nvdc + ' - @nvdcgenerator';

  document.querySelectorAll('.share-btn').forEach((a) => a.href = url);
  window.open(url, 'Share Dialog', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,width='+width+',height='+height+',top='+(screen.height/2-height/2)+',left='+(screen.width/2-width/2));
}

//  https://codepen.io/sunnysingh/pen/OPxbgq?editors=1010
//  Creates share buttons
var shareButtons = document.querySelectorAll('.share-btn');

if (shareButtons) {
  [].forEach.call(shareButtons, function(button) {
  button.addEventListener('click', shareItAll);
	});
}

/**
 * Update the canvas with the new form values
 * @return canvas
 */
// function updateCanvas() {
// 	// CANVAS
// 	const backgroundColor = window.getComputedStyle( document.body ,null).getPropertyValue('background-color');
// 	const textColor = window.getComputedStyle( document.body ,null).getPropertyValue('color');
// 	const shareCanvasText = `When you ${behavior.value.trim()}, it made me feel ${emotion.value}`;
// 	sc.fillStyle = backgroundColor;
// 	sc.fillRect(0,0, shareCanvas.width, shareCanvas.height);
// 	sc.font = '40px Ubuntu';
// 	sc.fillStyle = textColor;
// 	sc.textAlign = 'center';
// 	sc.textBaseline = 'top';
// 	wrapText(shareCanvasText, shareCanvas.width/2, shareCanvas.height/2, shareCanvas.width - 40, 30, 'Ubuntu');
// 	return true;
// }

/**
 * Wrap the text in the canvas. Not needed without share.
 * @param  {[type]} text     [description]
 * @param  {[type]} x        [description]
 * @param  {[type]} y        [description]
 * @param  {[type]} maxWidth [description]
 * @param  {[type]} fontSize [description]
 * @param  {[type]} fontFace [description]
 * @return {[type]}          [description]
 */
// function wrapText(text, x, y, maxWidth, fontSize, fontFace){
// 	let line = '';
// 	let totalHeight = 0;
//   const words = text.split(' ');
// 	const lineHeight = fontSize * 1.286; // a good approx for 10-18px sizes
// 	const lines = [];
//   words.forEach((word, index) => {
//     const testLine = line + word + ' ';
// 		const metrics = sc.measureText(testLine);
// 		const testWidth = metrics.width;
// 		const endBehavior = index > 0 ? words[index-1][words[index-1].length-1] === ',' : false;
//     if (testWidth > maxWidth || endBehavior) {
//       lines.push({
//       	text: line,
//       	y: y
//       });
//   		totalHeight += lineHeight + (endBehavior ? 30 : 0);
//       if ( index < words.length ){
//           line = word + ' ';
//           y += lineHeight + (endBehavior ? 30 : 0);
//       }
//     }
//     else {
//       line = testLine;
//     }
//   });
	
// 	lines.push({
//   	text: line,
//   	y: y
//   });
// 	lines.forEach((line) => {
// 		sc.fillText(line.text, x, line.y - totalHeight/2);
// 	});
// }

// FB login checker
// function checkLoginState() {
//   FB.getLoginStatus(function(response) {
//     console.log(response);
//     // statusChangeCallback(response);
//   });
// }
