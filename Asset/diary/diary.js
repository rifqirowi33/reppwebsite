var notepadFiles = [

  "20 AUG 2023.txt",
  "19 AUG 2023.txt",
  "18 AUG 2023.txt",
  "15 AUG 2023.txt",
  "14 AUG 2023.txt",
  "13 AUG 2023.txt",
  "12 AUG 2023.txt",
  "11 AUG 2023.txt",
  "10 AUG 2023.txt",
  "30 JUL 2023.txt",
  "28 JUL 2023.txt",
  "26 JUL 2023.txt",
  "24 JUL 2023.txt",
  "21 JUL 2023.txt",
  "20 JUL 2023.txt",
  "19 JUL 2023.txt",
  "10 JUL 2023.txt",
  "13 APR 2023.txt",
  "1 JUL 2023.txt",
  "1 JAN 2023.txt",
  "6 OCT 2022.txt",
  "26 SEPT 2022.txt",
  "19 SEPT 2022.txt",
  "7 SEPT 2022.txt",
  "27 AUG 2022.txt",
  "26 AUG 2022.txt",
  "25 AUG 2022.txt",
  "24 AUG 2022.txt",
  "23 AUG 2022.txt",
  "22 AUG 2022.txt",
  "20 AUG 2022.txt",
  "13 AUG 2022.txt",
  "11 AUG 2022.txt",
  "28 JUL 2022.txt",
  "17 JUL 2022.txt",
  "25 JUN 2022.txt",
  "14 JUN 2022.txt",
  "12 JUN 2022.txt",
  "12 MARCH 2022.txt",
  "5 FEB 2022.txt",
  "5 JAN 2022.txt",
  "1 JAN 2022.txt",
  "31 DEC 2021.txt",
  "30 DEC 2021.txt",
  "29 DEC 2021.txt",
  "16 OCT 2021.txt",
];

var notepadBoxes = [];

function addBox(content) {
  var dateRegex = /^(\d{1,2}\s+[A-Z]+\s+\d{4})\s+/;
  var dateMatch = content.match(dateRegex);

  var date = dateMatch ? dateMatch[1] : "";
  var description = dateMatch ? content.replace(dateRegex, "") : "";

  var box = document.createElement("div");
  box.classList.add("content");
  box.innerHTML = `<h3>${date}</h3><p1>${description}</p1>`;

  notepadBoxes.push(box);
}

function renderNotepadBoxes() {
  var container = document.getElementById("container");
  container.innerHTML = "";

  notepadBoxes.forEach(function (box) {
    container.appendChild(box);
  });

  scrollToRight();
}

function scrollToRight() {
  var containerScroll = document.querySelector(".scrollable-content");
  containerScroll.scrollLeft = 0;
}

function readNotepadFile(folderPath, fileName) {
  return fetch(`${folderPath}/${fileName}`)
    .then(function (response) {
      return response.text();
    })
    .then(function (content) {
      addBox(content);
    })
    .catch(function (error) {
      console.log("Error:", error);
    });
}

function readAllNotepadFiles() {
  function loadNextNotepad(index) {
    if (index >= notepadFiles.length) {
      sortNotepadBoxes();
      renderNotepadBoxes();
      scrollToRight();
      return;
    }

    var fileName = notepadFiles[index];
    readNotepadFile("/Asset/diary", fileName)
      .then(function () {
        loadNextNotepad(index + 1);
      });
  }

  loadNextNotepad(0);
}

function sortNotepadBoxes() {
  notepadBoxes = notepadBoxes.filter(function (box) {
    return box.querySelector("h3").innerText !== "";
  });

  notepadBoxes.sort(function (box1, box2) {
    var date1 = box1.querySelector("h3").innerText;
    var date2 = box2.querySelector("h3").innerText;

    function convertToDate(dateStr) {
      var parts = dateStr.split(" ");
      var months = [
        "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
        "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"
      ];
      var monthIndex = months.indexOf(parts[1].toUpperCase());
      var formattedDate = `${parts[2]}-${monthIndex + 1}-${parts[0].padStart(2, '0')}`;
      return new Date(formattedDate);
    }

    var dateObj1 = convertToDate(date1);
    var dateObj2 = convertToDate(date2);

    return dateObj2 - dateObj1;
  });
}

readAllNotepadFiles();
