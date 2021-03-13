<template>
	<div id="PageContent">
		<h1 id="header">Daryl's Yummy Food</h1>
		<ul>
			<li><router-link to="/" exact>Home</router-link></li>
			<li><router-link to="/orders" exact>Orders</router-link></li>
			<li><router-link to="/dashboard">Dashboard</router-link></li>
		</ul>
		<ul id="itemsList">
			<li v-for="item in items" v-bind:key="item.name">
				<p id="itemName">{{ item.name }}</p>
				<p><img v-bind:src="item.imageURL" /></p>
				<p id="price">${{ item.price }}</p>
				<qtyBtn v-bind:item="item" v-on:counter="onCounter"></qtyBtn>
			</li>
		</ul>
		<basket
			id="shoppingBasket"
			v-bind:itemsSelected="itemsSelected"
			v-bind:items="items"
		></basket>
	</div>
</template>

<script>
import Basket from "./Basket.vue";
import QuantityCounter from "./QuantityCounter.vue";
import database from "../firebase.js";

export default {
	name: "PageContent",
	components: {
		basket: Basket,
		qtyBtn: QuantityCounter,
	},
	data: function() {
		return {
			itemsSelected: [],
			items: [],
		};
	},
	methods: {
		onCounter: function(item, count) {
			if (this.itemsSelected.length === 0 && count > 0) {
				//If there is nothing in items selected, push the ORDER in
				this.itemsSelected.push([item.name, count, item.price]);
			} else {
				// Loop through everything to check what is not in the basket
				for (let i = 0; i < this.itemsSelected.length; i++) {
					const curr_item = this.itemsSelected[i];
					const item_name = curr_item[0];
					var contains = false;

					// if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
					if (item_name == item.name && count > 0) {
						this.itemsSelected.splice(i, 1, [
							curr_item[0],
							count,
							curr_item[2],
						]);
						contains = true;
						break;
					}

					// Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
					else if (item_name == item.name && count == 0) {
						this.itemsSelected.splice(i, 1);
						contains = true;
						break;
					}
				}
				// otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
				if (!contains) {
					this.itemsSelected.push([item.name, count, item.price]);
				}
			}
		},
		fetchItems: function() {
			database
				.collection("menu")
				.get()
				.then((snapshot) => {
					snapshot.docs.forEach((doc) => {
						this.items.push(doc.data());
					});
				});
		},
	},
	created: function() {
		this.fetchItems();
	},
};
</script>

<style scoped>
#itemsList {
	width: 100%;
	max-width: 70%;
	margin: 0px;
	padding: 0 5px;
	box-sizing: border-box;
}
img {
	width: 135px;
	height: 135px;
}

#price {
	font-size: 30px;
}

#itemName {
	font-size: 30px;
	margin-top: 5px;
}

#shoppingBasket {
	position: absolute;
	top: 27%;
	left: 75%;
	font-size: 30px;
}
</style>
