<template>
	<div id="QuantityCounter">
		<button v-on:click="decr">-</button>
		<p id="counter">{{ counter }}</p>
		<button v-on:click="incr">+</button>
	</div>
</template>

<script>
export default {
	name: "QuantityCounter",
	props: {
		item: Object,
	},
	data: function() {
		return {
			counter: 0,
		};
	},
	methods: {
		incr: function() {
			if (this.counter == 10) {
				alert("You cannot buy more than 10 items");
			} else {
				this.counter++;
			}
			this.$emit("counter", this.item, this.counter);
		},
		decr: function() {
			if (this.counter > 0) {
				this.counter--;
			}
			this.$emit("counter", this.item, this.counter);
		},
	},
};
</script>

<style scoped>
button {
	background-color: #badfe7;
	border: none;
	color: black;
	padding: 5px 10px;
	text-align: center;
	font-size: 20px;
	border-radius: 8px;
	width: 40px;
	margin-left: 10px;
	margin-right: 10px;
}

#counter {
	font-size: 30px;
	display: inline;
}
</style>
