function readFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
      if (rawFile.readyState === 4 && rawFile.status === 200) {
        callback(rawFile.responseText);
      }
    };
    rawFile.send(null);
  }
  
  readFile("/Asset/content/changeStatus.txt", function (content) {
    var notepadText = content.trim();
    
    const imageMap = {
      'A': {
        imageSrc: '/Asset/statusMood/sleepy.png',
        statusText: 'Iam Sleepy'
      },
      'B': {
        imageSrc: '/Asset/statusMood/smile.png',
        statusText: 'Hello World!'
      },
      'C': {
        imageSrc: '/Asset/statusMood/focus.png',
        statusText: 'Focus'
      },
      'D': {
        imageSrc: '/Asset/statusMood/relax.png',
        statusText: 'Relax Bro'
      },
      'E': {
        imageSrc: '/Asset/statusMood/sleep.png',
        statusText: 'Sleep'
      },
      'F': {
        imageSrc: '/Asset/statusMood/shock.png',
        statusText: 'Woaaaaarrghhh'
      },
      'G': {
        imageSrc: '/Asset/statusMood/sotired.png',
        statusText: 'So Tired'
      },
      'H': {
        imageSrc: '/Asset/statusMood/tired.png',
        statusText: 'Huffftttt...'
      },
      'I': {
        imageSrc: '/Asset/statusMood/spirit.png',
        statusText: 'Wohoooo... Healing!'
      },
    };
  
    const firstLetter = notepadText.charAt(0).toUpperCase();
    
    const imageObj = imageMap[firstLetter];
    
    const statusTextElement = document.getElementById('statusText');
    const statusImageElement = document.getElementById('statusImage');
  
    if (notepadText === "") {
      statusTextElement.innerText = 'Invalid Status';
      statusImageElement.src = '';
    } else if (imageObj) {
      statusTextElement.innerText = imageObj.statusText;
      statusImageElement.src = imageObj.imageSrc;
    } else {
      statusTextElement.innerText = 'Invalid Status';
      statusImageElement.src = '';
    }
  });
  
console.log('Mood Feature is ON!');