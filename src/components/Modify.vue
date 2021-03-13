<template>
	<div id="Modify">
		<p
			v-for="(key, item, index) in this.datapacket['order']"
			v-bind:key="index"
		>
			{{ item }}: {{ key }} <br /><br />
			<input
				type="number"
				v-bind:id="index"
				placeholder="0"
				min="0"
				v-bind:name="item"
			/>
		</p>
		<button v-on:click="updateOrder()">Update Order</button>
	</div>
</template>

<script>
import database from "../firebase.js";

export default {
	name: "Modify",
	props: {
		doc_id: String,
	},
	data: function() {
		return {
			datapacket: [],
			orderSeq: [],
		};
	},
	methods: {
		fetchItems: function() {
			database
				.collection("orders")
				.doc(this.doc_id)
				.get()
				.then((snapshot) => {
					this.datapacket = snapshot.data();
				});
		},
		updateOrder: function() {
			var copy = this.datapacket["order"];
			for (let i = 0; i < Object.keys(copy).length; i++) {
				var newQty = Number(document.getElementById(i).value);
				var name = document.getElementById(i).name;
				copy[name] = newQty;
			}
			database
				.collection("orders")
				.doc(this.doc_id)
				.update({
					order: copy,
				})
				.then(() => this.$router.push("orders"));
		},
	},
	created: function() {
		this.fetchItems();
	},
};
</script>

<style scoped>
button {
	width: 100px;
	height: 30px;
	background-color: #badfe7;
	border-radius: 10px;
	border-width: 1px;
}
</style>
