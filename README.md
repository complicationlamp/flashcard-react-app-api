FlashQuiz is a flashcard application where traditionally styled flashcards give feedback for right and wrong answers. The app is styled for an adult audience, in a no-nonsense style for the purpose of knocking out some solid study time.

LINK: http://www.looreddy.com/home  

HELP REQUEST: have any ideas about how I can make this better? I have a few, but I’d love to hear yours. Please help me with some outside perspective and submit a pull request.

SUMMARY: To solve the overlap in learning react and not forget some of the basics, I figured I could kill two birds with one stone here and build out a study application for some computer science topics in react. After looking around at sites catering to this market one thing stuck out to me, the were all quite busy. When I study I like an environment that is free from distraction and as my previous apps have been awash with color and imagery, I felt that doing a sleek, predominantly monochromatic design would deliver a better product and be a challenge. Also, as a long-time train commuter I wanted to make this a more mobile first design, so I and others can make better use of our commute. 

THE API: the API is set up to register and store user information, making use of JWT for the authentication process. The questions are accessed in a typical CRUD operation, but for the purpose of not letting a malicious user edit community flashcards put operations for questions have been removed.

TECHNOLOGY USED:  for client see the client page in my repositories
The Api makes use of Node, Nodemon, Mocha, Chai, Bcryptjs, Body-parser, CORS, Express, Json Web Tokens, passport  
NOTE: run NPM i or NPM install to download dependencies after cloning 

home screens Normal and reactive
![home full view](https://github.com/complicationlamp/flashcard-react-app-client/blob/master/readMeImages/home.png)
![home reactive](https://github.com/complicationlamp/flashcard-react-app-client/blob/master/readMeImages/home%20reactive.png)

Build a flashcard
![build a card](https://github.com/complicationlamp/flashcard-react-app-client/blob/master/readMeImages/build%20a%20card.png)

select subjects to study
![build deck](https://github.com/complicationlamp/flashcard-react-app-client/blob/master/readMeImages/build%20a%20deck.png)

Flash card
![card front](https://github.com/complicationlamp/flashcard-react-app-client/blob/master/readMeImages/question%20answer.png)
![card back wrong ans](https://github.com/complicationlamp/flashcard-react-app-client/blob/master/readMeImages/question.png)
