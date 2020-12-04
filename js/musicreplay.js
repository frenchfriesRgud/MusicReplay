// Music Replay 2020
// Created by Anthony.media
// 2020-12-03
// https://musicreplay.frenchfriesrgud.repl.co/?duration=777&genre=rocknroll&artwork=afasfdasfd&a1=z&a2=z&a3=z&a4=z&a5=z&s1=x&s2=x&s3=x&s4=x&s5=x#share
console.log('/js/musicreplay.js connected');
function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
    return '%' + c.charCodeAt(0).toString(16);
  });
}

// TODO: Build URL Strings to enable sharing 

// let testString = 'testing.com/adfsfhttps:/`/(#@!%^&^^^^&*((=---)))()())))(((()))))www.imgur.com?==asdfas'
// let test = fixedEncodeURIComponent(testString);
// console.log(testString)
// console.log(test);
// console.log(decodeURIComponent(test))

const app = {
	vendor: 'apple',
	state: '',
    router: {
        params: null,
        getParams: () => {
            if(window.location.search){
                app.router.params = new URLSearchParams(window.location.search);
                return;
            } else {
                return console.warn('No search params include in URL');
            }
        },
        buildFromParams: () => {
            //duration
            form.data.duration = app.router.params.get('duration');
            //genre
            form.data.genre = app.router.params.get('genre');
            // artwork
            form.data.artwork = app.router.params.get('artwork');
            // loop
            for(let index = 1; index <= 5; index++){
                console.log(index);
                // artists
                form.data.artists.push(app.router.params.get(`a${index}`));
                // songs
                form.data.songs.push(app.router.params.get(`s${index}`));
            }
        }
    },
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
            if(app.state === "build"){
			    source.getData();
            }

			// hide the build view
			app.generator.hide();

			// show the render view
			app.replay.show();

			// update the data
			app.replay.display.duration.innerHTML = (source.data.duration * 60).toLocaleString();
			app.replay.display.genre.innerHTML = source.data.genre;
			app.replay.display.artwork.style.background = `url('${source.data.artwork}')`;
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

// On load 
if (window.location.hash === '#share') {
	console.log('render the sharable view');
    app.state = 'share';
    app.router.getParams();
    app.router.buildFromParams();
    app.replay.build(form);
} else {
	console.log('Render the build view');
    app.state = 'build';
}

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

form.input.artwork.addEventListener('input', event => {
    document.querySelector('.url-preview').classList.remove('hide');
    try {
        let url = `url('${form.input.artwork.value}')`;
        document.querySelector('.preview').style.background = url;
    } catch(err){
        console.log(err);
    }
    console.log('artwork changed');
    });