<template>
	<div class="chart">
		<h1>Bar Chart</h1>
		<Chart></Chart>
	</div>
</template>

<script>
import Chart from "./BarChart.js";
export default {
	components: {
		Chart,
	},
};
</script>

<style>
h1 {
	text-align: center;
}
</style>
