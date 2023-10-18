function lazyLoadBoxes(entries, observer) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var fileName = entry.target.getAttribute("data-file");
        showLoadingAnimation();
        readNotepadFile("/Asset/diary", fileName)
          .then(function () {
            observer.unobserve(entry.target);
            hideLoadingAnimation();
          });
      }
    });
  }
  
  function showLoadingAnimation() {
    var loadingAnimation = document.getElementById("loading-animation");
    loadingAnimation.style.display = "block";
  }
  
  function hideLoadingAnimation() {
    var loadingAnimation = document.getElementById("loading-animation");
    loadingAnimation.style.display = "none";
  }  