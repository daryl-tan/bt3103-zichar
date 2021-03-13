import { Line } from "vue-chartjs";
import axios from "axios";

export default {
	extends: Line,
	data: function() {
		return {
			datacollection: {
				labels: [],
				datasets: [
					{
						data: [],
						label: "",
						borderColor: "#3e95cd",
						fill: false,
					},
					{
						data: [],
						label: "",
						borderColor: "#8e5ea2",
						fill: false,
					},
					{
						data: [],
						label: "",
						borderColor: "#3cba9f",
						fill: false,
					},
					{
						data: [],
						label: "",
						borderColor: "#e8c3b9",
						fill: false,
					},
					{
						data: [],
						label: "",
						borderColor: "#c45850",
						fill: false,
					},
					{
						data: [],
						label: "",
						borderColor: "#ffb347",
						fill: false,
					},
				],
			},
			options: {
				legend: { display: true },
				title: {
					display: true,
					text: "PSI Twenty Four Hourly (By Region)",
				},
				responsive: true,
				maintainAspectRatio: false,
			},
		};
	},
	methods: {
		fetchItems: function() {
			var dct = {};
			axios
				.get(
					`https://api.data.gov.sg/v1/environment/psi?date=2021-02-23`
				)
				.then((response) => {
					response.data["items"].forEach((data) => {
						this.datacollection.labels.push(data["timestamp"]);
						var innerDct =
							data["readings"]["psi_twenty_four_hourly"];
						Object.entries(innerDct).forEach(([key, value]) => {
							if (!(key in dct)) {
								dct[key] = new Array();
								dct[key].push(value);
							} else {
								dct[key].push(value);
							}
						});
					});
					var counter = 0;
					Object.entries(dct).forEach(([key, value]) => {
						this.datacollection.datasets[counter]["label"] = key;
						this.datacollection.datasets[counter]["data"] = value;
						counter += 1;
					});
					this.renderChart(this.datacollection, this.options);
				});
		},
	},
	created() {
		this.fetchItems();
	},
};
