import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inplayList: []
		};
		this.getInplaySportsEvents()
		setInterval(() => {
			this.getInplaySportsEvents()
		}, 10000);
	}

	getInplaySportsEvents() {
		fetch('live_events')
			.then(response => response.json())
			.then(data => this.setState({ inplayList: data.events.sports }))
	}

	render() {

		let inplayList = this.state.inplayList;
		console.log(inplayList)
		return (
			<div className="App">
				<Tabs
					defaultActiveKey="100"
					transition={false}
					id="noanim-tab-example"
					className="mb-3"
				>
					{inplayList.sort((a, b) => a.pos - b.pos).map(sport => (
						<Tab eventKey={sport.id} title={sport.desc}>
							<Accordion defaultActiveKey={sport.comp.sort((a, b) => a.pos - b.pos).map(comp => comp.id)[0]} alwaysOpen>
								{sport.comp.sort((a, b) => a.pos - b.pos).map(comp => (
									<Accordion.Item eventKey={comp.id}>
										<Accordion.Header>{comp.desc}</Accordion.Header>
										<Accordion.Body>
											<ListGroup>
												{comp.events.sort((a, b) => a.pos - b.pos).map(event => (
													<ListGroup.Item action href={event.id} disabled>
														<div className="row">
															<div className="col-sm-3">{event.desc}</div>
															<div className="col-sm-1">{event.scoreboard.scr}</div>
															<div className="col-sm-1">{event.scoreboard.dsc}</div>
															<div className="col-sm-1">{event.scoreboard.clk}</div>
															{event.markets[0].o.sort((a, b) => a.po - b.po).map(market => (
																<Button className="col-sm-2" variant="outline-dark">
																	<div className="row">
																		<div className="float-left">{market.keyDimension}</div>
																		<div className="float-right">{market.prd}</div>
																	</div>
																</Button>
															))}
														</div>
													</ListGroup.Item>
												))}
											</ListGroup>
										</Accordion.Body>
									</Accordion.Item>
								))}
							</Accordion>
						</Tab>
					))
					}
				</Tabs>
			</div >
		)
	}
}



export default App