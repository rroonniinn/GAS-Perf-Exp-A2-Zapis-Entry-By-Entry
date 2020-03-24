/**
 * Rozdzielenie danych z jednego pliku na niezależne
 */

import { getSheet } from '../../../GAS | Library/v02/gas/getSheet';
import { getIdFromUrl } from '../../../GAS | Library/v02/gas/getIdFromUrl';
import { copySheetsToOther } from '../../../GAS | Library/v02/gas/copySheetsToOther';
import { paste } from '../../../GAS | Library/v02/gas/paste';

const TEMPLATE = {
	url:
		'https://docs.google.com/spreadsheets/d/1Z2bqYpy2UA4QLhs5GXZNbxA2ZXOOk_pmyRbkufbfbI4/edit#gid=1817049872',
	sheet: 'Template',
};

const EXTERNALS = {
	// sortedJbJ: {
	// 	url:
	// 		'https://docs.google.com/spreadsheets/d/1Sh_1y8MUtr-ptJMtpsiv9UADGgkPojtEiBSt387-LDU/edit#gid=1817049872',
	// 	types: 'Job By Job',
	// 	sheetScheme: '(s)',
	// },
	unSortedJbJ: {
		url:
			'https://docs.google.com/spreadsheets/d/13sff0e2t502KvLKDYVVvKhkZbt0zjhRgnyXj1N8R5Eg/edit#gid=0',
		types: 'Job By Job',
		sheetScheme: '(u)',
	},
	sortedTbT: {
		url:
			'https://docs.google.com/spreadsheets/d/1dAOoQPhZd9QCuF45mavcUfPV1FswNgxXCtApLgZs7Ns/edit#gid=0',
		types: 'Task By Task',
		sheetScheme: '(s)',
	},
	unSortedTbT: {
		url:
			'https://docs.google.com/spreadsheets/d/1JZ_XtdFdjUFY28r5fjjRi9JB0pD5JBcdZU2Z359Dqvk/edit#gid=0',
		types: 'Task By Task',
		sheetScheme: '(u)',
	},
	unSortedSingle: {
		url:
			'https://docs.google.com/spreadsheets/d/1vlw4rsft39S7KdatpkuIRzx1eoLZEMLJmeSnoS6fN44/edit#gid=0',
		types: 'Single Random',
		sheetScheme: '(u)',
	},
};

/**
 *
 *
 * @param {string} taskCode - np. sortedJbJ
 */
const ditribute = taskCode => {
	// Pobierz plik docelowy
	const targetId = getIdFromUrl(EXTERNALS[taskCode].url);

	// pobierz istniejace
	const sources = SpreadsheetApp.getActive()
		.getSheets()
		.filter(sheet =>
			sheet.getName().includes(EXTERNALS[taskCode].sheetScheme)
		);

	// dla każdego sheeta powyższego wyknaj:
	sources.forEach(srcSheet => {
		// skopiuj arkusz z templatem
		copySheetsToOther(getIdFromUrl(TEMPLATE.url), targetId, sheet =>
			sheet.getName().includes('Template')
		);

		// pobierz skopiowany arkusz
		const sheetToPaste = getSheet('Template', targetId);

		// pobierz dane i pozostaw tylk pasujące do wzoru
		const data = srcSheet
			.getRange('A3:E')
			.getValues()
			.filter(
				([, , , , type]) => type === EXTERNALS[taskCode].types
			);

		const srcSheetName = srcSheet.getName();

		// wklej i zmień nazwę i nagłówek
		paste(sheetToPaste, 'A', data, {
			restrictCleanup: 'down',
		})
			.setName(srcSheetName)
			.collapseAllRowGroups()
			.getRange('AT1')
			.setValue(
				`External - modyfikacja ${
					/[0-9]+/.exec(srcSheetName)[0]
				} niezależnych wierszy (Single Random)`
			);
	});
};

const ditributeToOtherFiles = () => {
	Object.keys(EXTERNALS).forEach(code => ditribute(code));
};

export { ditributeToOtherFiles };
