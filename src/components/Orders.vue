<template>
	<div id="Orders">
		<h1 id="header">Daryl's Yummy Food</h1>
		<ul>
			<li><router-link to="/" exact>Home</router-link></li>
			<li><router-link to="/orders" exact>Orders</router-link></li>
			<li><router-link to="/dashboard">Dashboard</router-link></li>
		</ul>
		<ul>
			<li v-for="order in this.orders" v-bind:key="order[0]">
				<p v-for="(key, item) in order[1]" v-bind:key="key">
					{{ item }}: {{ key }}
				</p>

				<button v-bind:id="order[0]" v-on:click="deleteItem($event)">
					Delete
				</button>

				<button v-bind:id="order[0]" v-on:click="route($event)">
					Modify
				</button>
			</li>
		</ul>
	</div>
</template>

<script>
import database from "../firebase.js";

export default {
	name: "Orders",
	data: function() {
		return {
			orders: [],
		};
	},
	methods: {
		fetchItems: function() {
			database
				.collection("orders")
				.get()
				.then((snapshot) => {
					snapshot.docs.forEach((doc) => {
						this.orders.push([doc.id, doc.data()["order"]]);
					});
				});
		},
		deleteItem: function(event) {
			let doc_id = event.target.getAttribute("id");
			database
				.collection("orders")
				.doc(doc_id)
				.delete()
				.then(() => location.reload());
		},
		route: function(event) {
			let doc_id = event.target.getAttribute("id");
			this.$router.push({ name: "modify", params: { doc_id } });
		},
	},
	created: function() {
		this.fetchItems();
	},
};
</script>

<style scoped>
button {
	width: 65px;
	height: 30px;
	background-color: #badfe7;
	border-radius: 10px;
	border-width: 1px;
}
</style>
