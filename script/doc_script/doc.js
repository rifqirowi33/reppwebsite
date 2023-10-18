const icon1Link = document.getElementById('icon1-link');
const icon2Link = document.getElementById('icon2-link');
const icon3Link = document.getElementById('icon3-link');
const icon4Link = document.getElementById('icon4-link');
const icon5Link = document.getElementById('icon5-link');
const windowElement = document.getElementById('myWindow');
const contentElement = document.getElementById('windowContent');
const windowHeader = document.querySelector('.window-header');
const windowTitle = document.querySelector('.window-title');
const maximizeButton = windowElement.querySelector('.maximize-button');

let isDragging = false;
let isMaximized = false;
let dragStartX;
let dragStartY;
let initialX;
let initialY;


windowHeader.addEventListener('mousedown', handleDragStart);
windowHeader.addEventListener('touchstart', handleDragStart);
windowHeader.addEventListener('touchmove', handleDrag);

function handleDragStart(e) {
    e.preventDefault();

    if (e.type === 'mousedown') {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
    } else if (e.type === 'touchstart') {
        isDragging = true;
        dragStartX = e.touches[0].clientX;
        dragStartY = e.touches[0].clientY;
    }

    initialX = parseFloat(getComputedStyle(windowElement).left);
    initialY = parseFloat(getComputedStyle(windowElement).top);

    document.addEventListener('mousemove', handleDrag);
    document.addEventListener('touchmove', handleDrag);
    document.addEventListener('mouseup', handleDragEnd);
    document.addEventListener('touchend', handleDragEnd);
    document.addEventListener('touchcancel', handleDragEnd);
}

function handleDrag(e) {
    if (!isDragging) return;

    let clientX, clientY;

    if (e.type === 'mousemove') {
        clientX = e.clientX;
        clientY = e.clientY;
    } else if (e.type === 'touchmove') {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    }

    const offsetX = clientX - dragStartX;
    const offsetY = clientY - dragStartY;

    windowElement.style.left = `${initialX + offsetX}px`;
    windowElement.style.top = `${initialY + offsetY}px`;
}

function handleDragEnd() {
    isDragging = false;

    document.removeEventListener('mousemove', handleDrag);
    document.removeEventListener('touchmove', handleDrag);
    document.removeEventListener('mouseup', handleDragEnd);
    document.removeEventListener('touchend', handleDragEnd);
    document.removeEventListener('touchcancel', handleDragEnd);
}

windowElement.style.display = 'none';

function updateWindowTitle(title) {
    windowTitle.textContent = title;
}

// my compooper window
icon1Link.addEventListener('click', (event) => {
    event.preventDefault();
    const contentURL = './Asset/content/doc_content/mypc.html';
    openWindow(contentURL);
    updateWindowTitle('MY COMPOOPER');
});

// my project window
icon2Link.addEventListener('click', (event) => {
    event.preventDefault();
    const contentURL = './myproject.html';
    openWindow(contentURL);
    updateWindowTitle('MY PROJECT');
});

// my games project
icon3Link.addEventListener('click', (event) => {
    event.preventDefault();
    const contentURL = './mygames.html';
    openWindow(contentURL);
    updateWindowTitle('MY GAMES');
});

// my Photos
icon4Link.addEventListener('click', (event) => {
    event.preventDefault();
    const contentURL = './myphotos.html';
    openWindow(contentURL);
    updateWindowTitle('PHOTOS');
});

// my BLOG
icon5Link.addEventListener('click', (event) => {
    event.preventDefault();
    const contentURL = './blog.html';
    openWindow(contentURL);
    updateWindowTitle('BLOG');
});

windowElement.querySelector('.maximize-button').addEventListener('click', () => {
    maximizeWindow();
});

windowElement.querySelector('.maximize-button').addEventListener('touchstart', () => {
    maximizeWindow();
});

windowElement.querySelector('.close-button').addEventListener('click', () => {
    closeWindow();
});

windowElement.querySelector('.close-button').addEventListener('touchstart', () => {
    closeWindow();
});

windowElement.querySelector('.resize-handle').addEventListener('mousedown', (e) => {
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = parseInt(document.defaultView.getComputedStyle(windowElement).width, 10);
    startHeight = parseInt(document.defaultView.getComputedStyle(windowElement).height, 10);

    document.addEventListener('mousemove', resizeWindow);
    document.addEventListener('mouseup', stopResize);
});

function openWindow(contentURL) {
    contentElement.innerHTML = '';
    fetch(contentURL)
        .then(response => response.text())
        .then(content => {
            contentElement.innerHTML = content;
            windowElement.style.display = 'block';
            adjustContentSize();
            centerWindow();
        });
}

function closeWindow() {
    windowElement.style.display = 'none';
    windowElement.classList.remove('centered');
}

function centerWindow() {
    windowElement.classList.add('centered', isMaximized);
}

function adjustContentSize() {
}

function maximizeWindow() {
    if (isMaximized) {
        windowElement.style.width = originalWidth + 'px';
        windowElement.style.height = originalHeight + 'px';
        windowElement.style.left = originalX + 'px';
        windowElement.style.top = originalY + 'px';
        adjustContentSize();
        maximizeButton.textContent = '□';
    } else {
        originalWidth = parseInt(document.defaultView.getComputedStyle(windowElement).width, 10);
        originalHeight = parseInt(document.defaultView.getComputedStyle(windowElement).height, 10);
        originalX = parseInt(document.defaultView.getComputedStyle(windowElement).left, 10);
        originalY = parseInt(document.defaultView.getComputedStyle(windowElement).top, 10);

        windowElement.style.width = '258%';
        windowElement.style.height = '93%';
        windowElement.style.left = '130%';
        windowElement.style.top = '47%';
        adjustContentSize();
    }
    isMaximized = !isMaximized;
}

function resizeWindow(e) {
    if (!isResizing) return;
    const newWidth = startWidth + (e.clientX - startX);
    const newHeight = startHeight + (e.clientY - startY);

    windowElement.style.width = `${newWidth}px`;
    windowElement.style.height = `${newHeight}px`;
    contentElement.style.height = `calc(100% - 40px)`;
}

function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', resizeWindow);
    document.removeEventListener('mouseup', stopResize);
}