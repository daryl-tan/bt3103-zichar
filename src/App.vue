<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>
export default {
	name: "App",
	data: function() {
		return {};
	},
};
</script>

<style>
body {
	background: #f6f6f2;
}
#header {
	margin-top: 0px;
	padding: 20px;
	text-align: center;
	background: #6fb3b8;
	color: white;
	font-size: 50px;
}
ul {
	display: flex;
	flex-wrap: wrap;
	list-style-type: none;
	padding: 0;
}
li {
	flex-grow: 1;
	flex-basis: 300px;
	text-align: center;
	padding: 10px;
	border: 1px solid #222;
	margin: 10px;
}
</style>
