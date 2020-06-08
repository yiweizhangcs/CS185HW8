import React, { Component } from 'react';
import config from './config.js';
const firebase = require('firebase')
//require
var d3 = require('d3');
//claim: according to CS185 discussion videos and related library or package
//watched one youtube viedo.
//searched some format style online.


//initalize
let ActorsBefore = [];
let Place = [];
//data
let data = {
  nodes: [],
  links: [],}

export class GraphViz extends Component {
  constructor(props) {
    super();
    this.state = {
      Information: {},}
  }

  drag=(simulation, helperA, BarHeight)=>{
    //dragStarted
    function dragStarted(d) {
      if(!d3.event.active) {simulation.alphaTarget(0.3).restart();}
      d.fx = d.x;
      d.fy = d.y;
    }
    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
      helperA.style('top', (d.fy+BarHeight-30)+'px').style('left',(d.fx+40)+'px');
    }
    //dragEnded
    function dragEnded(d) {
      if(!d3.event.active) {simulation.alphaTarget(0);}
      d.fx = null;
      d.fy = null;}
    // return  (video)
    return d3.drag()
      .on('start', dragStarted)
      .on('drag', dragged)
      .on('end', dragEnded);
  }

  chart(nodes, links) {
    const BarHeight = document.getElementsByClassName('nav-bar')[0].offsetHeight;
    const height = window.innerHeight-BarHeight;
    const width = window.innerWidth;
    const svg = d3.create('svg').attr('viewBox', [0, 0, width, height]);
    //links and nodes
    const obj_links = links.map(d => Object.create(d));
    const obj_nodes = nodes.map(d => Object.create(d));
    //link
    const link = svg.append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(obj_links)
      .join('line')
      .attr('stroke-width', d => Math.sqrt(d.value));
    // helper radius
    const radius = (node) => {
      if(node.type === 'actor') {return 10;}
      return 40;}
    const helperB = (node) => {
      if(node.type === 'movie') {return node.src;}
      return '';}
    //simualtion
    const simulation = d3.forceSimulation(obj_nodes)
      .force('link', d3.forceLink().links(obj_links).id(d => { return d.name; }).distance(200))
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width/2, height/2));
    let helperA = d3.select('body').append('div').style('position', 'absolute').style('z-index', '10').style('visibility', 'hidden');
    svg.append('defs').selectAll('pattern').data(obj_nodes).enter().append("pattern")
      .attr('id', function(d) {
        return 'id-'+d.id;})
      .attr('patternUnits', 'objectBoundingBox').attr('height', 1).attr('width', 1)
      .append('image').attr('xlink:href', helperB).attr('y', -34).attr('x', -34).attr('height', 210).attr('width', 210);
  //nodes
    const node = svg.append('g')
        .attr('stroke', '#fff')
        .attr('cursor', 'pointer')
        .attr('stroke-opacity', 1.5)
        .selectAll('circle')
        .data(obj_nodes)
        .join('circle')
        .attr('r', radius)
        .style('fill', function(d) {
          if(d.type === 'movie') {
            return ("url(#id-"+d.id+")");}
          return d3.color('steelblue');
        })
    node.on('mouseover', function(node){
        if(node.type === 'actor') {
          helperA.text(node.name);
          helperA.style('top', (d3.event.y-19)+'px').style('left',(d3.event.x+19)+'px');
          helperA.style('visibility', 'visible');}
      })
      .on('mouseout', function(){
        return helperA.style('visibility', 'hidden');})
      .call(this.drag(simulation, helperA, BarHeight));
    //simulation according to videos
    simulation.on('tick', () => {
      link.attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);
      node.attr('cx', d => d.x)
        .attr('cy', d => d.y);
    });
    return svg.node();
  }
  componentDidMount(){
    if (!firebase.apps.length) {
      firebase.initializeApp(config);  }
    let GraphMovies = [];
    let ref = firebase.database().ref('relationship');
    ref.once('value').then(snapshot => {
      let tempA = snapshot.val();
      for (let index in tempA) {
        if(tempA[index].list === 'GraphViz') {
          GraphMovies.push(tempA[index].mov);}}
    });
    let Information = [];
    let DataBaseMovies = firebase.database().ref('movies');
    DataBaseMovies.once('value').then(snapshot=>{
      let movies=snapshot.val();
      for (let index in movies) {
        if (GraphMovies.includes(index)) {
          Information.push({
            id:index,
            src:movies[index].src,
            name:movies[index].name,
            actors:movies[index].actors,})
        }
      }
      let nb = 0;
      for(let m in Information) {
        let tempB={
          type:'movie',
          src:Information[m].src,
          name:Information[m].name,
          id:nb,}
        nb++;
        data.nodes.push(tempB);
        let actors=Information[m].actors.split(', ');
        for(let n in actors) {
          let tempC={
            type:'actor',
            name:actors[n],
            id:nb,
          }
          nb++;
          if(!(ActorsBefore.includes(actors[n]))) {
            ActorsBefore.push(actors[n]);
            data.nodes.push(tempC);
            let tempD=data.nodes.indexOf(tempC);
            Place.push(tempD);}
          let tempE = {
            source:Information[m].name,
            target:actors[n],}
          data.links.push(tempE);
        }
      }

      const tempF=document.getElementById('svg');
      tempF.appendChild(this.chart(data.nodes, data.links));
    });
  }

  componentWillUnmount() {
    data.nodes = [];
    data.links = [];
    ActorsBefore = [];
    Place = [];
  }

  render() {return(<div id='svg'></div>);}
}
export default GraphViz;
