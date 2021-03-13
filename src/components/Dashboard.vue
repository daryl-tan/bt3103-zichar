<template>
	<div id="Dashboard">
		<h1 id="header">Dashboard</h1>
		<ul>
			<li><router-link to="/" exact>Home</router-link></li>
			<li><router-link to="/orders" exact>Orders</router-link></li>
			<li><router-link to="/dashboard">Dashboard</router-link></li>
		</ul>
		<BarChart></BarChart>
		<LineChart></LineChart>
	</div>
</template>

<script>
import BarChart from "./charts/BarChart.vue";
import LineChart from "./charts/LineChart.vue";
export default {
	name: "Dashboard",
	components: {
		BarChart,
		LineChart,
	},
};
</script>

<style scoped></style>
