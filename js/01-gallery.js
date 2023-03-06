import { galleryItems } from './gallery-items.js';
// Change code below this line

const galleryContainer = document.querySelector('.gallery');
const imagesMarkup = createGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', imagesMarkup);

galleryContainer.addEventListener('click', handleImageClick);

function createGalleryItemsMarkup(images) {
    return images.map(({preview, original, description}) => {
        return `
        <div class="gallery__item">
        <a class="gallery__link" href="${original}">
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </div>
      `;
    }).join('');
}

function handleImageClick(evt) {
    evt.preventDefault();
    if (evt.target.nodeName !== 'IMG') {
        return;
    }

    const modalImg = basicLightbox.create(`<img src="${evt.target.dataset.source}">`, {
        onShow: (modalImg) => { document.addEventListener(`keydown`, escClose)},
        onClose: (modalImg) => { document.removeEventListener(`keydown`, escClose)},
    });

    // const instance = basicLightbox.create(html, {
	// 	onShow: (instance) => console.log('onShow', instance),
	// 	onClose: (instance) => console.log('onClose', instance)
	// })

	// instance.show((instance) => console.log('finished show()', instance))

    modalImg.show();

    function escClose({code}) {
        if (code === `Escape`) {
            modalImg.close();
        }
    }
}

