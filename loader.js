var loader = document.getElementById('loaderSection');

window.addEventListener('load', function(){
	$('.loaderSection').addClass('loaded');
})

/*
$(document).ready(function() {
 
	// Fakes the loading setting a timeout
	  setTimeout(function() {
		  $('.loaderSection').addClass('loaded');
		}, 2000);
  });
 */


//Loader Animation

function getAllMasks(str){
	const paths = [{numMasked: 0, mask: ''}];
	
	const allMasks = {};
	for (let i=0; i<=str.length; i++) allMasks[i] = [];
	
	while (paths.length) {
		const {numMasked, mask} = paths.shift();
		if (mask.length === str.length) {
			allMasks[numMasked].push(mask);
			continue;
		}
		paths.push({
			mask: `${mask}${str[mask.length]}`,
			numMasked: numMasked,
		});
		paths.push({
			mask: `${mask}x`,
			numMasked: numMasked + 1,
		});
	}
	return allMasks;
}


function makeVertices(numDimensions){
	const faceData = {};
	
	for (let i=1; i<=numDimensions; i++){
		faceData[i] = {};
	}
	
	const paths = [''];
	while(paths.length) {
		const path = paths.shift();
		if (path.length === numDimensions){
			const allMasks = getAllMasks(path);
			Object.keys(allMasks).forEach(numMasked => {
				if (numMasked === '0') return;
				const masks = allMasks[numMasked];
				masks.forEach(mask => {
					if (!faceData[numMasked][mask]) faceData[numMasked][mask] = [];
					faceData[numMasked][mask].push(path)
				})
			})
		} else {
			paths.push(`${path}0`);
			paths.push(`${path}1`);
		}
	}
	return faceData;
}

const rot = (theta) =>  [
	[Math.cos(theta), -Math.sin(theta)],
	[Math.sin(theta), Math.cos(theta)]
]

function vMult(a,b) {
	if (a[0].length !== b.length) throw new Error();
	
	const mx = [];
	for (let i=0; i<a.length; i++) mx.push(
		new Array(b[0].length).fill(0)
	)
	
	for (let i=0; i<a.length; i++) {
		for (let j=0; j<b[0].length; j++) {
			for (let k=0; k<a[0].length; k++) {
				mx[i][j] += a[i][k] * b[k][j];
			}
		}
	}
	return mx;
}



function dot(v1, v2) {
	let sum = 0;
	for (let i=0; i<v1.length; i++){
		sum += v1[i][0] * v2[i][0];
	}
	return sum;
}

function unitVec(dim, nDim){
	const v = [];
	for (let i=0; i<nDim; i++){
		v.push([i === dim ? 1 : 0])
	}
	return v;
}

function t(v){
	return new Array(v[0].length)
		.fill(null)
		.map((_,i) => new Array(v.length)
				 .fill(null)
				 .map((_,j) => v[j][i])
		)
}

function vAdd(v1,v2){
	const res = [];
	
	for (let i=0; i<v1.length; i++){
		res.push([]);
		for (let j=0; j<v1[0].length; j++){
			res[i][j] = v1[i][j] + v2[i][j];
		}
	}
	
	return res;
}

function sMult(a,vec){
	const res = [];
	
	for (let i=0; i<vec.length; i++){
		res.push([]);
		for (let j=0; j<vec[0].length; j++){
			res[i][j] = a*vec[i][j]
		}
	}
	
	return res;
}

function vSub(v1, v2){
	return vAdd(
		v1,
		sMult(-1,v2)
	)
}

function identity(nDim){
	const res = [];
	
	for (let i=0; i<nDim; i++){
		res.push([]);
		for (let j=0; j<nDim; j++){
			res[i][j] = i === j ? 1 : 0;
		}
	}
	return res;
}

function concat(v1, v2) {
	const res = [];
	for (let i=0; i<v1.length; i++){
		res.push([v1[i][0], v2[i][0]])
	}
	return res;
}

function rotHyper(dim1, dim2, nDim){
	const u = unitVec(dim1, nDim);
	const v = unitVec(dim2, nDim);
	
	const i = identity(nDim);
	
	const p = vAdd(
		vMult(u, t(u)), 
		vMult(v, t(v))
	);
	
	const uv = concat(u,v);
	const uvT = t(uv); //w, x, y and z
	
	return function(theta) {
		const rotatedRotation = vMult(
			vMult(uv, rot(theta)),
			uvT
		);
		
		return vAdd(
			vSub(i, p),
			rotatedRotation
		);
	}
}

function proj(vec, screenPos= -5, cameraPos= -8, scale=4.5) {
	const distToScreen = screenPos - cameraPos;
	
	const vecLastDimVal = vec[vec.length - 1][0];
	const distToPoint = vecLastDimVal - cameraPos;
	
	const projVec = vec.slice(0, -1);
	
	return sMult(distToScreen/distToPoint*scale,projVec);
}

function getVecFromString(str){
	const v = [];
	for (let i=0; i<str.length; i++){
		const val = (str[i] === '1' ? 1 : 0) - .5;
		v.push([val]);
	}
	return v;
}

function parseColor(hex){
	const rx = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/;
	const res = rx.exec(hex);
	if (!res) throw new Error();
	const [,r,g,b] = res;
	return [r,g,b].map(n => [parseInt(n,16)]);
}

function serializeColor(v){
	return `#${v.map(([val]) => {
		let c = Math.round(val).toString(16);
		while (c.length < 2) c = '0' + c;
		return c;
	}).join('')}`
}

function lerp(v1, v2, w){
	return v1.map(([val1], i) => {
		const val2 = v2[i][0];
		return [val1 + (val2 - val1)*w];
	})
}

