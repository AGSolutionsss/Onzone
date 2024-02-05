import React, { Component } from 'react';
import {baseURL} from '../../api';
import axios from "axios";
import dateyear from '../../routes/dateyear';
import Moment from 'moment';

class RecentOrders extends Component {

	state = {
		recentOrders: null
	}

	componentDidMount() {
		this.getRecentOrders();
	}
	getRecentOrders() {

		axios({
			url: baseURL+"/fetch-dashboard-data-by/"+dateyear,
			method: "GET",
			headers: {
			  Authorization: `Bearer ${localStorage.getItem("login")}`,
			},
		  })
			.then((res) => {
			  this.setState({ recentOrders: res.data.fabricInward });
			})
			.catch((res) => {
			  alert("Something Went Wrong!");
			  
			});
	}

	render() {
		const { recentOrders } = this.state;
		return (
			<div className="table-responsive">
				<table className="table table-hover mb-0">
					<thead>
						<tr>
							<th>LR Date</th>
							<th>LR No</th>
							<th>Supplier Name</th>
							<th>No of Bundles</th>
							<th>Width</th>
							<th>Invoice</th>
						</tr>
					</thead>
					<tbody>
						{recentOrders && recentOrders.map((order, key) => (
							<tr key={key}>
								<td>{ Moment(order.fabric_inward_lr_date).format('DD-MM-YYYY')}</td>
								<td>{order.fabric_inward_lr_no}</td>
								<td>
									<span className="d-block fw-normal">{order.fabric_inward_supplier}</span>
								</td>
								<td>{order.fabric_inward_lr_no_bundles}</td>
								<td>{order.fabric_inward_width}</td>
								<td>{order.fabric_inward_invoice}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		);
	}
}

export default RecentOrders;
