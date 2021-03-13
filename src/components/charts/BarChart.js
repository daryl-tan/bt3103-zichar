import { Bar } from "vue-chartjs";
import database from "../../firebase.js";

export default {
	extends: Bar,
	data: function() {
		return {
			datacollection: {
				labels: [],
				datasets: [
					{
						label: "Order Details",
						backgroundColor: [
							"#3e95cd",
							"#8e5ea2",
							"#3cba9f",
							"#e8c3b9",
							"#c45850",
							"#ffb347",
						],
						data: [],
					},
				],
			},
			options: {
				legend: { display: false },
				title: {
					display: true,
					text: "Total Number of Each Dish",
				},
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					yAxes: [
						{
							ticks: {
								min: 0,
								max: 12,
							},
						},
					],
				},
			},
		};
	},
	methods: {
		fetchItems: function() {
			var orderDct = {};
			var items = [];
			var numbers = [];
			database
				.collection("orders")
				.get()
				.then((snapshot) => {
					snapshot.docs.forEach((doc) => {
						var currOrder = doc.data()["order"];
						for (let k in currOrder) {
							if (!(k in orderDct)) {
								orderDct[k] = currOrder[k];
							} else {
								orderDct[k] += currOrder[k];
							}
						}
					});
				})
				.then(() => {
					Object.entries(orderDct).forEach(([key, value]) => {
						value;
						items.push(key);
					});
					items = items.sort();

					for (let i = 0; i < items.length; i++) {
						numbers.push(orderDct[items[i]]);
					}
					this.datacollection.labels = items;
					this.datacollection.datasets[0].data = numbers;
					this.renderChart(this.datacollection, this.options);
				});
		},
	},
	created() {
		this.fetchItems();
	},
};
