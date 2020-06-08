import React, { Component } from 'react';
import ShowMovie from './ShowMovie';
import config from './config.js'
import './NewStyle.css';
const firebase = require('firebase');

export class MovieGallery extends Component {
	constructor(props) {
		super();
		this.state = {
			movies: [],
			lastOne: '',
			display: 'none',
			current: '',
			lists: [],
      select: '',
      update: false,
		}
	}
	componentDidMount(){
	//check firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    //firebase movies
    this.ref = firebase.database().ref('movies');
    this.ref.on('value', snapshot => {
      	let movies = snapshot.val();
        let temp = [];
        for (let index in movies) {
          temp.push({
            id:  index,
            name:  movies[index].name,
            src:  movies[index].src,
            director:  movies[index].director,
            imdb:  movies[index].imdb,
            plot:  movies[index].plot,
          })
        }
        this.setState({lastOne: temp[temp.length-1]});
        if(temp.length < 9) {
          this.setState({display: 'none'});
        }
        else {
          this.setState({display: 'block'});
        }
    });
    //firebase limit&display
    let first = this.ref.orderByKey().limitToFirst(9);
    first.on('value', snapshot => {
      let movie = snapshot.val();
      let tempf = [];
      for (let index in movie) {
        tempf.push({
          id:  index,
          name:  movie[index].name,
          src:  movie[index].src,
          director:  movie[index].director,
          imdb:  movie[index].imdb,
          plot:  movie[index].plot,
        });
      }
      this.setState({current: tempf[tempf.length-1].id});
      tempf.pop();
      this.setState({movies: tempf});
    });

    //firebase lists
    this.ARef = firebase.database().ref('lists');
    this.ARef.on('value', snapshot => {
      let lists = snapshot.val();
        let temp = [];
        for (let index in lists) {
          temp.push(
            lists[index].name
          )
        }
        this.setState({lists: temp});
    })
  }

  componentWillUnmount() {
    this.ref.off();
    this.ARef.off();
  }






	FunctionC = (event) => {
	let n = event.target.name;
	let v = event.target.value;
	this.setState({[n]: v});
	let select = document.getElementById('list').value;
	if(select === 'all') {
		let ref = firebase.database().ref('movies');
		ref.once('value').then(snapshot => {
			let movies = snapshot.val();
				let tempj = [];
				for (let index in movies) {
					tempj.push({
						id:  index,
						name:  movies[index].name,
						src:  movies[index].src,
						director:  movies[index].director,
						imdb:  movies[index].imdb,
						plot:  movies[index].plot,
					})
				}
				this.setState({lastOne: tempj[tempj.length-1]});
				if(tempj.length < 9) {
					this.setState({display: 'none'});
				}
				else {
					this.setState({display: 'block'});
				}
		});
		let first = ref.orderByKey().limitToFirst(9);
		first.once('value').then(snapshot => {
			let tempb = snapshot.val();
			let tempc = [];
			for (let index in tempb) {
				tempc.push({
					id:  index,
					name:  tempb[index].name,
					src:  tempb[index].src,
					director:  tempb[index].director,
					imdb:  tempb[index].imdb,
					plot:  tempb[index].plot,
				});
			}
			this.setState({current: tempc[tempc.length-1].id});
			tempc.pop();
			this.setState({movies: tempc});
		});
	}
	else {
		let movsInList = [];
		let ref = firebase.database().ref('relationship');
		ref.once('value').then(snapshot => {
			let rels = snapshot.val();
			for (let index in rels) {
				if(rels[index].list === select) {
					movsInList.push(rels[index].mov);
				}
			}
			let movsRef = firebase.database().ref('movies');
			movsRef.once('value').then(snapshot => {
				let movies = snapshot.val();
				let tempj = [];
				for (let index in movies) {
					if (movsInList.includes(index)) {
						tempj.push({
							id:  index,
							name:  movies[index].name,
							src:  movies[index].src,
							director:  movies[index].director,
							imdb:  movies[index].imdb,
							plot:  movies[index].plot,
						})
					}
				}
				if(tempj.length < 9) {
					this.setState({display: 'none'});
				} else {
					this.setState({display: 'block'});
				}
				this.setState({movies: tempj});
			})
		})
	}
 }

