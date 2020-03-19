import { paste } from '../../../GAS | Library/v02/gas/paste';
import { getSheet } from '../../../GAS | Library/v02/gas/getSheet';
import { getIdFromUrl } from '../../../GAS | Library/v02/gas/getIdFromUrl';
import { randomIntegersArray } from '../../../GAS | Library/v02/arr/randomIntegersArray';

import { EXT_SHEET_URL, EXT_SHEET_NAME, MOD_ROW } from './config';

/**
 * Helper
 * Pobiera odpowiedni obiekt arkusza
 * @param {string} sheetCode Zdefiniowany kod zadania np. l100
 */
const getExtSheet = sheetCode =>
	getSheet(EXT_SHEET_NAME, getIdFromUrl(EXT_SHEET_URL[sheetCode]));

/**
 * Helper
 * Pobiera numer ze stringa
 * @param {string} str Zdefiniowany kod zadania np. l100
 */
const getNumbFromStr = str => Number(/[0-9]+/.exec(str)[0]);

/**
 * Modyfikuje określoną liczbę wpisów we wskazanym arkuszu
 * @param {number} quant Liczba modyfikacji
 * @param {boolean} sort Czy sortować indeksy
 * @return {(sheetCode: string) => function} sheetCode - Zdefiniowany kod zadania np. l100
 */
const modifiyEntries = (quant, sort) => sheetCode => () => {
	const sheet = getExtSheet(sheetCode);
	const maxIdx = getNumbFromStr(sheetCode) - 1;
	const idxs = randomIntegersArray(quant, 0, maxIdx, true, false, sort);

	idxs.forEach(idx => {
		// paste(sheet, `A${idx + 1}:O`, MOD_ROW, {
		paste(sheet, `A${idx + 1}:O`, [randomIntegersArray(15, 0, 30)], {
			notRemoveFilers: true,
			restrictCleanup: 'preserve',
			notRemoveEmptys: true,
		});
		console.log(
			`Paste into: '${sheetCode}'. Rows nr: ${idx}. Total rows: '${quant}'.`
		);
	});
};

const tasks = {
	/**
	 * Funkcje z posortowanym indeksem - czyli modyfikacje są ułożone
	 * w kolejności występowania w docelowym arkuszu
	 */
	sort1: modifiyEntries(1, true),
	sort5: modifiyEntries(5, true),
	sort10: modifiyEntries(10, true),
	sort25: modifiyEntries(25, true),
	sort50: modifiyEntries(50, true),
	sort100: modifiyEntries(100, true),
	/**
	 * Funkcje z nieposortowanym indeksem - czyli modyfikacje są ułożone
	 * w kolejności występowania w docelowym arkuszu
	 */
	unSort1: modifiyEntries(1, false),
	unSort5: modifiyEntries(5, false),
	unSort10: modifiyEntries(10, false),
	unSort25: modifiyEntries(25, false),
	unSort50: modifiyEntries(50, false),
	unSort100: modifiyEntries(100, false),
};

export { tasks };
