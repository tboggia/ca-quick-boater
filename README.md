# California Quick Boater!
Purose of this is to auto-advance the course part of the boater quiz for people who have been sailing their whole lives and don't need to wait 24 seconds per slide telling them what "port" is.

*Please do not use if you are a new boater*. The content of the course is 80% really useful/must know (and 20% dumbass shit motorboaters do).

## How to use
Visit [ca-quick-boater.bikeandjibe.net](ca-quick-boater.bikeandjibe.net) 

## How to extend
The script in `./js/main.js`is what's used on the bookmarklet. I was manually copying and pasting it into https://mrcoles.com/bookmarklet/ and then copy pasting that into `./index.html`. Pretty much everything else on this repository is junk from the bolierplate I used.

### Ideas for what to improve
* automate process of encoding main.js into the bookmarkley href field in index.html.
* figure out how to speed up time.
* apply the same fix from the quizzes that auto-clicks next after you close the modals (works in quizzes because it clicks the next arrow)
