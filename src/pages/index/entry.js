let food = [ '土豆粉', '生煎', '和府捞面', '汤包传奇', '食其家', '美罗城六层', '肯德基', '麦当劳', '陕西凉皮', '麻辣香锅' ];

document.getElementById('day').onclick = () => {
	let index = Math.floor(Math.random() * food.length);
	console.log(index)
	document.getElementById('food').innerHTML = food[ index ];
};



