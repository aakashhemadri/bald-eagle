import React, { Component } from 'react';
import { Container, Button, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, InputGroup, InputGroupAddon, Input } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import load_student_list from '../../../helpers/student_list.js';
import config from '../../../config/config.js';

class Home extends Component {
	constructor(props) {
		super(props);
		this.fetchStudentSheet = this.fetchStudentSheet.bind(this);
		this.toggle = this.toggle.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleCenter = this.handleCenter.bind(this);
		this.handleStandard = this.handleStandard.bind(this);
		this.handleStudent = this.handleStudent.bind(this);
		this.handleDate = this.handleDate.bind(this);

		this.state = {
			centerDropdown: false,
			standardDropdown: false,
			studentDropdown: false,
			records: [],
			student_list: ["Retrieving student list..."],
			error: null,
			center: "Center",
			standard: "Class",
			student: "Student",
			date: "",
		}
	}
	componentDidMount() {

	}
	toggle = dropdown => ev => {
		this.setState(prevState => ({ [dropdown]: !prevState[dropdown] }));
	}
	handleCenter(event) {
		this.setState({ center: event.target.name }, function () {
			window.gapi.load("client", this.fetchStudentSheet.bind(this, this.state.center));
		})
	}
	handleStandard(event) {
		this.setState({ standard: event.target.name })
	}
	handleStudent(event) {
		this.setState({ student: event.target.name })
	}
	handleDate(event) {
		this.setState({ date: event.target.value })
	}
	render() {
		return (
			<Container fluid className="bg-primary h-100 w-100 d-flex flex-column justify-content-center align-items-center ">
				<div className="text-light p-2 w-100 d-flex justify-content-center align-items-center"><h1>Class Log</h1></div>
				<div className="p-2 w-100 d-flex justify-content-center align-items-center">
					<Dropdown className="p-1" name="center" isOpen={this.state.centerDropdown} toggle={this.toggle('centerDropdown')}>
						<DropdownToggle caret>
							{this.state.center}
						</DropdownToggle>
						<DropdownMenu >
							<DropdownItem header>Choose your center</DropdownItem>
							<DropdownItem divider />
							<DropdownItem name="MC1" onClick={this.handleCenter}>Mount Carmel 1</DropdownItem>
							<DropdownItem name="MC2" onClick={this.handleCenter}>Mount Carmel 2</DropdownItem>
							<DropdownItem name="Douglas" onClick={this.handleCenter}>Douglas</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<Dropdown className="p-1" name="class" isOpen={this.state.standardDropdown} toggle={this.toggle('standardDropdown')}>
						<DropdownToggle caret>{this.state.standard}</DropdownToggle>
						<DropdownMenu>
							<DropdownItem header>Choose your class</DropdownItem>
							<DropdownItem divider />
							<DropdownItem name="Nursery" onClick={this.handleStandard}>Nursery</DropdownItem>
							<DropdownItem name="LKG/UKG" onClick={this.handleStandard}>LKG/UKG</DropdownItem>
							<DropdownItem name="Levels" onClick={this.handleStandard}>Levels</DropdownItem>
						</DropdownMenu>
					</Dropdown>
					<Dropdown className="p-1" name="student" isOpen={this.state.studentDropdown} toggle={this.toggle('studentDropdown')}>
						<DropdownToggle caret>{this.state.student}</DropdownToggle>
						<DropdownMenu>
							{this.state.student_list.map((student, index) => (
								<DropdownItem disabled={student === "Retrieving student list..." ? true : false} key={index} name={student} onClick={this.handleStudent}>{student}</DropdownItem>
							))}
						</DropdownMenu>
					</Dropdown>
				</div>
				<div className="p-2 w-100 d-flex justify-content-center date">
					<InputGroup>
						<InputGroupAddon addonType="prepend">Date</InputGroupAddon>
						<Input name="date" type="date" placeholder="Enter date" onChange={this.handleDate} value={this.state.date} />
					</InputGroup>
				</div>
				<div className="p-2 d-flex justify-content-center">
					<Button onClick={this.handleSubmit}>
						Submit
						</Button>
				</div>
			</Container>
		);
	}
	handleSubmit() {
		if (this.state.standard === "Nursery") {
			this.props.history.push({
				pathname: '/nursery',
				state: {
					center: this.state.center,
					standard: this.state.standard,
					student: this.state.student,
					date: this.state.date,
				}
			})
		}
		else if (this.state.standard === "LKG/UKG") {
			this.props.history.push({
				pathname: '/lkg_ukg',
				state: {
					center: this.state.center,
					standard: this.state.standard,
					student: this.state.student,
					date: this.state.date,
				}
			})
		}
		else if (this.state.standard === "Levels") {
			this.props.history.push({
				pathname: '/levels',
				state: {
					center: this.state.center,
					standard: this.state.standard,
					student: this.state.student,
					date: this.state.date,
				}
			})
		}

	}

	fetchStudentSheet(center) {
		// 2. Initialize the JavaScript client library.
		window.gapi.client.init({
			apiKey: config[center].student.apiKey,
			discoveryDocs: config[center].student.discoveryDocs
		})
			.then(() => {
				// 3. Initialize and make the API request.
				load_student_list(this.onLoadStudentList, center);
			});

	};


	onLoadStudentList = (data, error) => {
		if (data) {
			const student_list = data.student_list;
			this.setState({
				student_list
			})
		}
		else {
			this.setState({ error });
		}
	}
}

export default withRouter(Home)