//////////////////////////////////////////////////////

const root = document.getElementById('root');
root.setAttribute('viewBox', '-1.3 -1.3 2.6 2.6');


function c(type){
	return document.createElementNS('http://www.w3.org/2000/svg', type);
}

function attrs(node,attributes){
	Object.keys(attributes).forEach(attr => {
		node.setAttribute(attr, attributes[attr]);
	})
	return node;
}

function line([[x1],[y1]], [[x2],[y2]], color="black"){
	
	return attrs(c('line'),{
		x1,
		y1,
		x2,
		y2,
		stroke: color,
		'stroke-width': 1,
		'vector-effect': 'non-scaling-stroke',
	})
}


const cams = [
	[-1, -2, 1],
	[-5, -10, 2],
]

function getCam(i){
	return cams[i%cams.length];
}



function distance(v1, v2){
	let dist = 0;
	for (let i=0; i < v1.length; i++){
		const diff = v1[i][0] - v2[i][0];
		dist += diff**2;
	}
	return dist;
}

function getVertexPath(v, rot){
	const sets = Object.values(v);
	let d = [];
	
	const makeCommand = ([[x1],[y1]], [[x2],[y2]]) => {
		
		return `M ${x1} ${y1} L ${x2} ${y2}`
	}
	
	
	function lerpFn(a, b){
		return function (x){
			if (x < a) return 0;
			if (x > b) return 1;
			return (x-a)/(b-a);
		}
	}
	
	const getDistanceWeight = lerpFn(3,6);
	const purpleVec = parseColor('#a9a9a9');
	const whiteVec = parseColor('#ffffff');
	
	function getColorFromDistance(d){
		const w = getDistanceWeight(d);
		const vec = lerp(whiteVec, purpleVec, w);
		return serializeColor(vec);
	}
	
	
	const lines = sets.map(([p1, p2],i) => {
		let v1 = getVecFromString(p1);
		let v2 = getVecFromString(p2);
		
		v1 = vMult(rot, v1);
		v2 = vMult(rot, v2);
		
		let d1;
		let d2;
		let cam3d;
		
		n = 0;
		while(v1.length > 2){
			v1 = proj(v1, ...getCam(n));
			v2 = proj(v2, ...getCam(n));
			
			if (v1.length === 3){
				cam3d = getCam(n);
				cameraPos = cam3d[1];
				const camVec = [[0],[0],[cameraPos]];
				d1 = distance(camVec, v1);
				d2 = distance(camVec, v2);
			}
			n++;
		}
		
		const avgDistance = (d1 + d2)/2;
		
		const grad = makeGrad(i, v1, v2, {
			'stop-color': getColorFromDistance(d1),
			'stop-opacity': 1,
		}, {
			'stop-color': getColorFromDistance(d2),
			'stop-opacity': 1,
		})
		
		const d = makeCommand(v1, v2);

		const path = attrs(c('path'),{
			d, 
			stroke: `url('#${i}')`, 
			'stroke-width': 10, 
			'vector-effect': 
			'non-scaling-stroke',
			'stroke-linecap': 'round',
		})
		const g = c('g');
		g.appendChild(grad);
		g.appendChild(path);
		g.dataset.avgDistance = avgDistance;
		return g;
	}).sort((a,b) =>
		+b.dataset.avgDistance - +a.dataset.avgDistance
	);
	
	const group = c('g');
	lines.forEach(l => group.appendChild(l));

	return group;
}

function getAllRotMx(nDim){
	const rotations = {}
	for (let i=0; i<nDim; i++){
		rotations[i] = {};
		for(let j=i+1; j<nDim; j++){
			rotations[i][j] = rotHyper(i,j,nDim);
		}
	}
	return rotations;
}



function background(){
	let theta = 0;
	const r = 50;
	function _s(){
		theta += .005;
		const rotation = rot(theta);
		let [[x1],[y1]] = vMult(rotation, unitVec(0,2));
		let [[x2],[y2]] = vMult(rotation, sMult(-1,unitVec(0,2)));
	}
	return _s;
}

const randAccel = () => Math.floor(Math.random()*3) - 1;


const MAX_THETA = .005;

function makeGrad(id, v1, v2, stop1, stop2){
	const [[x1],[y1]] = v1;
	const [[x2],[y2]] = v2;
	
	const gradient = attrs(c('linearGradient'),{
		x1, y1, x2, y2, gradientUnits: 'userSpaceOnUse'
	});
	
	const s1 = attrs(c('stop'),{
		...stop1,
		offset: 0,
	});
	
	const s2 = attrs(c('stop'),{
		...stop2,
		offset: 1,
	});
	
	gradient.appendChild(s1);
	gradient.appendChild(s2);
	gradient.id = id;
	return gradient;
}


function hypercube(nDim){
	let rotationIdentity = identity(nDim);
	
	const vertices = makeVertices(nDim);
	
	const rotations = getAllRotMx(nDim);
	
	const mxs = [];
	Object.keys(rotations).forEach(dim1 => {
		Object.keys(rotations[dim1]).forEach(dim2 => {
			if (+dim2 >= 2 && +dim1 >= 1) mxs.push(rotations[dim1][dim2](.01))
		})
	})
	
	const backgroundStep = background();

	function _s(){
		requestAnimationFrame(_s);
		root.innerHTML = '';
		
		const lineGroup = getVertexPath(vertices[1], rotationIdentity);	
		root.appendChild(lineGroup);
		
		mxs.forEach((rot) => {
			rotationIdentity = vMult(rot, rotationIdentity)
		})
		
		backgroundStep();
	}
	
	_s();

}

// hypercube(3);
hypercube(4);
// hypercube(5);
// hypercube(6);







