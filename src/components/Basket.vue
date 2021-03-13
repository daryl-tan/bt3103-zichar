<template>
	<div id="Basket" v-if="this.itemsSelected.length > 0">
		<p>Menu:</p>
		<ul>
			<li v-for="item in itemsSelected" v-bind:key="item">
				{{ item[0] }} x {{ item[1] }}
			</li>
		</ul>
		<p><button v-on:click="findTotal()">Calculate Cost</button></p>
		<div id="totalCosts" v-show="show">
			<p>Subtotal: ${{ subtotal }}</p>
			<p>Grandtotal: ${{ grandtotal }}</p>
		</div>
		<button v-on:click="sendOrder()">Add Order</button>
	</div>
</template>

<script>
import database from "../firebase.js";

export default {
	name: "Basket",
	data: function() {
		return {
			subtotal: 0,
			grandtotal: 0,
			show: false,
		};
	},
	props: {
		itemsSelected: Array,
		items: Array,
	},
	methods: {
		findTotal: function() {
			this.show = true;
			var total = 0;
			for (let i = 0; i < this.itemsSelected.length; i++) {
				var curr = this.itemsSelected[i];
				total += curr[1] * curr[2];
			}
			this.subtotal = total;
			this.grandtotal = (total * 1.07).toFixed(2);
		},
		sendOrder: function() {
			var order = {};
			for (let i = 0; i < this.items.length; i++) {
				order[this.items[i].name] = 0;
			}

			for (let i = 0; i < this.itemsSelected.length; i++) {
				var curr = this.itemsSelected[i];
				order[curr[0]] = curr[1];
			}
			database
				.collection("orders")
				.add({
					order: order,
				})
				.then(() => location.reload());
		},
	},
};
</script>

<style scoped>
button {
	background-color: #badfe7;
	border: none;
	color: black;
	text-align: center;
	font-size: 18px;
	border-radius: 8px;
	padding: 8px;
}
</style>
