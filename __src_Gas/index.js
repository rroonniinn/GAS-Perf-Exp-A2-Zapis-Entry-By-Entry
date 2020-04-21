/* eslint-disable max-lines */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-lines */
/* eslint-disable max-params */

/**
 * @typedef {import('../../GAS | Library/v02/experiments/types').ExpSheet} ExpSheet
 * @typedef {import('../../GAS | Library/v02/experiments/types').ExpTasks} ExpTasks
 * @typedef {import('../../GAS | Library/v02/gas/styleSheet').RangeOptions} RangeOptions
 */

import { setMenu } from '../../GAS | Library/v02/gas/setMenu';
import { paste } from '../../GAS | Library/v02/gas/paste';
import { getProperSheet } from '../../GAS | Library/v02/experiments/getProperSheet';
import { runRandom } from '../../GAS | Library/v02/experiments/runRandom';
import { buildStructure } from '../../GAS | Library/v02/experiments/buildStructure';
import { randomIntegersArray } from '../../GAS | Library/v02/arr/randomIntegersArray';
import {
	setEveryMin,
	stopTimeTriggers,
} from '../../GAS | Library/v01/gas/timeTriggers';

import { EXP_SETUP } from './config';

/**
 * * Helper
 * Funkcja oczekująca tablicy funkcji z których będzie losowała te, które
 * mają właśnie się odpalić. Załadowany jest już do niej plik configu
 * @type {(arr: [string, function, string][]) => void}
 */

const go = runRandom(EXP_SETUP);

/* ******************************* ZADANIA ******************************** */

/**
 * Modyfikuje określoną liczbę wpisów we wskazanym arkuszu zewnętrznym
 * @param {'ext'|'loc'|'hub'} geo Strukura danych do pobrania
 * @param {number} quant Liczba modyfikacji
 * @param {boolean} [sort] Czy sortować indeksy
 * @return {(target: ExpSheet) => any} target Np. target1 czy target2
 */
const modifiyEntries = (geo, quant, sort = false) => target => {
	const sheet = getProperSheet(geo, target, EXP_SETUP);

	const maxIdx = target.size - 1;
	const idxs = randomIntegersArray(quant, 0, maxIdx, true, false, sort);

	idxs.forEach(idx => {
		paste(sheet, `A${idx + 1}`, [randomIntegersArray(15, 0, 30)], {
			notRemoveFilers: true,
			restrictCleanup: 'preserve',
			notRemoveEmptys: true,
		});
		console.log(
			`Type: ${geo.toUpperCase()}. Paste into: '${
				target.printName
			}'. Rows nr: ${idx + 1}. Total rows: '${quant}'.`
		);
	});
};

/* **************************** SETUP EXPERYMENTU ************************ */

// @ts-ignore
global.exp = {
	// Sety funkcji do losowania
	loc: go([
		['loc', modifiyEntries('loc', 1), 'a'],
		['loc', modifiyEntries('loc', 5), 'b'],
		['loc', modifiyEntries('loc', 10), 'c'],
		['loc', modifiyEntries('loc', 25), 'd'],
		['loc', modifiyEntries('loc', 50), 'e'],
		['loc', modifiyEntries('loc', 100), 'f'],
	]),
	hub: go([
		['hub', modifiyEntries('hub', 1), 'a'],
		['hub', modifiyEntries('hub', 5), 'b'],
		['hub', modifiyEntries('hub', 10), 'c'],
		['hub', modifiyEntries('hub', 25), 'd'],
		['hub', modifiyEntries('hub', 50), 'e'],
		['hub', modifiyEntries('hub', 100), 'f'],
	]),
	ext: go([
		['ext', modifiyEntries('ext', 1), 'a'],
		['ext', modifiyEntries('ext', 5), 'b'],
		['ext', modifiyEntries('ext', 10), 'c'],
		['ext', modifiyEntries('ext', 25), 'd'],
		['ext', modifiyEntries('ext', 50), 'e'],
		['ext', modifiyEntries('ext', 100), 'f'],
	]),
};

// @ts-ignore
global.utils = {
	buildStructure: () => buildStructure(EXP_SETUP),
	triggersFire: () => {
		setEveryMin('exp.loc', 1);
		setEveryMin('exp.hub', 1);
		setEveryMin('exp.ext', 1);
	},
	triggersStop: stopTimeTriggers,
};

const menuElements = [
	['Zbuduj / zresetuj strukturę plików', 'utils.buildStructure'],
	[
		'Przetestuj funkcje',
		['Local', 'exp.loc'],
		['Hub', 'exp.hub'],
		['External', 'exp.ext'],
	],
	'-------------------',
	['Uruchom eksperyment', 'utils.triggersFire'],
	['Zatrzymaj eksperyment', 'utils.triggersStop'],
	'-------------------',
	['Update menu', 'onOpen'],
];

// @ts-ignore
global.onOpen = () => {
	setMenu(menuElements, 'ICON', true);
};

export { modifiyEntries };
