/* eslint-disable max-params */
import { paste } from '../../../GAS | Library/v02/gas/paste';
import { getSheet } from '../../../GAS | Library/v02/gas/getSheet';
import { getIdFromUrl } from '../../../GAS | Library/v02/gas/getIdFromUrl';
import { randomIntegersArray } from '../../../GAS | Library/v02/arr/randomIntegersArray';
import { copySheetsToOther } from '../../../GAS | Library/v02/gas/copySheetsToOther';

import { EXT_SHEET_URL, EXT_SHEET_NAME, HUB_URL } from './config';

/**
 * Zwraca odpowieni arkusz do modyfikacji na podstawie parametru 'geo'
 * określającego czy ma być to external, local czy hub
 *
 * @param {string} geo Określenie 'ext', 'loc', 'hub'
 * @param {string} sheetCode Zdefiniowany kod zadania np. l100
 * @returns {GoogleAppsScript.Spreadsheet.Sheet} Obiket arkusza
 */

const getProperSheet = (geo, sheetCode) => {
	if (geo === 'ext') {
		return getSheet(
			EXT_SHEET_NAME,
			getIdFromUrl(EXT_SHEET_URL[sheetCode])
		);
	}
	if (geo === 'loc') {
		return getSheet(sheetCode);
	}
	if (geo === 'hub') {
		return getSheet(sheetCode, getIdFromUrl(HUB_URL));
	}
};

/**
 * Helper
 * Pobiera numer ze stringa
 * @param {string} str Zdefiniowany kod zadania np. l100
 */
const getNumbFromStr = str => Number(/[0-9]+/.exec(str)[0]);

/**
 * Kopiuje arkusze z testowymi danymi do bierzącego skoroszytu
 */

const copySheetsToLocalTest = () => {
	const copyFrom = '1zzFR2LV4_RzqimV408nhOP4oc2kjSATbbOE2p7XBQs4';
	const copyTo = '1o8B3rac2gFBPlyaqqJaeZABEJSseLvu_9Q0Eeo4vKAM';
	copySheetsToOther(copyFrom, copyTo, sheet =>
		sheet.getName().includes('res')
	);
};

/**
 * Usuwa stare dane z arkuszy powstałych jako kopiowanie z innych, już
 * istniejących plików
 */

const deleteOldDate = () => {
	const fileId = '1go0ZdOM6qC0AQrYdTtCqLKeC8p1hHod9sAX3qgzon5M';
	SpreadsheetApp.openById(fileId)
		.getSheets()
		.filter(sheet => sheet.getName().includes('T:'))
		.forEach(sheet => sheet.getRange('A3:E').clearContent());
};

/**
 * Modyfikuje określoną liczbę wpisów we wskazanym arkuszu zewnętrznym
 * @param {string} geo Gdzie dane mają zostać zmodyfikowane - 'ext', 'loc', 'hub'
 * @param {number} quant Liczba modyfikacji
 * @param {boolean} [sort] Czy sortować indeksy
 * @return {(sheetCode: string) => function} sheetCode - Zdefiniowany kod zadania np. l100
 */
const modifiyEntries = (geo, quant, sort = false) => sheetCode => () => {
	const sheet = getProperSheet(geo, sheetCode);

	const maxIdx = getNumbFromStr(sheetCode) - 1;
	const idxs = randomIntegersArray(quant, 0, maxIdx, true, false, sort);

	idxs.forEach(idx => {
		paste(sheet, `A${idx + 1}:O`, [randomIntegersArray(15, 0, 30)], {
			notRemoveFilers: true,
			restrictCleanup: 'preserve',
			notRemoveEmptys: true,
		});
		console.log(
			`Type: ${geo.toUpperCase()}. Paste into: '${sheetCode}'. Rows nr: ${idx}. Total rows: '${quant}'.`
		);
	});
};

const tasks = {
	/**
	 * Funkcje z posortowanym indeksem - czyli modyfikacje są ułożone
	 * w kolejności występowania w docelowym arkuszu
	 *
	 * To są funkcje wklejające dane do plików zewnętrznych
	 */
	sort1: modifiyEntries('ext', 1, true),
	sort5: modifiyEntries('ext', 5, true),
	sort10: modifiyEntries('ext', 10, true),
	sort25: modifiyEntries('ext', 25, true),
	sort50: modifiyEntries('ext', 50, true),
	sort100: modifiyEntries('ext', 100, true),

	/**
	 * External
	 */
	ext1: modifiyEntries('ext', 1),
	ext5: modifiyEntries('ext', 5),
	ext10: modifiyEntries('ext', 10),
	ext25: modifiyEntries('ext', 25),
	ext50: modifiyEntries('ext', 50),
	ext100: modifiyEntries('ext', 100),

	/**
	 * Local
	 */
	loc1: modifiyEntries('loc', 1),
	loc5: modifiyEntries('loc', 5),
	loc10: modifiyEntries('loc', 10),
	loc25: modifiyEntries('loc', 25),
	loc50: modifiyEntries('loc', 50),
	loc100: modifiyEntries('loc', 100),

	/**
	 * Hub
	 */
	hub1: modifiyEntries('hub', 1),
	hub5: modifiyEntries('hub', 5),
	hub10: modifiyEntries('hub', 10),
	hub25: modifiyEntries('hub', 25),
	hub50: modifiyEntries('hub', 50),
	hub100: modifiyEntries('hub', 100),
};

export { tasks, copySheetsToLocalTest, deleteOldDate };
