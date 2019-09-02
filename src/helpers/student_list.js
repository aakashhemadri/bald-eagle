import config from '../config/config.js';

export default function load_student_list(callback, center) {
	window.gapi.client.load("sheets", "v4", () => {
		window.gapi.client.sheets.spreadsheets.values
			.get({
				spreadsheetId: config[center].student.spreadsheetId,
				range: config[center].student.range,
			})
			.then(
				response => {
					const student_list = response.result.values;
					callback({ student_list });
				},
				response => {
					callback(false, response.result.error);
				}
			)
	})
}