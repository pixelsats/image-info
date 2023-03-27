const datafromurlForm = document.getElementById('datafromurlform');
const datafromimageForm = document.getElementById('datafromimageform');
const datatoimageForm = document.getElementById('datatoimageform');

// Event listener for URL form submission
datafromurlForm.addEventListener('submit', event => {
  event.preventDefault();

  const imageurl = event.target.elements.url.value;

  fetch('/datafromurl', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ imageurl }),
  })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      document.getElementById('datafromurlresult').innerHTML = JSON.stringify(result.data);
    })
    .catch(error => console.error(error));
});

// Event listener for local image form submission
datafromimageForm.addEventListener('submit', event => {
    event.preventDefault();
  
    const imageform = new FormData(datafromimageForm);
  
    fetch('/datafromimage', {
      method: 'POST',
      body: imageform,
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        document.getElementById('datafromimageresult').innerHTML = JSON.stringify(result.data);
      })
      .catch(error => console.error(error));
});

// Event listener for local image write metadata form submission
datatoimageForm.addEventListener('submit', event => {
    event.preventDefault();
  
    const imageform = new FormData(datatoimageForm);
  
    fetch('/datatoimage', {
      method: 'POST',
      body: imageform,
    })
      .then(response => response.json())
      .then(result => {
        console.log(result);
        document.getElementById('datatoimageresult').innerHTML = "<img src=" + JSON.stringify(result.data) + ">";
      })
      .catch(error => console.error(error));
});