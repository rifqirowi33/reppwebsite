// JavaScript

var typingInProgress = false;
var timeoutID;

function resetDialog() {
    var dialog = document.getElementById("dialog");
    var dialogText = dialog.querySelector('.typing-animation');
    dialogText.innerHTML = '';
    dialog.style.display = 'none';
}

function showTextWithTyping(text) {
    resetDialog();

    var dialog = document.getElementById("dialog");
    var dialogText = dialog.querySelector('.typing-animation');

    var i = 0;
    var speed = 50;
    dialog.style.display = 'block';

    function typeWriter() {
        if (i < text.length) {
            var char = text.charAt(i) === '<' ? "&lt;" : text.charAt(i);
            dialogText.innerHTML += char;
            i++;
            timeoutID = setTimeout(typeWriter, speed);
        } else {
            typingInProgress = false;
        }
    }

    typingInProgress = true;
    typeWriter();
}

function showTextWithoutTyping(text) {
    var dialog = document.getElementById("dialog");
    var dialogText = dialog.querySelector('.typing-animation');
    dialogText.innerHTML = text;
}

function breakTextIntoParagraphs(text, maxChars) {
    var paragraphs = [];
    var lines = text.split('\n');

    lines.forEach(line => {
        var words = line.split(' ');
        var currentLine = "";
        words.forEach(word => {
            if (currentLine.length + word.length + 1 <= maxChars) {
                currentLine += word + " ";
            } else {
                paragraphs.push(currentLine.trim());
                currentLine = word + " ";
            }
        });

        if (currentLine !== "") {
            paragraphs.push(currentLine.trim());
        }
    });

    return paragraphs.join('\n');
}

function loadInitialNotepad(file) {
    fetch("/Asset/content/" + file)
        .then(response => response.text())
        .then(text => {
            var newText = "REPP : ";
            var paragraphs = breakTextIntoParagraphs(text, 500);
            showTextWithoutTyping(newText);
            if (!typingInProgress) {
                clearTimeout(timeoutID);
                showTextWithTyping(newText + "\n" + paragraphs); // Animasi typing untuk notepad awal
            }
        })
        .catch(error => {
            console.error("Error loading initial notepad:", error);
        });
}

function showDialogWithTyping(text) {
    resetDialog();

    var dialog = document.getElementById("dialog");
    var dialogText = dialog.querySelector('.typing-animation');

    var i = 0;
    var speed = 30;
    dialog.style.display = 'block';

    function typeWriter() {
        if (i < text.length) {
            var char = text.charAt(i) === '<' ? "&lt;" : text.charAt(i);
            dialogText.innerHTML += char;
            i++;
            timeoutID = setTimeout(typeWriter, speed);
        } else {
            typingInProgress = false;
        }
    }

    typingInProgress = true;
    typeWriter();
}

function readFile(aElement) {
    var dataFile = aElement.getAttribute("data-file");
    fetch("/Asset/content/" + dataFile)
        .then(response => response.text())
        .then(text => {
            var newText = "REPP : ";
            var paragraphs = breakTextIntoParagraphs(text, 500);
            showTextWithoutTyping(newText);
            if (!typingInProgress) {
                clearTimeout(timeoutID);
                showDialogWithTyping(newText + "\n" + paragraphs); // Animasi mengetik hanya untuk isi notepad
            }
        })
        .catch(error => {
            console.error("Error reading file:", error);
            typingInProgress = false;
        });
}

function addClickListenerToA() {
    var aElements = document.querySelectorAll("a");
    aElements.forEach(a => {
        a.addEventListener("click", function (event) {
            event.preventDefault();
            if (!typingInProgress) {
                readFile(a);
            }
        });
    });
}

// Tambahkan inisialisasi notepad saat halaman dimuat
document.addEventListener("DOMContentLoaded", function () {
    var initialNotepadFile = "/show.txt"; // Ganti dengan nama file notepad yang ingin ditampilkan awal
    loadInitialNotepad(initialNotepadFile);
});

addClickListenerToA();
