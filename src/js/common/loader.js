let loader = (function() {
  let ldr = document.getElementById('loader');
  let loaderInner = ldr.querySelector('.loader__inner');
  const progressBar = document.querySelector('.pace-progress');
  let dataProgress;
  let intervalID;

  function updateLoader() {
    intervalID = setInterval(() => {
      dataProgress = progressBar.dataset.progressText;
      loaderInner.style.width = dataProgress;
    }, 50);
  }

  // if(dataProgress === '100%') {
  //   console.log('done');
  //   clearInterval(intervalID);
  // }

  updateLoader();

  Pace.on('hide', function() {
    ldr.classList.add('fadeOut');

    setTimeout(function() {
      ldr.classList.add('hidden');
    }, 500);
  });
})();
