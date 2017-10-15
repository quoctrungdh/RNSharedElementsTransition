import { BORDER_OFFSET, TARGET_HEIGHT } from './constants';

export function processImages(photos) {
	return photos.map(photo => {
		const aspectRatio = photo.width / photo.height;
		photo.width = TARGET_HEIGHT * aspectRatio;
		photo.height = TARGET_HEIGHT;
		return photo;
	})
}

export function buildRows(processedImages, deviceWidth) {
	let currentRow = 0;
	let currentWidth = 0
	let rows = [];

	processedImages.forEach(image => {
		if (currentWidth >= deviceWidth) {
			currentRow++;
			currentWidth = 0;
		}

		if(!rows[currentRow]) {
			rows[currentRow] = [];
		}

		rows[currentRow].push(image);
		currentWidth += image.width;
	})

	return rows;
}

// sum up images width and borderOffset
function getCumulativeWidth(images) {
	const sumHeight = images.reduce((sumWidth, image) => sumWidth + image.width, 0);

	return sumHeight + ((images.length - 1) * BORDER_OFFSET);
}

function makeSmaller(image, amount = 1) {
	const newHeight = image.height - amount;
	image.width = image.width * (newHeight / image.height);
	image.height = newHeight;

	return image;
}

function fitImagesInRows(images, deviceWidth) {
	while(getCumulativeWidth(images) > deviceWidth) {
		for(let i = 0; i < images.length; i++) {
			images[i] = makeSmaller(images[i])
		}
	}

	return images;
}

export function normalizeRows(rows, deviceWidth) {
	for (let i = 0; i< rows.length; i++) {
		rows[i] = fitImagesInRows(rows[i], deviceWidth);

		const difference = deviceWidth - getCumulativeWidth(rows[i]);
		const amountOfImages = rows[i].length;

		if (amountOfImages > 1 && difference < 10) {
			const addToEach = difference / amountOfImages;
			for (let n = 0; n < rows[i].length; n++) {
				rows[i][n].width += addToEach;
			}
			rows[i][rows[i].length - 1].width += deviceWidth - getCumulativeWidth(rows[i])
		}
	}
	return rows;
}