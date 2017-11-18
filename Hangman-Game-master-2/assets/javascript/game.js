$(document).ready(function () {

   var random,
       words = [], // array of words
       lettersBlock = $('.letters'),
       allLetters = undefined, // html of letters
       letters = [], // array of letter of current word
       wrongLetters = $('.wrong-let'),
       alreadyGuessedLetters = [],
       currentWord = '',
       currentTitle = '',
       re = /[a-z A-Z]/gi, // regular - only en letters
       spanBlock = '<span class="let hide-let">_</span> ',
       guessesCounter = $('.guesses-counter'),
       wins = $('.wins'),
       winsCounter = 0,
       resetCounter = 12, // default guesses
       currentCounter = resetCounter, // current count of guesses
       titleText = $('.hang-title'),
       haveGuess = false, // for counter. Decrease or not
       audio = $('.audio'),
       image = $('.hang-img-wrap img'),
       rightWordBlock = $('.right-word'),
       rightWord = $('.right-word span');

   // for creating new word
   function createWord(word,title){
      words.push({
         'word' : word,
         'title' : title
      });
   }

   function getRandom(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
   }

   // return html with span * count of letters
   function lettersHtml(num){
      var result = '';
      for(var i = 0; i < num; i++){
         result = result + spanBlock;
      }
      return result;
   }

   // start new game
   function startGame(){
      if(words.length <= 0){
         alert('no words');
      }
      else{
         // get random word
         random = getRandom(0,words.length);
         currentWord = words[random].word;
         currentTitle = words[random].title;
         // get values of letters
         letters = currentWord.match(re);
         // add spans with dashes
         lettersBlock.html(lettersHtml(letters.length));
         // get letters
         allLetters = $('.letters .let');
         // reset counter
         guessesCounter.text(resetCounter);
         // reset guesses
         wrongLetters.html('');
         currentCounter = resetCounter;
         alreadyGuessedLetters = [];
         audio.html();
      }
   }

   // if this letter has already guessed
   function checkGuesses(currentLetter){
      for(var i = 0; i < alreadyGuessedLetters.length; i++){
         if(alreadyGuessedLetters[i] == currentLetter){
            return true;
         }
      }
   }

   function checkGame(e){
      var currentLetter = String.fromCharCode(e.keyCode).toLowerCase();
      // if this letter has already guessed
      if(checkGuesses(currentLetter)){
         return;
      }
      // if pressed key is letter
      if (e.keyCode >= 65 && e.keyCode <= 90) {
         for(var i = 0; i < letters.length; i++){
            // if is right letter
            if(letters[i] == currentLetter){
               haveGuess = true;
               allLetters.eq(i)
                   .removeClass('hide-let')
                   .text(currentLetter)
                   .addClass('new-let');
            }
         }
         if(!haveGuess){
            if(currentCounter === 0){
               youLose();
               return;
            }
            console.log(currentCounter);
            // decrease counter
            guessesCounter.text(--currentCounter);
            if(currentCounter < 4){
               guessesCounter.addClass('let-red');
            }
            else{
               guessesCounter.removeClass('let-red');
            }
            alreadyGuessedLetters.push(currentLetter);
            wrongLetters.append('<span class="let-red">' + currentLetter + '</span> ');
         }
         haveGuess = false;
      }
      if(!allLetters.hasClass('hide-let')){
         gameOver();
      }
      setTimeout(function(){
         allLetters.removeClass('new-let');
         $('.wrong-let span').removeClass('let-red');
      },400)
   }

   function gameOver(){
      // play audio
      audio.html('<source src="assets/audio/' + currentWord +'.wav">')
          .attr('src','assets/audio/' + currentWord +'.wav');
      audio[0].play();
      // set wins counter
      wins.text(++winsCounter);
      wins.addClass('new-let');
      // set right img
      image.attr('src','assets/images/' + currentWord + '.jpg');
      titleText.text(currentTitle);
      guessesCounter.removeClass('let-red');
      rightWordBlock.hide();
      startGame();
   }

   function youLose() {
      guessesCounter.removeClass('let-red');
      titleText.text('You lose the game');
      rightWordBlock.show();
      rightWord.text(currentWord);
      startGame();
   }

   createWord('blondie','call me by blondie');
   createWord('genesis','illegal alien by genesis');
   createWord('music','I am fond of classic music');
   createWord('london','big and beautiful city');
   createWord('musician','My friend is a good musician');
   createWord('hobbies','interesting things to do');
   createWord('crossword','a way to learn a lot of new words');
   createWord('jazz','contribution to American music');
   createWord('composer','Beethoven is a great composer');
   createWord('traditions','Britain has good traditions of folk music');
   createWord('popularity','Modern music is of great popularity');
   createWord('famous','The Beatles is the most famous group');
   createWord('singers','Pop singers are known throughout the world');
   createWord('conductor','The most important figure in the orchestra');
   createWord('morning','all the day is ahead');
   createWord('breakfast','a cup of coffee and sandwich');
   createWord('vacation','a lot of travelling');
   createWord('museums','There are a lot of museums in Paris');
   createWord('education','University provides you with higher education');
   createWord('weather','The weather gets warmer in spring');
   createWord('restaurant','A lot of delicious dishes');
   createWord('skype','Modern means of communication');
   createWord('friend','A friend in need is a friend indeed');
   createWord('daughter','Mother loves her daughter very much');
   createWord('knowledge','Too much knowledge makes the head bald');
   createWord('honeymoon','A newly married couple had a great honeymoon');
   createWord('slippers','A very comfortable footwear for home');
   createWord('problems','Try to get rid of your problems');
   createWord('attention','Pay attention to your pronunciation');
   createWord('secrets','I can keep secrets');
   createWord('never','You never know where you are');
   createWord('environment','There are many problems in an environment protection');
   createWord('language','Chinese is a foreign language for many people');
   createWord('university','One must pass exams to enter the University');
   createWord('bird','A little bird told me');
   createWord('favourite','Jack London is my favourite writer');
   createWord('relativity','Einstein is the author of the theory of relativity');
   createWord('programme','I need a new version of the computer programme');
   createWord('conversation','to have an interesting conversation with a friend');
   createWord('computer','Nowadays everyone has a computer');
   createWord('representative','Byron is a bright representative of English poetry');
   createWord('acknowledgement','This invention brought him a wide acknowledgement');
   createWord('interest','to have an interest in modern music');
   createWord('message','to receive a message by e-mail');
   createWord('bridge','Bridge connects the river sides');
   createWord('rest','I need some rest');
   createWord('flower','Tulip is a beautiful spring flower');
   createWord('wednesday','Wednesday is a working day');
   createWord('newspaper','I get news from the newspaper');
   createWord('maple','Maple leaf is a symbol of Canada');
   createWord('geography','Pupils study geography at school');
   createWord('insurance','Insurance is a very important sphere in business');
   createWord('animals','Cats and dogs are domestic animals');
   createWord('government','Government did much to reform the industry');
   createWord('prosperity','We seek peace, prosperity and dignity for all');
   createWord('library','Every town should have a library');
   createWord('parliament','The Speaker of the House of Parliament met with the mission');
   createWord('interest','History is of great interest');
   createWord('rainbow','A rainbow is one of the most beautiful phenomena of nature');
   createWord('children','Children like to play games');
   createWord('hamburger','Hamburger is usually served at McDonald\'s');
   createWord('nutrition','Good nutrition is important for good health');
   createWord('halloween','Customs of Halloween are popular in the USA');
   createWord('christmas','Christmas is celebrated on December, 25th.');
   createWord('abbreviation','The USA is an abbreviation for the United States of America');
   createWord('portrait','The portrait of Gioconda is exhibited in the Louvre');
   createWord('colleague','Dr Watson is a colleague of Sherlock Holmes');
   createWord('internet','Internet is a global computer network connecting users all over the world');
   createWord('microsoft','Bill Gates is one of the founders of Microsoft Corporation');
   createWord('knowledge','Knowledge of languages is very important for a diplomat');
   createWord('politeness','Politeness is a sign of culture');
   createWord('forecast','The weather forecast is not an easy thing');
   createWord('snowballs','Children like to play snowballs in winter');
   createWord('dwarf','The Snowwhite and the Seven Dwarfs');
   createWord('impressionist','Claude Monet is an impressionist');
   createWord('author','Dreiser is the author of "An American Tragedy"');
   createWord('journalist','Mark Twain worked as a journalist');
   createWord('west','East or West home is best');
   createWord('fertile','Ukraine is rich for the fertile black soil');
   createWord('money','In the modern world money has various uses');

   document.onkeydown = checkGame;

   startGame();

});