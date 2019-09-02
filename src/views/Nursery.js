import React, { Component } from 'react'
import { Row, Col, ListGroupItemHeading, ListGroupItemText, Card, CardTitle, CardHeader, CardBody, ListGroup, ListGroupItem, Badge } from 'reactstrap';
import { toast } from 'react-toastify'
import load from '../helpers/spreadsheet.js'
import config from '../config/config.js';

export default class Nursery extends Component {
	constructor(props) {
		super(props);

		this.fetchSheet = this.fetchSheet.bind(this);
		this.onLoad = this.onLoad.bind(this);

		this.state = {
			records: []
		}
	}

	componentDidMount() {
		window.gapi.load("client", this.fetchSheet.bind(this, this.props.location.state.center, this.props.location.state.standard, this.props.location.state.student, this.props.location.state.date));
	}
	render() {
		return (
			<React.Fragment>
				<div class="d-flex flex-column justify-content-center align-items-center">
					<Row className="p-2 h-100 w-100">
						<Col className="d-flex justify-content-center align-items-center">
							<Badge>{this.props.location.state.center}</Badge>&nbsp;
							<Badge>{this.props.location.state.standard}</Badge>&nbsp;
							<Badge>{this.props.location.state.student}</Badge>&nbsp;
							<Badge>{this.props.location.state.date}</Badge>&nbsp;
						</Col>
					</Row>
					<Row className="p-2 h-100 w-100 ">
						{this.state.records.map((record, index) => (
							<Col xs="12" md="4" lg="3" className="p-2">
								<Card color="secondary">
									<CardHeader>
										<CardTitle className="d-flex justify-content-between">
											{record.student}
											<Badge>{record.date}</Badge>
											<Badge>{record.class_type}</Badge>
										</CardTitle>
									</CardHeader>
									<CardBody>
										<ListGroup>
											<ListGroupItem className="d-flex">
												<ListGroupItemText className="d-flex justify-content-between">
													<h5>Teacher:</h5>&nbsp;<h5><Badge>{record.volunteer}</Badge></h5>
												</ListGroupItemText>
											</ListGroupItem>
											<ListGroupItem className="d-flex flex-column">
												<ListGroupItemHeading>
													Chapters Covered:
											</ListGroupItemHeading>
												<ListGroupItemText className="d-flex justify-content-between">
													Rhymes and Phonics:&nbsp;<h5><Badge>{record.chapters_covered.rhymes_phonics}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemText className="d-flex justify-content-between">
													Integrated Primer:&nbsp;<h5><Badge>{record.chapters_covered.integrated_primer}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemText className="d-flex justify-content-between">
													Alphabets:&nbsp;<h5><Badge>{record.chapters_covered.alphabets}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemText className="d-flex justify-content-between">
													Numbers:&nbsp;<h5><Badge>{record.chapters_covered.numbers}</Badge></h5>
												</ListGroupItemText>
											</ListGroupItem>
											<ListGroupItem className="d-flex flex-column">
												<ListGroupItemHeading>
													Concepts Taught:
											</ListGroupItemHeading>
												<ListGroupItemText className="d-flex justify-content-between">
													Rhymes and Phonics:&nbsp;<h5><Badge>{record.concepts_taught.rhymes_phonics}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemText className="d-flex justify-content-between">
													Integrated Primer:&nbsp;<h5><Badge>{record.concepts_taught.integrated_primer}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemText className="d-flex justify-content-between">
													Alphabets:&nbsp;<h5><Badge>{record.concepts_taught.alphabets}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemText className="d-flex justify-content-between">
													Numbers:&nbsp;<h5><Badge>{record.concepts_taught.numbers}</Badge></h5>
												</ListGroupItemText>
											</ListGroupItem>
											<ListGroupItem className="d-flex flex-column">
												<ListGroupItemHeading>
													Textbook Pages:
											</ListGroupItemHeading>
												<ListGroupItemText className="d-flex justify-content-between">
													Rhymes and Phonics:&nbsp;<h5><Badge>{record.text_pages.rhymes_phonics}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemText className="d-flex justify-content-between">
													Integrated Primer:&nbsp;<h5><Badge>{record.text_pages.integrated_primer}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemText className="d-flex justify-content-between">
													Alphabets:&nbsp;<h5><Badge>{record.text_pages.alphabets}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemText className="d-flex justify-content-between">
													Numbers:&nbsp;<h5><Badge>{record.text_pages.numbers}</Badge></h5>
												</ListGroupItemText>
											</ListGroupItem>
											<ListGroupItem className="d-flex flex-column">
												<ListGroupItemText className="d-flex justify-content-between">
													<h5>Activity Pages:</h5>&nbsp;<h5><Badge>{record.activity_pages}</Badge></h5>
												</ListGroupItemText>
											</ListGroupItem>
											<ListGroupItem className="d-flex flex-column">
												<ListGroupItemHeading>
													Worksheets
											</ListGroupItemHeading>
												<ListGroupItemText className="d-flex justify-content-between">
													Chapter:&nbsp;<h5><Badge>{record.resources.worksheet.chapter}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemText className="d-flex justify-content-between">
													Worksheet:&nbsp;<h5><Badge>{record.resources.worksheet.worksheet}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemHeading>
													Lesson Plan
											</ListGroupItemHeading>
												<ListGroupItemText className="d-flex justify-content-between">
													Concept:&nbsp;<h5><Badge>{record.resources.lesson_plan.concept}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemText className="d-flex justify-content-between">
													Objective:&nbsp;<h5><Badge>{record.resources.lesson_plan.objective}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemText className="d-flex justify-content-between">
													Resources:&nbsp;<h5><Badge>{record.resources.lesson_plan.resources}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemText className="d-flex justify-content-between">
													Creative Techniques:&nbsp;<h5><Badge>{record.resources.lesson_plan.creative_techniques}</Badge></h5>
												</ListGroupItemText>
											</ListGroupItem>
											{/* Class Components */}
											<ListGroupItem className="d-flex flex-column">
												<ListGroupItemHeading>
													Class Components:
											</ListGroupItemHeading>
												<ListGroupItemText className="d-flex justify-content-between">
													Digital Resources:&nbsp;<h5><Badge>{record.class_components.digital_resource}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemText className="d-flex justify-content-between">
													Resource Box:&nbsp;<h5><Badge>{record.class_components.resource_box}</Badge></h5>
												</ListGroupItemText>
											</ListGroupItem>
											{/*  Child Encrichment Program */}
											<ListGroupItem className="d-flex flex-column">
												<ListGroupItemHeading>
													CEP:
											</ListGroupItemHeading>
												<ListGroupItemText className="d-flex justify-content-between">
													Library Comments:&nbsp;<h5><Badge>{record.cep_class.library_components}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemText className="d-flex justify-content-between">
													CEP Tool:&nbsp;<h5><Badge>{record.cep_class.tools}</Badge></h5>
												</ListGroupItemText>
												<ListGroupItemText className="d-flex justify-content-between">
													CEP comments:&nbsp;<h5><Badge>{record.cep_class.comments}</Badge></h5>
												</ListGroupItemText>
											</ListGroupItem>
											{/* Tests */}
											{() => {
												if (record.tests.type === "Slip") {
													return (<React.Fragment>
														<ListGroupItem className="d-flex flex-column">
															<ListGroupItemHeading>
																Slip Test:
											</ListGroupItemHeading>
															<ListGroupItemText className="d-flex justify-content-between">
																Total:&nbsp;<h5><Badge>{record.tests.slip.total}</Badge></h5>
															</ListGroupItemText>
															<ListGroupItemText className="d-flex justify-content-between">
																Comments:&nbsp;<h5><Badge>{record.tests.slip.total}</Badge></h5>
															</ListGroupItemText>
														</ListGroupItem>
													</React.Fragment>)
												}
												else if (record.test.type === "Unit") {
													return (<React.Fragment>
														<ListGroupItem className="d-flex flex-column">
															<ListGroupItemHeading>
																Unit Test:
														</ListGroupItemHeading>
															<ListGroupItemText className="d-flex justify-content-between">
																Listening:&nbsp;<h5><Badge>{record.tests.unit.listening}</Badge></h5>
															</ListGroupItemText>
															<ListGroupItemText className="d-flex justify-content-between">
																Speaking:&nbsp;<h5><Badge>{record.tests.unit.speaking}</Badge></h5>
															</ListGroupItemText>
															<ListGroupItemText className="d-flex justify-content-between">
																Reading:&nbsp;<h5><Badge>{record.tests.unit.reading}</Badge></h5>
															</ListGroupItemText>
															<ListGroupItemText className="d-flex justify-content-between">
																Writing:&nbsp;<h5><Badge>{record.tests.unit.writing}</Badge></h5>
															</ListGroupItemText>
															<ListGroupItemText className="d-flex justify-content-between">
																Total:&nbsp;<h5><Badge>{record.tests.unit.total}</Badge></h5>
															</ListGroupItemText>
															<ListGroupItemText className="d-flex justify-content-between">
																Comments:&nbsp;<h5><Badge>{record.tests.unit.comments}</Badge></h5>
															</ListGroupItemText>
														</ListGroupItem>
													</React.Fragment>)
												}
											}}
											{/* Assessments */}
											{() => {
												if (record.class_type !== "Assessments") {
													return (<React.Fragment>
														<ListGroupItem>
															<ListGroupItemHeading>
																{record.assessments.type}
															</ListGroupItemHeading>
															<ListGroupItemText className="d-flex justify-content-between">
																Listening:&nbsp;<h5><Badge>{record.assessments.listening}</Badge></h5>
															</ListGroupItemText>
															<ListGroupItemText className="d-flex justify-content-between">
																Speaking:&nbsp;<h5><Badge>{record.assessments.speaking}</Badge></h5>
															</ListGroupItemText>
															<ListGroupItemText className="d-flex justify-content-between">
																Reading:&nbsp;<h5><Badge>{record.assessments.reading}</Badge></h5>
															</ListGroupItemText>
															<ListGroupItemText className="d-flex justify-content-between">
																Writing:&nbsp;<h5><Badge>{record.assessments.writing}</Badge></h5>
															</ListGroupItemText>
															<ListGroupItemText className="d-flex justify-content-between">
																Total:&nbsp;<h5><Badge>{record.assessments.total}</Badge></h5>
															</ListGroupItemText>
															<ListGroupItemText className="d-flex justify-content-between">
																Comments:&nbsp;<h5><Badge>{record.assessments.comments}</Badge></h5>
															</ListGroupItemText>
														</ListGroupItem>
													</React.Fragment>)
												}
											}}
										</ListGroup>
									</CardBody>
								</Card>
							</Col>
						))}
					</Row>
				</div>
			</React.Fragment >
		)
	}
	fetchSheet(center, standard, student, date) {
		// 2. Initialize the JavaScript client library.
		window.gapi.client.init({
			apiKey: config[center].apiKey,
			discoveryDocs: config[center].discoveryDocs
		})
			.then(() => {
				// 3. Initialize and make the API request.
				load(this.onLoad, center, standard, student, date);
			})
			.catch((error) => {
				toast.error('Wrong option')
			})

	};
	onLoad = (data, error) => {
		if (data) {
			const records = data.records;
			this.setState({
				records
			})
			console.log(records)
		}
		else {
			this.setState({ error });
		}
	}
}