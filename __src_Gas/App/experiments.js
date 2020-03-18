/* eslint-disable max-params */
import { looper } from '../../../GAS | Library/v01/utils/looper';
import { tasks } from './tasks';
import { runJbJ, runTbT, fire } from './helpers';

import { SHEETS } from './config';

/* ***************** Strukrura testów ******************* */

/**
 * Odpalenie 'times' razy każdego zadania i przejście do następnego
 * @param {number} times
 * @param {function} callback Którą funkcję mam zastosowac
 * @param {string} desc Opis np. Wklejenie danych (external)
 */

const jbj = (times, callback, desc) => () => {
	looper(times, runJbJ(callback('l100'), 'Arr 1: 100', desc));
	looper(times, runJbJ(callback('l200'), 'Arr 2: 200', desc));
	looper(times, runJbJ(callback('l500'), 'Arr 3: 500', desc));
	looper(times, runJbJ(callback('l1000'), 'Arr 4: 1000', desc));
	looper(times, runJbJ(callback('l2000'), 'Arr 5: 2000', desc));
	looper(times, runJbJ(callback('l4000'), 'Arr 6: 4000', desc));
	looper(times, runJbJ(callback('l8000'), 'Arr 7: 8000', desc));
	looper(times, runJbJ(callback('l16000'), 'Arr 8: 16000', desc));
};

/**
 * Odpalenie 'times' razy sekwencji składającej się ze wszystkich zadań
 * @param {number} times
 * @param {function} callback
 * @param {string} desc Opis np. Wklejenie danych (external)
 */

const tbt = (times, callback, desc) => () => {
	looper(times, () => {
		runTbT(callback('l100'), 'Arr 1: 100', desc)();
		runTbT(callback('l200'), 'Arr 2: 200', desc)();
		runTbT(callback('l500'), 'Arr 3: 500', desc)();
		runTbT(callback('l1000'), 'Arr 4: 1000', desc)();
		runTbT(callback('l2000'), 'Arr 5: 2000', desc)();
		runTbT(callback('l4000'), 'Arr 6: 4000', desc)();
		runTbT(callback('l8000'), 'Arr 7: 8000', desc)();
		runTbT(callback('l16000'), 'Arr 8: 16000', desc)();
	});
};

const DESC = 'Modyfikacja entry by entry ';

/**
 * Obiekt ze wszystkimi callbackami do eksperymetów
 */
const exps = {
	/* Posortowane */
	// 1
	s1JbJ: fire(50, tasks.sort1, jbj, `${DESC}(1) s`, SHEETS.s1),
	s1TbT: fire(50, tasks.sort1, tbt, `${DESC}(1) s`, SHEETS.s1),
	// 2
	s5JbJ: fire(50, tasks.sort5, jbj, `${DESC}(5) s`, SHEETS.s5),
	s5TbT: fire(50, tasks.sort5, tbt, `${DESC}(5) s`, SHEETS.s5),
	// 10
	s10JbJ: fire(50, tasks.sort10, jbj, `${DESC}(10) s`, SHEETS.s10),
	s10TbT: fire(50, tasks.sort10, tbt, `${DESC}(10) s`, SHEETS.s10),
	// 25
	s25JbJ: fire(50, tasks.sort25, jbj, `${DESC}(25) s`, SHEETS.s25),
	s25TbT: fire(50, tasks.sort25, tbt, `${DESC}(25) s`, SHEETS.s25),
	// 50
	s50JbJ: fire(50, tasks.sort50, jbj, `${DESC}(50) s`, SHEETS.s50),
	s50TbT: fire(50, tasks.sort50, tbt, `${DESC}(50) s`, SHEETS.s50),
	// 100
	s100JbJ: fire(50, tasks.sort100, jbj, `${DESC}(100) s`, SHEETS.s100),
	s100TbT: fire(50, tasks.sort100, tbt, `${DESC}(100) s`, SHEETS.s100),

	/* Nie posortowane */
	// 1
	u1JbJ: fire(50, tasks.unSort1, jbj, `${DESC}(1) u`, SHEETS.u1),
	u1TbT: fire(50, tasks.unSort1, tbt, `${DESC}(1) u`, SHEETS.u1),
	// 5
	u5JbJ: fire(50, tasks.unSort5, jbj, `${DESC}(5) u`, SHEETS.u5),
	u5TbT: fire(50, tasks.unSort5, tbt, `${DESC}(5) u`, SHEETS.u5),
	// 10
	u10JbJ: fire(50, tasks.unSort10, jbj, `${DESC}(10) u`, SHEETS.u10),
	u10TbT: fire(50, tasks.unSort10, tbt, `${DESC}(10) u`, SHEETS.u10),
	// 25
	u25JbJ: fire(50, tasks.unSort25, jbj, `${DESC}(25) u`, SHEETS.u25),
	u25TbT: fire(50, tasks.unSort25, tbt, `${DESC}(25) u`, SHEETS.u25),
	// 50
	u50JbJ: fire(50, tasks.unSort50, jbj, `${DESC}(50) u`, SHEETS.u50),
	u50TbT: fire(50, tasks.unSort50, tbt, `${DESC}(50) u`, SHEETS.u50),
	// 100
	u100JbJ: fire(50, tasks.unSort100, jbj, `${DESC}(100) u`, SHEETS.u100),
	u100TbT: fire(50, tasks.unSort100, tbt, `${DESC}(100) u`, SHEETS.u100),
};

export { exps };
