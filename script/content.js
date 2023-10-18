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
  
  readFile("/Asset/content/intro.txt", function (content) {
    var contentElement = document.getElementById("contentPlaceholder");
    contentElement.innerHTML = content;
  });

console.log('intro!!!');
  