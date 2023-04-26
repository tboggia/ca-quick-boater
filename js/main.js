// Use https://mrcoles.com/bookmarklet/ to turn it into a bookmarklet

const iframe = document.getElementById('course-frame');
const iframedoc = iframe.contentDocument? iframe.contentDocument: iframe.contentWindow.document;
const inceptionframe = iframedoc.getElementById('scormdriver_content');
const inceptiondoc = inceptionframe.contentDocument? inceptionframe.contentDocument: inceptionframe.contentWindow.document;
const intervalID = setInterval(clickNext, 1000);
const nextButton = inceptiondoc.getElementById('forwardButton');
const inceptionBody = inceptiondoc.body;

function is_next_clickable() {
    return !nextButton.classList.contains('disabled') && !inceptionBody.classList.contains('modal-open');
}

function clickNext() {
	if (is_next_clickable()) {
			nextButton.click();
	}
}

intervalID;
