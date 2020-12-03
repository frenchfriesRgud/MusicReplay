// Music Replay 2020
// Created by Anthony.media
// 2020-12-03
console.log('/js/musicreplay.js connected');
if (window.location.hash === '#share') {
	console.log('render the sharable view');
} else {
	console.log('Render the build view');
}
const app = {
	vendor: 'apple',
	state: '',
	generator: {
		el: document.querySelector('.generate'),
		show: () => {
			app.generator.el.classList.remove('hide');
		},
		hide: () => {
			app.generator.el.classList.add('hide');
		}
	},
	replay: {
		el: document.querySelector('.replay'),
		display: {
			artists: document.querySelectorAll('.billboard .artists li'),
			songs: document.querySelectorAll('.billboard .songs li'),
			artwork: document.querySelector('.poster'),
			duration: document.querySelector('.wrap .duration span'),
			genre: document.querySelector('.wrap .genre span')
		},
		show: () => {
			app.replay.el.classList.remove('hide');
		},
		hide: () => {
			app.replay.el.classList.add('hide');
		},
		build: (source) => {
			source.getData();

			// hide the build view
			app.generator.hide();

			// show the render view
			app.replay.show();

			// update the data
			app.replay.display.duration.innerHTML = (source.data.duration * 60).toLocaleString();
			app.replay.display.genre.innerHTML = source.data.genre;
			app.replay.display.artwork.src = source.data.artwork;
			// loop through the billboard data
			app.replay.display.artists.forEach((artist, index) => {
				artist.innerHTML = source.data.artists[index];
			});
			app.replay.display.songs.forEach((song, index) => {
				song.innerHTML = source.data.songs[index];
			});
		}
	}
};

const tutorial = {
	el: document.querySelector('.tutorial'),
	dismissBtn: document.querySelector('#dismissTutorial'),
	hide: () => {
		tutorial.el.classList.add('hide');
	}
};

const form = {
	el: document.querySelector('#build'),
	show: () => {
		form.el.classList.remove('hide');
	},
	input: {
		artists: document.querySelectorAll('input[name="artists"]'),
		songs: document.querySelectorAll('input[name="songs"]'),
		artwork: document.querySelector('input[name="artwork"]'),
		duration: document.querySelector('input[name="duration"]'),
		genre: document.querySelector('input[name="genre"]')
	},
	getData: () => {
		form.input.artists.forEach((artist) => {
			form.data.artists.push(artist.value);
		});
		form.input.songs.forEach((song) => {
			form.data.songs.push(song.value);
		});
		form.data.artwork = form.input.artwork.value;
		form.data.duration = form.input.duration.value;
		form.data.genre = form.input.genre.value;
	},
	data: {
		artists: [],
		songs: [],
		artwork: null,
		duration: null,
		genre: null
	}
};

// Event Listeners

tutorial.dismissBtn.addEventListener('click', () => {
	tutorial.hide();
	form.show();
});

form.el.addEventListener('submit', (event) => {
	event.preventDefault();
	app.replay.build(form);
	console.log('form submitted');
});
