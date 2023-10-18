fetch('/api/status')
      .then(response => response.json())
      .then(data => {
        const imageMap = { /* ... */ };
        const firstLetter = data.status.charAt(0).toUpperCase();
        const imageObj = imageMap[firstLetter];

        const statusTextElement = document.getElementById('statusText');
        const statusImageElement = document.getElementById('statusImage');

        if (!data.status || !imageObj) {
          statusTextElement.innerText = 'Invalid Status';
          statusImageElement.src = '';
        } else {
          statusTextElement.innerText = imageObj.statusText;
          statusImageElement.src = imageObj.imageSrc;
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });