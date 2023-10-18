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

readFile("/Asset/content/log.txt", function (content) {
  var logsElement = document.getElementById("logs");
  var logLines = content.split("\n");

  var html = "<h1>UPDATE LOG</h1><br><div class='scrollable-content'>";

  for (var i = 0; i < logLines.length; i++) {
    var line = logLines[i].trim();
    if (line !== "") {
      if (line.startsWith(">")) {
        line = "❖" + line.substring(1);
      }
      if (line.startsWith("❖")) {
        html += "<p1>" + line + "</p1>";
      } else {
        html += "<li>" + line + "</li>";
      }
      html += "<br>";
    }
  }

  html += "</div>";
  logsElement.innerHTML = html;
});

console.log('Log Activity ON!');