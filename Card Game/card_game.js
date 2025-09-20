const IMAGES = [
  "./img/image1.jpg",
  "./img/image2.jpg",
  "./img/image3.jpg",
  "./img/image4.jpg",
  "./img/image5.jpg",
  "./img/image6.jpg",
  "./img/image1.jpg",
  "./img/image2.jpg",
  "./img/image3.jpg",
  "./img/image4.jpg",
  "./img/image5.jpg",
  "./img/image6.jpg",
];

function getSmallImagesTemplate(index) {
  return `
    <div class="box_layout">
      <div class="box_inner">
        <div class="box_front">
         ?
        </div>
        <div class="box_back">
          <img class="image" src="${IMAGES[index]}" />
        </div>
      </div>
    </div>`;
}

function renderImages() {
  const contentRenderImages = document.getElementById("box");
  contentRenderImages.innerHTML = "";

  for (let i = 0; i < IMAGES.length; i++) {
    contentRenderImages.innerHTML += getSmallImagesTemplate(i);
  }

  // Elemente müssen gerendert sein 
  const flipCards = document.querySelectorAll(".box_inner");
  flipCards.forEach((card) => {
    card.addEventListener("click", function () {
      card.classList.toggle("box_flip_layout");
    });
  });
}

// DOM muss mal laden 
document.addEventListener("DOMContentLoaded", function () {
  renderImages();
});


/*

document.getElementById("box_inner").addEventListener("click", function flipImage() {
  document.getElementById("box_layout").classList.add("box_flip_layout");
});

//bräuchte man eine Klasse die auch $ § platzhalter  ein Array ist?
*/
/*
function openImage() {
  flipImage.innerHTML = `
   <div class="box_flip_layout">
  <div> <img class="image"/>
  <div class="box_back">
    </div>
    </div>`;
}
  */

//Sequence has to be changed at the start of the game
//Pics should be covered (turn around effect, animation, I don t know)
//If player finds matching pic, both pictures should stay open
//If player can t find matching pic, pictures should be covered (animation) again
//After all matching pics are found , (finished) animation at the end?

//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_flip_image2 flip at click
//https://coureywong.medium.com/how-to-shuffle-an-array-of-items-in-javascript-39b9efe4b567
//https://www.google.com/search?sca_esv=21786a6342113ead&sxsrf=AE3TifNutRo6IiLVVWhQc8OxrtDtkQ7bug:1748717254801&q=arrange+cards+randomly+javascript&udm=7&fbs=AIIjpHxU7SXXniUZfeShr2fp4giZ1Y6MJ25_tmWITc7uy4KIeoJTKjrFjVxydQWqI2NcOha3O1YqG67F0QIhAOFN_ob1aWGQOelbxvw0PKo40QtwvZMGAT8mh52EQduMaEwrkL-OLEnIgHQ7APoKxFV9hua55yCiA1pSqi8NqYaykPBkHQYt8sF3mLIH7UYTHYwhcJqGpMVh&sa=X&ved=2ahUKEwjd0qO2r86NAxU4RPEDHQ7EGwcQtKgLegQIGxAB&biw=1581&bih=929&dpr=2#fpstate=ive&vld=cid:8e95bedb,vid:4EcQisuDNYw,st:0
