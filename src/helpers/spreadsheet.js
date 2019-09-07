import config from '../config/config.js';

export default function load(callback, center, standard, student, date) {
	window.gapi.client.load("sheets", "v4", () => {
		window.gapi.client.sheets.spreadsheets.values
			.get({
				spreadsheetId: config[center].spreadsheetId,
				range: config[center].range,
			})
			.then(
				response => {
					const data = (response.result.values).filter((record) => {
						return record[3] === standard && (record[1] === (date !== "" ? date.split('-').reverse().join('/') : record[1]))
					}).sort().reverse();
					var records = [];
					var record = [];
					console.log(data)
					switch (standard) {
						case 'Nursery':
							for (record of data) {
								records.push({
									date: record[1],
									volunteer: record[2],
									standard: record[3],
									student: record[4],
									class_type: record[5],
									chapters_covered: {
										rhymes_phonics: record[6],
										integrated_primer: record[7],
										alphabets: record[8],
										numbers: record[9]
									},
									concepts_taught: {
										rhymes_phonics: record[10],
										integrated_primer: record[11],
										alphabets: record[12],
										numbers: record[13]
									},
									text_pages: {
										rhymes_phonics: record[14],
										integrated_primer: record[15],
										alphabets: record[16],
										numbers: record[17]
									},
									activity_pages: record[18],
									resources: {
										worksheet: {
											chapter: record[19],
											worksheet: record[20],
										},
										lesson_plan: {
											concept: record[21],
											objective: record[22],
											resources: record[23],
											creative_techniques: [24],
										}
									},
									class_components: {
										digital_resource: record[25],
										resource_box: record[26],
									},
									cep_class: {
										library_comments: record[27],
										tools: record[28],
										comments: record[29],
									},
									tests: {
										type: record[30],
										slip: {
											total: record[31],
											comments: record[32],
										},
										unit: {
											listening: record[33],
											speaking: record[34],
											reading: record[35],
											writing: record[36],
											total: record[37],
											comments: record[38],
										}
									},
									assessments: {
										type: record[39],
										listening: record[40],
										speaking: record[41],
										reading: record[42],
										writing: record[43],
										total: record[44],
										comments: record[45],
									},
									cep: {
										tool: record[110],
										comments: record[111],
									},
									feedback: record[112]
								})
							}
							break;
						case 'LKG/UKG':
							for (record of data) {
								records.push({
									date: record[1],
									volunteer: record[2],
									standard: record[3],
									student: record[46],
									class_type: record[47],
									chapters_covered: {
										phonics_rhymes: record[48],
										literacy: record[49],
										numeracy: record[50],
										general_awareness: record[51]
									},
									concepts_taught: {
										phonics_rhymes: record[52],
										literacy: record[53],
										numeracy: record[54],
										general_awareness: record[55]
									},
									text_pages: {
										phonics_rhymes: record[56],
										literacy: record[57],
										numeracy: record[58],
										general_awareness: record[59]
									},
									activity_pages: {
										numeracy: record[60],
										literacy: record[61],
										general_awareness: record[62]
									},
									resources: {
										worksheet: {
											chapter: record[63],
											worksheet: record[64],
										},
										lesson_plan: {
											concept: record[65],
											objective: record[66],
											resources: record[67],
											creative_techniques: [68],
										}
									},
									class_components: {
										digital_resource: record[69],
										resource_box: record[70],
									},
									cep_class: {
										library_comments: record[71],
										tools: record[72],
										comments: record[73],
									},
									tests: {
										type: record[30],
										slip: {
											total: record[31],
											comments: record[32],
										},
										unit: {
											listening: record[33],
											speaking: record[34],
											reading: record[35],
											writing: record[36],
											total: record[37],
											comments: record[38],
										}
									},
									assessments: {
										type: record[39],
										listening: record[40],
										speaking: record[41],
										reading: record[42],
										writing: record[43],
										total: record[44],
										comments: record[45],
									},
									cep: {
										tool: record[110],
										comments: record[111],
									},
									feedback: record[112]
								})
							}
							break;
						case 'Levels':
							for (record of data) {
								records.push({
									date: record[1],
									volunteer: record[2],
									standard: record[3],
									student: record[75],
									class_type: record[76],
									chapters_covered: {
										textbook: record[77],
										activity: record[78],
									},
									concepts_taught: {
										textbook: record[79],
										activity: record[80],
									},
									text_pages: record[81],
									activity_pages: record[82],
									resources: {
										worksheet: {
											chapter: record[83],
											worksheet: record[84],
										},
										lesson_plan: {
											concept: record[85],
											objective: record[86],
											resources: record[87],
											creative_techniques: [88],
										}
									},
									class_components: {
										digital_resource: record[89],
										resource_box: record[90],
									},
									cep_class: {
										library_comments: record[91],
										tools: record[92],
										comments: record[93],
									},
									tests: {
										type: record[94],
										slip: {
											total: record[31],
											comments: record[32],
										},
										unit: {
											listening: record[95],
											speaking: record[96],
											reading: record[97],
											writing: record[98],
											grammar: record[99],
											total: record[100],
											comments: record[101],
										}
									},
									assessments: {
										type: record[102],
										listening: record[103],
										speaking: record[104],
										reading: record[105],
										writing: record[106],
										grammar: record[107],
										total: record[108],
										comments: record[109],
									},
									cep: {
										tool: record[110],
										comments: record[111],
									},
									feedback: record[112]
								})
							}
					}
					console.log(records)
					callback({ records });
				},
				response => {
					callback(false, response.result.error);
				}
			)
	})
}