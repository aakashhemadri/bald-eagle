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
					const data = response.result.values;
					var records = [];
					var record = [];
					console.log(data)
					for (record of data) {
						if (record[3] === standard) {
							records.push({
								date: record[1].split('/').reverse().join('-'),
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
									tool: record[111],
									comments: record[112],
								},
								feedback: record[113]
							})
						}
						if ((record[3] === standard)) {
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
									tool: record[111],
									comments: record[112],
								},
								feedback: record[113]
							})
						}
						else if ((standard === record[3])) {
							records.push({
								date: record[1],
								volunteer: record[2],
								standard: record[3],
								student: record[74],
								class_type: record[75],
								chapters_covered: {
									textbook: record[76],
									activity: record[77],
								},
								concepts_taught: {
									textbook: record[78],
									activity: record[79],
								},
								text_pages: {
									textbook: record[80],
									activity: record[81],
								},
								activity_pages: {
									textbook: record[82],
									activity: record[83],
								},
								resources: {
									worksheet: {
										chapter: record[84],
										worksheet: record[85],
									},
									lesson_plan: {
										concept: record[86],
										objective: record[87],
										resources: record[88],
										creative_techniques: [89],
									}
								},
								class_components: {
									digital_resource: record[90],
									resource_box: record[91],
								},
								cep_class: {
									library_comments: record[92],
									tools: record[93],
									comments: record[94],
								},
								tests: {
									type: record[95],
									slip: {
										total: record[31],
										comments: record[32],
									},
									unit: {
										listening: record[96],
										speaking: record[97],
										reading: record[98],
										writing: record[99],
										grammar: record[100],
										total: record[101],
										comments: record[102],
									}
								},
								assessments: {
									type: record[103],
									listening: record[104],
									speaking: record[105],
									reading: record[106],
									writing: record[107],
									grammar: record[108],
									total: record[109],
									comments: record[110],
								},
								cep: {
									tool: record[111],
									comments: record[112],
								},
								feedback: record[113]
							})
						}
					}
					if (date !== "") {
						records = records.filter((record) => {
							return (date === record.date) && (record.standard === standard) && (record.student === student ? true : ((student === "Student") ? true : false))
						})
					}
					else {
						records = records.filter((record) => {
							return (record.standard === standard) && (record.student === student ? true : ((student === "Student") ? true : false))
						})
					}
					records = records.sort().reverse();
					callback({ records });
				},
				response => {
					callback(false, response.result.error);
				}
			)
	})
}