	FunctionB() {
	let ref = firebase.database().ref('movies');
	let tempa = ref.orderByKey().startAt(this.state.current).limitToFirst(9);
	tempa.on('value', snapshot => {
		let tempb = snapshot.val();
		let tempc = [];
		for (let index in tempb) {
			tempc.push({
				id:  index,
				name:  tempb[index].name,
				src:  tempb[index].src,
				director:  tempb[index].director,
				imdb:  tempb[index].imdb,
				plot:  tempb[index].plot,
			});
		}
		if(tempc[tempc.length-1].id === this.state.lastOne.id && tempc.length <= 8) {
			this.setState({display: 'none'});
		}
		else {
			this.setState({current: tempc[tempc.length-1].id});
			tempc.pop();
		}
		let tempd = this.state.movies;
		tempd = tempd.concat(tempc);
		this.setState({movies: tempd});
	});
}

FunctionA() {
let select = document.getElementById('search').value.toLowerCase();
let ref = firebase.database().ref('movies');
ref.once('value').then(snapshot => {
	let movies = snapshot.val();
		let tempi = [];
		for (let index in movies) {
			let titles = (movies[index].name).toLowerCase();
			if (titles.includes(select)) {
				tempi.push({
					id:  index,
					name:  movies[index].name,
					src:  movies[index].src,
					director:  movies[index].director,
					imdb:  movies[index].imdb,
					plot:  movies[index].plot,
				})
			}}
		if(tempi.length < 9) {
			this.setState({display: 'none'});
		}
		else {
			this.setState({display: 'block'});
		}
		this.setState({movies: tempi});
})
}

//lightbox
enlarge(poster, title, director, rating, plot, Id){
	document.body.style.overfolw='hidden';
	var lightbox=document.createElement('div');
	lightbox.id='lightbox_id';
	lightbox.className='lightbox_css';

	var picture=document.createElement('img');
	picture.id='picture_id';
	picture.src=poster;

	var box_show = document.createElement('div');
	box_show.id = 'box_show_id';
	box_show.className='box_show_css';
	//^^^^^^^^^
	var box_data = document.createElement('div');
	box_data.id='box_data_id';
	box_data.innerHTML=
	'<span class=\'title\'>'+title+
	'</span><br/><span class=\'director\'> Directed by:  '+director+
	'</span><br/><br/><span class=\'rating\'>imdbRating: '+rating+
	'</span><br/><br/><p>Introduction:' +plot+
	'</p><br/><br/> ';

	var add_option=document.createElement('select');
	add_option.id='add_option_id';
	add_option.style.marginTop='10px';
	let ARef = firebase.database().ref('lists');
	let tempg = [];
	ARef.once('value').then(snapshot => {
		let lists = snapshot.val();
			for (let index in lists) {
				tempg.push(lists[index].name);
			}
			let relationshipRef = firebase.database().ref('relationship');
			relationshipRef.once('value').then(snapshot => {
				let relationship = snapshot.val();
					for (let index in relationship) {
						//here confused mov / list
						if(relationship[index].mov === Id) {
							let place = tempg.indexOf(relationship[index].list);
							tempg.splice(place, 1);
						}
					}
					//option
					var choice = document.createElement('option');
					choice.value = '';
					choice.innerHTML = 'List';
					choice.disabled = 'true';
					choice.selected = 'true';
					choice.hidden = 'true';
					add_option.appendChild(choice);
					for(var x in tempg) {
						choice = document.createElement('option');
						choice.value= tempg[x];
						choice.innerHTML = tempg[x];
						add_option.appendChild(choice);
					}
			});
	});
	var helpshow = document.createElement('div');
	var list_button = document.createElement('button');
	list_button.id = 'list_button_id';
	list_button.innerHTML = 'Add';
	helpshow.appendChild(add_option);
	helpshow.appendChild(list_button);
	list_button.onclick = function () {
		var more = document.getElementById('add_option_id').value;
		if(more.length === 0) {
			alert('Please Select One List!');
		}
		else {
			let formObj = {
				mov: Id,
				list: more,
			};
		firebase.database().ref('relationship').push().set(formObj);
		alert('You Add Successfully!');
		}
	};

	var delete_it = document.createElement('button');
	delete_it.id = 'delete_it_id';
	delete_it.innerHTML = 'Delete';
	delete_it.onclick = function () {
	if(window.confirm('Still Delete?')) {
			let ref = firebase.database().ref('movies');
			ref.on('value', snapshot => {
				let movies = snapshot.val();
					for (let index in movies) {
						if(index === Id) {firebase.database().ref('movies/'+index).remove();}
					}
			})
			let temph = firebase.database().ref('relationship');
			temph.on('value', snapshot => {
				let relations = snapshot.val();
					for (let index in relations) {
						if(relations[index].mov === Id) {firebase.database().ref('relationship/'+index).remove();}
					}
		})
		document.getElementById('lightbox_id').removeChild(document.getElementById('box_show_id'));
		document.body.removeChild(document.getElementById('lightbox_id'));
		document.body.style.overflow = 'auto';
		}
	};
	document.body.appendChild(lightbox);
	document.getElementById('lightbox_id').appendChild(box_show);
	document.getElementById('box_show_id').appendChild(picture);
	document.getElementById('box_show_id').appendChild(box_data);
	document.getElementById('box_data_id').appendChild(helpshow);
	document.getElementById('box_data_id').appendChild(delete_it);
	document.getElementById('lightbox_id').addEventListener('click', function(event) {
		if(event.target.className === 'lightbox_css') {
			document.getElementById('lightbox_id').removeChild(document.getElementById('box_show_id'));
			document.body.removeChild(document.getElementById('lightbox_id'));
			document.body.style.overflow = 'auto';
		}
	});
}


  render() {
    return (
		<div>
			<h1>Welcome To Movie Gallery!</h1>
			<h2>Movie List:</h2>
			<div id='listChoice'>
				<select name='movieChoice' id='list' onChange={this.FunctionC}>
					<option value='all'>*You Can Select A List</option>
					<h1><br/></h1>
					{this.state.lists.map((list) => (
							<option value={list}>{list}</option>
					))}
				</select>
			</div>
			<h2>Search A Movie:</h2>
			<div id='searchBar'>
				<input type='text' id='SearchInput' placeholder='Type Movie Name Here.' name='search' id='search' />
				<button id='searchButton' onClick={this.FunctionA.bind(this)}>Search</button>
			</div>
			<div className='pictures'>
				<ShowMovie movieList={this.state.movies} enlarge={this.enlarge}/>
			</div>
			<div id='loadMore' style={{display: this.state.display}}>
				<button id='loadButton' onClick={this.FunctionB.bind(this)}>Load More</button>
			</div>
		</div>
    );
  }
}
export default MovieGallery;
