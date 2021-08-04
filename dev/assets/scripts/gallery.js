function Gallery(gallery){
    if( !(gallery instanceof Element) ) return;

    //document body
    const bd = document.body;

    //find the actual gallery
    const findGallery = gallery.querySelector('.gallery');

    //find all images inside that gallery
    const images = Array.from(findGallery.querySelectorAll('.item'));

    //current image opened
    let currentImage;

    //navigate
    let prevButton, nextButton;

    function showModalContent(el) {

        currentImage = el;

        //get dataset information from the image
        let modalCont = {
            bg: `${el.style.backgroundImage.slice(4, -1).replace(/"/g, "")}`,
            title: `${el.dataset.title}`,
            desc: `${el.dataset.description}`,
        }

        //destructing
        let {bg, title, desc} = modalCont;
        
        //creating modal content
        let html = `
            <div class="modal">
                <button aria-label="Previous Photo" class="prev">←</button>
                <div class="modalInner">
                    <figure>
                        <img src="${bg}" alt="${title}">
                    </figure>
                    <div class="modal-contents">
                    ${ title ? "<h2>" + title + "</h2>" : "" } 
                    ${ desc ? "<p>" + desc + "</p>" : "" }
                    </div>
                </div>
                <button class="next" aria-label="Next Photo">→</button>
            </div>
        `;

        //if there´s already a modal, stop from creating another one
        if( bd.querySelector('.modal') ) {
            
            //get the new fields img, h2 and p from the created modal
            const newImage = bd.querySelector('.modal').querySelector('img');
            const newTitle = bd.querySelector('.modal').querySelector('h2');
            const newDesc = bd.querySelector('.modal').querySelector('p');
            
            //replace its contents with the current image data
            newImage.src = `${el.style.backgroundImage.slice(4, -1).replace(/"/g, "")}`;
            !newTitle ? "" : newTitle.textContent = el.dataset.title;
            !newDesc ? "" : newDesc.textContent = el.dataset.description;
            
        } else {
            //if theres no modal, then create and insert at the bottom of the body
            bd.insertAdjacentHTML('beforeend', html); 
        }

        !bd.querySelector('.modal') ? "" : bd.querySelector('.modal').addEventListener('click', handleClickOutside);

        prevButton = bd.querySelector('.prev');
        nextButton = bd.querySelector('.next');

        prevButton.addEventListener('click', showPrevImage);
        nextButton.addEventListener('click', showNextImage);

        window.addEventListener('keyup', handleKeyUpEvent);

        openModal(el);

    }

    function openModal(){
        //warn the body that the modal is open
        bd.classList.add('modal-is-open');
        
        //insert the open class after some time
        var seconds = 300;
        setTimeout(function() {
            bd.querySelector('.modal').classList.add('open');
        }, seconds);

    }

    function closeModal() {
        //check if there's a modal opened
        let isModalOpen = bd.matches('.modal-is-open');
        if( isModalOpen ) {
            //if so, remove the body class
            bd.classList.remove('modal-is-open');
            
            //close the modal
            bd.querySelector('.modal').classList.remove('open');
        }
        
    }
   
    function showImage(el) {

        //stops if there's no element
        if( !el ) return;

        showModalContent(el);

    }

    //on clicking the left arrow
    function showPrevImage() {
        showImage( currentImage.previousElementSibling || findGallery.lastElementChild );
    }
    
    //on clicking the right arrow
    function showNextImage(){
        showImage( currentImage.nextElementSibling || findGallery.firstElementChild );
    }

    function handleKeyUpEvent(e) {
        if( e.key === 'Escape' ) return closeModal();
        if( e.key === 'ArrowRight' ) return showNextImage()
        if( e.key === 'ArrowLeft' ) return showPrevImage();
    }

    function handleClickOutside(e){
        if( e.target === e.currentTarget ) closeModal();
    }

    //click on every image
    images.forEach(image => image.addEventListener('click', e => showImage(e.currentTarget)));
    images.forEach(image => image.addEventListener('keyup', e => handleKeyEvents(e)));    
    
}

const gal1 = Gallery(document.querySelector('.vida-em-lisboa'));
const gal2 = Gallery(document.querySelector('.pudim')); 