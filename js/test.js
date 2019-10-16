var left = document.getElementById("left");
var right = document.getElementById("right");
var text = document.getElementById("text");

var messages = ["dog", "cat", "bear", "penguin", "tiger", "eagle", "John Doe"];

    text.textContent = messages[0]


    function next(current, messages) {
        var idx = messages.indexOf(current);
        if (idx === messages.length - 1) {
          return messages[0];
        }
        return messages[idx + 1];
      }
      
      function prev(current, messages) {
        var idx = messages.indexOf(current);
        if (idx === 0) {
          return messages[messages.length - 1];
        }
        return messages[idx - 1];
      }
      left.addEventListener('click', () => {
        text.textContent = prev(text.textContent, messages);
      });
      
      right.addEventListener('click', () => {
        text.textContent = next(text.textContent, messages);
      });
  
     