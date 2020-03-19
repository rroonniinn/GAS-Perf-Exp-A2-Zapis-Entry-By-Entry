var global=this;function menu() {
}
function s1TbT() {
}
function s5TbT() {
}
function s10TbT() {
}
function s25TbT() {
}
function s50TbT() {
}
function s100TbT() {
}
function u1TbT() {
}
function u5TbT() {
}
function u10TbT() {
}
function u25TbT() {
}
function u50TbT() {
}
function u100TbT() {
}
function onOpen() {
}(function (factory) {
	typeof define === 'function' && define.amd ? define('index', factory) :
	factory();
}((function () { 'use strict';

	/**
	 * Funkcja rekursywna odpalająca przekazany callback określoną
	 * liczę razy. Przydatna do testów wydajności
	 *
	 * @param {Number} count Liczba od 1 do 1000
	 * @param {Function} callback
	 * @returns
	 */
	const looper = (count, callback) => {
	  if (count <= 0) throw new Error('Wrong count number');
	  if (count > 1000) throw new Error('Too much recursion');
	  if (count === 1) return callback();
	  callback();
	  return looper(count - 1, callback);
	};

	/**
	 * Zamienia nagłówek (np. A) ma numer kolumny (np. 1)
	 * Wzięte stąd: https://stackoverflow.com/questions/21229180/convert-column-index-into-corresponding-column-letter/21231012#21231012
	 * @memberof Lib_Gas
	 * @param {string} letter Identyfikator kolumny np. 'B'
	 * @returns {number} Numer kolumny np. 2
	 */
	const letterToColumn = letter => {
	  let column = 0;
	  const {
	    length
	  } = letter;

	  for (let i = 0; i < length; i++) {
	    column += (letter.charCodeAt(i) - 64) * 26 ** (length - i - 1);
	  }

	  return column;
	};

	const getColAndRowFromCellAsNum = str => {
	  const regExRes = /(([A-Z]+)([0-9]+?)):/.exec(str);

	  if (!regExRes) {
	    throw new TypeError(`Not valid string to "getColAndRowFromCellAsNum".
			Expected something like "A3:B4", got ${str}`);
	  }

	  return {
	    col: letterToColumn(regExRes[2]),
	    row: Number(regExRes[3])
	  };
	};

	/**
	 * Z przekazanego zakresu jako stringa w formacie 'A1:B3'
	 * zwraca tylko pierwszą komórkę jako string. W tym przypadku 'A1'
	 *
	 * @param {String} str Zakres typu A1:B2, A1:2, A1:B
	 * @returns {String}
	 */
	const getFirstCellFromString = str => {
	  const regExRes = /([A-Z]+[0-9]+?):/.exec(str);

	  if (!regExRes) {
	    throw new TypeError(`Not valid string to "getFirstCellFromString".
			Expected something like "A3:B4", got ${str}`);
	  }

	  return regExRes[1];
	};
	/**
	 * BUG? Patern przepuszca sting A0:.... można by to poprawić kiedyś
	 */

	/* eslint-disable no-param-reassign */

	/**
	 * Zmienia numer kolumny na odpowiednią literę nagłowka (np. 1 na A).
	 * Wzięte stąd: https://stackoverflow.com/questions/21229180/convert-column-index-into-corresponding-column-letter
	 *
	 * @param {Number} column Numer kolumny
	 * @returns {String} Nagłówek kolumny
	 */
	const columnToLetter = column => {
	  let temp;
	  let letter = '';

	  while (column > 0) {
	    temp = (column - 1) % 26;
	    letter = String.fromCharCode(temp + 65) + letter;
	    column = (column - temp - 1) / 26;
	  }

	  return letter;
	};

	const isDate = val => val instanceof Date;

	/* eslint-disable complexity */

	const checkArr = arr => {
	  const booleanMap = arr.map(el => Array.isArray(el) ? checkArr(el) : el === 0 ? false : !el);
	  return !booleanMap.flat(10).some(el => el === false);
	};
	/**
	 * Sprawdza czy otrzymana wartość jest pusta.
	 * Zatem:
	 * [] = true, [[]] = true, [[[]]] = true, {} = true, [''] = true,
	 * { a: '' } = true, { a: [] } = true, { a: [[]] } = true,
	 *
	 * [[[1]]] = false, { a: [[1]] } = false, [0] = false,
	 * { a: 0 } = false, 0 = false
	 *
	 * Nie działa tylko poprawnie dla zagnieżdzonych obiektów
	 * [{}] - false / a powinno być true
	 *
	 * Nie działa poprawnie dla pusych komórek zawierających ukryte znaki
	 *
	 * @param {Any} input Dowolna wartość
	 * @returns {Boolean}
	 */


	const isEmpty = val => {
	  if (isDate(val)) {
	    return false;
	  }

	  if (Array.isArray(val)) {
	    return checkArr(val);
	  }

	  if (typeof val === 'object' && val !== null) {
	    return checkArr(Object.values(val));
	  }

	  return val === 0 ? false : !val;
	};

	const normalize = el => typeof el === 'string' ? el.replace(/[\t\r\n\s]+/g, '') : el;
	/**
	 * Zwraca numer ostatniej kolumny z treścią we wskazanym wierszu.
	 * Pomiędzy kolumnami z treścią mogą być kolumny puste. Nie wpływa
	 * to na ostateczny wynik. Dla pustego wiersza zwraca 0.
	 *
	 * QUnit zrobiony. Arkusz z przypadkami:
	 * https://docs.google.com/spreadsheets/d/1zxVvTtQAfOKT1jbExBEvh0ZetN5TfPv-TEgy6vHpGs0/edit#gid=349586621
	 *
	 * @param {Object} sheetObj Obiekt arkusza
	 * @param {String} colStr
	 * @returns {Number} Numer ostatniego wiersza z treścią
	 */


	const getLastNotEmptyColInRow = (sheetObj, rowNum) => {
	  const indexes = sheetObj.getRange(`${rowNum}:${rowNum}`).getValues().slice(0, 1).flat(1).map(normalize).map((el, i) => !isEmpty(el) ? i + 1 : 0); // const max = Math.max(...indexes);
	  // return max === 0 ? 0 : max + 1;

	  return Math.max(...indexes);
	};
	/**
	 * Todo:
	 * - obsługa błędów dla nieprawidłowych argumentów
	 */

	const normalize$1 = ([el]) => typeof el === 'string' ? el.replace(/[\t\r\n\s]+/g, '') : el;
	/**
	 * Zwraca numer ostatniego wiersza z treścią we wskazanej kolumnie.
	 * Pomiędzy wierszami z treścią mogą być wiersze puste. Nie wpływa
	 * to na ostateczny wynik. Dla pustej kolumny zwraca 0.
	 *
	 * QUnit zrobiony. Arkusz z przypadkami:
	 * https://docs.google.com/spreadsheets/d/1e7G8Yo8Np30bnyXzQm8NNyTZtBIZfK2eMjtd06f1GxM/edit#gid=0
	 *
	 * @param {Object} sheetObj Obiekt arkusza
	 * @param {String} colStr
	 * @returns {Number} Numer ostatniego wiersza z treścią
	 */


	const getLastNotEmptyRowInCol = (sheetObj, colStr) => {
	  const indexes = sheetObj.getRange(`${colStr}:${colStr}`).getValues().map(normalize$1).map((el, i) => !isEmpty(el) ? i + 1 : 0);
	  return Math.max(...indexes);
	};
	/**
	 * Todo:
	 * - możliwość przekazania równieć numeru kolumny
	 * - obsługa błędów dla nieprawidłowych argumentów
	 */

	/**
	 * Własna implementacja pipe oparta na materiale z
	 * // https://medium.com/javascript-scene/reduce-composing-software-fe22f0c39a1d
	 *
	 * @param {function}  fns Dowolna liczna funkcji
	 * @returns {(x:any) => any} Zwraca funkcję oczekującą wartości inicjalnej
	 */
	const pipe = (
	/** @type {array} */
	...fns) => x => fns.reduce((v, f) => f(v), x);

	/* eslint-disable max-params */

	const extendedColLetter = (startLetter, extendToRight) => {
	  const endNum = letterToColumn(startLetter) + extendToRight;
	  return columnToLetter(endNum);
	};
	/**
	 * Bierze zakres w formacie 'A1:E20'. Zwraca zakres ograniczony do liczby
	 * komórek w poziomie i pionie. Zwraca nowy zakres np. 'A1:B5'
	 *
	 * @param {String} range Zakres w formacie 'A1:B2'
	 * @param {Number} restHor Liczba komórek w poziomie
	 * która ma zostać w zakresie
	 * @param {Number} restVer Liczba komórek w pionie
	 * która ma zostać w zakresie
	 * @returns {String} Zakres po modyfikacjach
	 */


	const getRangeRestricted = (range, restHor = null, restVer = null) => pipe(() => /(([A-Z]+)([0-9]+?)):(([A-Z]+)?([0-9]+)?)/.exec(range), ([,, sChar, sNum,, eChar, eNum]) => ({
	  startLet: sChar,
	  startNum: Number(sNum),
	  endLet: eChar,
	  endNum: Number(eNum)
	}), ({
	  startLet,
	  startNum,
	  endLet,
	  endNum
	}) => ({
	  startLet,
	  startNum,
	  endLet,
	  endNum,
	  finalEndLet: restHor ? extendedColLetter(startLet, restHor - 1) : endLet,
	  finalEndNum: restVer ? startNum + restVer - 1 : endNum
	}), ({
	  startLet,
	  startNum,
	  finalEndLet,
	  finalEndNum
	}) =>
	/* Jeśli range występuje w formacie A1:9 lub A1:C
	dostajemy undefine jak eChar lub eNum - dltego
	zamieniamy na pusty, ignorowany string '' */
`${startLet}${startNum}:${finalEndLet || ''}${finalEndNum || ''}`	)();

	/* eslint-disable complexity */

	/**
	 * Zwraca informację o przekazanym rodzaju zakresu komórek.
	 * Zwraca kod typu:
	 * Dla A2:E4 -> regular;
	 * Dla A2 -> letNum;
	 * Dla A -> let;
	 * Dla 1 -> num;
	 * Dla '1' -> num;
	 * Dla innych wartości, lub "nie stringów" wyrzuca błąd
	 *
	 * @param {String} rangeStr Zakres
	 * @returns {String} kod
	 */
	const getRangeType = rangeStr => {
	  if (typeof rangeStr !== 'string' && typeof rangeStr !== 'number') throw new Error('Only string or numbers to getRangeType');
	  if (/:/.test(rangeStr)) return 'regular';
	  if (/[A-Z]+[1-9]+/.test(rangeStr)) return 'letNum';
	  if (/[A-Z]+/.test(rangeStr)) return 'let';
	  if (/[1-9]+/.test(rangeStr)) return 'num';
	  throw new Error('Not valid range');
	};

	/* eslint-disable max-params */
	/**
	 * Przyjmując 4 możliwe zapisy zakresu, zwraca m.in relatywny zakres
	 * uwzględniający znajdujące się w arkuszu dane. I tak dla przykładowego
	 * arkusza o wymiarach A1:J10 (10 x 10) po przekazaniu zakresu:
	 * 'A' - zakres zaczyna się od ostatniego pustego wiersza kolumny A,
	 * kończy się na ostatniej kolumnie. Np. A3:J
	 * '1' (lub 1) - zakres zaczyna się od ostatniej pustej kolumny wiersza 1,
	 * kończy się na ostatnim wierszu. Np. C1:J
	 * 'A1' - zakres zaczyna się w A1, kończy na ostatnim wierszu
	 * i kolumnie Np. A1:J10 (bez względu na znajdujące się już w arkuszu dane)
	 * 'A3:B5' zwraca nie zmieniony zakres.
	 *
	 * Jeśli dodatkowo zostaną przkazane argumenty restHor i/lub restVer
	 * wynikowy zakres będzie pomniejszony do przkazanej
	 * liczny wierszy (restVer) i/lub kolumn (restHor)
	 *
	 * Chcą podać tylko restVer należy przekazać restHor z wartością null
	 *
	 * @param {Object} sheetObj Obiekt arkusza
	 * @param {String|Number} strRange Zakres
	 * @param {Number|null} restHor Ograniczają zakres w poziomie traktując
	 * pierwszą komórkę (np. A1) jako początek zakresu. Zatem dla wynikowego
	 * zakresu np. A1:C3 dla restHor = 2 dostaniemy A1:B3
	 * @param {Number|null} restVer Ograniczają zakres w pionie traktując
	 * pierwszą komórkę (np. A1) jako początek zakresu. Zatem dla wynikowego
	 * zakresu np. A1:C3 dla restVer = 2 dostaniemy A1:C2
	 * @returns {Object} Obiekt o kluczach { range, rangeObj, sheetObj } gdzie
	 * range {String}, rangeObj {Object}, sheetObj {Object}
	 */

	const getRangeRelative = (sheetObj, strRange, restHor = null, restVer = null) => {
	  const opt = getRangeType(strRange);
	  let rangeTmp;

	  if (opt === 'letNum') {
	    const maxCols = sheetObj.getMaxColumns();
	    rangeTmp = `${strRange}:${columnToLetter(maxCols)}`;
	  }

	  if (opt === 'let') {
	    const maxColsLet = columnToLetter(sheetObj.getMaxColumns());
	    const starRow = getLastNotEmptyRowInCol(sheetObj, strRange) + 1;
	    rangeTmp = `${strRange}${starRow}:${maxColsLet}`;
	  }

	  if (opt === 'num') {
	    const maxRows = sheetObj.getMaxRows();
	    const startCol = getLastNotEmptyColInRow(sheetObj, strRange) + 1;
	    const startColLet = columnToLetter(startCol);
	    rangeTmp = `${startColLet}${strRange}:${maxRows}`;
	  }

	  if (opt === 'regular') {
	    rangeTmp = strRange;
	  } // Jeśli potrzeba zmiejszenia zakresu


	  const range = restHor || restVer ? getRangeRestricted(rangeTmp, restHor, restVer) : rangeTmp;
	  const rangeObj = sheetObj.getRange(range);
	  return {
	    range,
	    rangeObj,
	    sheetObj
	  };
	};
	/**
	 * Todo:
	 * - dla przekazanego normalnego zakresu (np. A1:B11) oraz zapisu A11
	 * mógłby sprawdzać czy pokrywa się z istniejącym zakresem całego
	 * arkusza (np. może nie być 11 wiersza)
	 */

	/**
	 * Weryfikuje czy przekazana wartośc jest tablicą 2d
	 *
	 * @param {Any} val Sprawdzana wartość
	 * @returns {Boolean} true / false
	 */
	const isArray2d = val => {
	  if (!Array.isArray(val)) return false;
	  if (!Array.isArray(val[0])) return false;
	  return true;
	};

	/**
	 * Sprawdza czy przekazana wartośc jest obiektem
	 * arkusza (Sheet). Weryfikuje czy dostępna jest
	 * na nim metoda .activate()
	 *
	 * @param {Any} val Sprawdzana wartość
	 */
	const isSheet = val => !!val.activate;

	/* eslint-disable complexity */

	/**
	 * Usuwa zbędne kolumny i wiersze ze wskazanego arkusza
	 *
	 * @memberof Lib_Gas
	 *
	 * @param {object} sheetObj Obiekt arkusza
	 * @returns {void}
	 */
	const removeEmptyRowCol = sheetObj => {
	  const frozenRows = sheetObj.getFrozenRows();
	  const maxDataRow = sheetObj.getLastRow();
	  const maxTotalRow = sheetObj.getMaxRows();
	  const rowDif = maxTotalRow - maxDataRow;
	  const frozenCols = sheetObj.getFrozenColumns();
	  const maxDataColumn = sheetObj.getLastColumn();
	  const maxTotalColumn = sheetObj.getMaxColumns();
	  const colDif = maxTotalColumn - maxDataColumn;

	  try {
	    if (rowDif + frozenRows !== maxTotalRow && maxDataRow !== 0 && rowDif > 0) sheetObj.deleteRows(maxDataRow + 1, rowDif);
	    if (colDif + frozenCols !== maxTotalColumn && maxDataColumn !== 0 && colDif > 0) sheetObj.deleteColumns(maxDataColumn + 1, colDif);
	  } catch (error) {
	    throw new Error(error);
	  }
	};

	/**
	 * Usuwa wszelkie filtry we wskazanym arkuszu
	 * Jako arkusz przyjmuje obiekt arkusza.
	 *
	 * @param {Object} sheetObj Nazwa arkusza
	 * @param {string} [fileId] Id pliku
	 * @returns {Object} Obiekt arkusza
	 */

	const removeFilter = sheetObj => {
	  if (!isSheet(sheetObj)) throw new TypeError('Not Sheet Object was pased into "removeFilter"');
	  const filter = sheetObj.getDataRange().getFilter();
	  if (filter) filter.remove();
	  return sheetObj;
	};

	/**
	 * Sprawdza czy przekazana wartość jest poprawnym identyfikatorem kolumny.
	 * Jako taki przyjmuje tylko integer lub string w formacie 'AA'
	 *
	 * @param {Number|String} col
	 * @returns {Boolean}
	 */
	const isColumn = col => typeof col === 'number' && col > 0 || typeof col === 'string' && /^[A-Z]+((?![1-9]|).)*$/.test(col);

	/* eslint-disable max-params */
	const dirs = {
	  az: true,
	  asc: true,
	  za: false,
	  des: false
	};

	const errorHandling = (sheetObj, col, dir) => {
	  if (typeof sheetObj !== 'object') throw new TypeError('Sheet object was not passed into "sortColumn"');
	  if (!isColumn(col)) throw new TypeError('Wrong type as "col" to "sortColumn" provided');
	  if (dirs[dir] === undefined) throw new TypeError('Only "az", "asc", "za", "des" may be passed as dir to "sortColumn"');
	};
	/**
	 * Sortuje wkazaną kolumnę w przekazanym obiekcie arkusza.
	 * Jako kolumnę przyjmuje zarówno numer jak i identyfikator (np. A).
	 * Jako kolejność sortowania przyjmuje jeden ze stringów:
	 * az, asc (rosnąco), za, des (malejąco).
	 * Jeśli w arkuszu znajdują się headery (frozen) pozostawia je nietknięte
	 * Jeśli kolumna poza zakresem, nic nie robi - zwraca obiekt arkusza
	 *
	 * PRZETESTOWANA (test zbudowany)
	 *
	 * @param {Object} sheetObj
	 * @param {Number|String} col 1, 2, itd. lub 'A', 'AB' itd.
	 * @param {String} dir Opcjonalny kierunek sortowania (domyślnie az)
	 * az, asc (rosnąco), za, des (malejąco).
	 * @returns {Object} Zwraca obiekt arkusza
	 */


	const sortColumn = (sheetObj, col, dir = 'az') => {
	  errorHandling(sheetObj, col, dir);
	  const colNum = typeof col === 'number' ? col : letterToColumn(col);

	  if (colNum > sheetObj.getMaxColumns()) {
	    console.log('Col number is grater than max columns');
	    return sheetObj;
	  }

	  return sheetObj.sort(colNum, dirs[dir]);
	};

	/* eslint-disable max-params */

	const typeGuard = (sheetObj, range, arr, opt) => {
	  if (!isSheet(sheetObj)) throw new TypeError('Only Sheet objecta are alowed in "paste"');
	  if (typeof range !== 'string' && typeof range !== 'number') throw new TypeError('Range should be string or number in "paste"');
	  if (!isArray2d(arr)) throw new TypeError('Only 2D arrays are alowed to "paste"');

	  if (opt.restrictCleanup) {
	    if (!['down', 'right', 'preserve'].includes(opt.restrictCleanup)) throw new TypeError('Wrong keyword passed as "restrictCleanup" to "paste"');
	  }
	};

	const getRange = (status, sheetObj, userRange, restHor, restVer) => {
	  /* Usuwa tylko dane w doł od komórki startowej
	  w kolumach w których znajdują się wklejane dane.
	  Przydatna do wklejania danych ciągnących się w dół
	  w arkuszach w których znajują się inne dane po prawej */
	  if (status === 'down') {
	    return getRangeRelative(sheetObj, userRange, restHor);
	  }
	  /* Usuwa tylko dane znajdujące się prawej stronie
	  komórki startowej i tylko w wierszach zajmowanych przez nowe
	  dane. Przydatne do wklejania "szerokich, ale nie wysokich"
	  danych ciągnących się w poziomie (rzadko stosowane) */


	  if (status === 'right') {
	    return getRangeRelative(sheetObj, userRange, null, restVer);
	  }
	  /* Domyślna wartość - od górnej lewej komórki do końca
	  w prawo i w dół  */


	  return getRangeRelative(sheetObj, userRange);
	};
	/**
	 * Paste Options
	 * @typedef {Object} PasteOptions
	 * @property {boolean} [notRemoveFilers] Usuwanie filtrów przed wklejeniem.
	 * Domyślnie false
	 * @property {number|string} [sort] Sortowanie kolumn przed wklejeniem.
	 * Przyjmuje numer (1) lub string ('A'). Domyślnie brak sortowania
	 * @property {string} [sortOrder] Kolejność sortowania.
	 * Możliwe: 'az', 'za', 'asc', 'des'. Domyślie brak
	 * @property {string} restrictCleanup Usuwanie istniejących
	 * przed wklejeniem treści:
	 * 'null' - usuwa wszystko na prawo i w doł od lewej komórki
	 * 'down' - usuwa wszystko w dół. Po prawej tylko na szerokość danych
	 * 'right' - usuwa wszystko po prawej. W dół tylko do wysokości danych
	 * 'preserve' - nic nie usuwa. Domyślnie 'null'
	 * @property {boolean} notRemoveEmptys Usuwanie pustych kolumn i wierszy
	 * z arkusza (po wklejeniu). Domyślnie 'false'
	 */

	/**
	 * Obiekt z dodatkowymi opcjami dla funkcji "paste"
	 * @type {PasteOptions} defaults
	 */


	const defaults = {
	  notRemoveFilers: false,
	  sort: null,
	  sortOrder: null,
	  restrictCleanup: null,
	  notRemoveEmptys: false
	};
	/**
	 * Wkleja przekazaną tablicę danych w określone miejsce przekazanego
	 * arkusza.
	 * Przyjmując 4 możliwe zapisy zakresu (określające lewy górny róg
	 * gdzie mają być wklejone dane):
	 * 1) Identyfikator kolumny np.'A' - zakres zaczyna się od ostatniego
	 * pustego wiersza kolumny A,
	 * 2) Numer wiersza - np. '1' (lub 1) - zakres zaczyna się od ostatniej
	 * pustej kolumny wiersza 1,
	 * 3) Pełny adres komórki - np. A1 - zakres zaczyna się w A1 bez względu
	 * na znajdujące się już w arkuszu dane).
	 * 4) Przekazanie całego zakresu (np. A1:B2) działa tak samo jak wyżej.
	 * Tylko pierwsza komórka brana jest pod uwagę (BUG - nie czyści wtedy
	 * istniejących danych)
	 *
	 * Domyślnie przed wklejeniem danych usuwa treści już istniejące
	 * poniżej oraz po prawej lewego górnego rogu obszaru do wklejenia
	 * nowych danych. Można to zachowanie zmienić w ustawieniach (obiekt opt)
	 *
	 * Domyśline przed wklejeniem usuwa istniejące filtry.
	 *
	 * Domyśline po wklejeniu usuwa puste kolumny (po prawej)
	 * i wiersze (poniżej)
	 *
	 * Funkcja przyjmuje opcjonalny obiekt z dalszymi ustawieniami
	 *
	 * @param {Object} sheetObj Obiekt arkusza
	 * @param {String|Number} userRange Np. 'A', 1, '1', 'A1', 'A1:B2'
	 * @param {Array[]} data Dane do wklejenia
	 * @param {Object} [opt=defaults] Dalsze parametry
	 * @returns {Object} Obiekt arkusza do dalszych manipulacji
	 */

	const paste = (sheetObj, userRange, data, opt = defaults) => {
	  // Sprawdzenie typów
	  typeGuard(sheetObj, userRange, data, opt); // Jeśli nie ma co wklejać zwraca nie tknięty arkusz

	  if (data.length === 0) return sheetObj;
	  /* ---- Właściwa funkcja ----------------------------- */
	  // Upraszczamy składnię

	  const dataWidth = data[0].length;
	  const dataHeight = data.length; // Pobierz zakres do pracy (obiekt)

	  const {
	    range,
	    rangeObj
	  } = getRange(opt.restrictCleanup, sheetObj, // Na wypadek przekazania pełnego zakresu
	  typeof userRange === 'string' && userRange.includes(':') ? getFirstCellFromString(userRange) : userRange, dataWidth, dataHeight); // Usuwamy filtry

	  if (!opt.notRemoveFilers) {
	    removeFilter(sheetObj);
	  } // Sortujemy


	  if (opt.sort) {
	    sortColumn(sheetObj, opt.sort, opt.sortOrder || 'az');
	  } // Usuwamy kontent


	  if (opt.restrictCleanup !== 'preserve') {
	    /* Sprawdzamy czy lewa komórka zakresu zawiera się w istniejącycm
	    arkuszu - dla komórki wychodzącej poza nie ma potrzeby
	    czyścić danych */
	    const {
	      col,
	      row
	    } = getColAndRowFromCellAsNum(range);

	    if (sheetObj.getMaxColumns() >= col && sheetObj.getMaxRows() >= row) {
	      rangeObj.clearContent();
	    }
	  } // Wklejka


	  sheetObj.getRange(Number(/[0-9]+/.exec(range)[0]), letterToColumn(/[A-Z]+/.exec(range)[0]), dataHeight, dataWidth).setValues(data); // Usuwa puste kolumny i wiersze

	  if (!opt.notRemoveEmptys) {
	    removeEmptyRowCol(sheetObj);
	  } // Zwrotka arkusza


	  return sheetObj;
	};

	/**
	 * Zwraca sheetObject arkusza o podanej nazwie.
	 * Jeśli drugi parametr nie jest podany - pobiera arkusz
	 * z bieżącego pliku (bound)
	 *
	 * @memberof Lib_Gas
	 *
	 * @param {string} sheetName Nazwa arkusza
	 * @param {string} [fileId] Id pliku
	 * @returns {Object} Obiekt arkusza
	 */
	const getSheet = (sheetName, fileId = null) => {
	  if (fileId) return SpreadsheetApp.openById(fileId).getSheetByName(sheetName);
	  return SpreadsheetApp.getActive().getSheetByName(sheetName);
	};

	/**
	 * Zwraca ID folderu lub pliku z przekazanego URL-a,
	 *
	 * @memberof Lib_Gas
	 *
	 * @param {string} url URL folderu lub pliku
	 * @returns {string} ID
	 */
	const getIdFromUrl = url => {
	  // folder
	  if (url.lastIndexOf('folders') > -1) {
	    return /folders\/(.+)/.exec(url)[1];
	  } // file
	  // return /d\/(.+)\//.exec(url)[1];


	  return /d\/([^/]+)/.exec(url)[1];
	};

	/**
	 * Shuffle random array of numbers. Based on "the right" algorithm:
	 * https://medium.com/@nitinpatel_20236/how-to-shuffle-correctly-shuffle-an-array-in-javascript-15ea3f84bfb
	 *
	 * @param {array} arr Array of elements
	 * @returns {array} Shuffled array
	 */
	const randomShuffleArray = arr => {
	  for (let i = arr.length - 1; i > 0; i--) {
	    const j = Math.floor(Math.random() * i);
	    const temp = arr[i];
	    arr[i] = arr[j];
	    arr[j] = temp;
	  }

	  return arr;
	};

	/**
	 * Returns (pseudo) random integer from min - max range (inclusive)
	 *
	 * @param {number} min Min value (inclusive)
	 * @param {number} max Max value (inclusive)
	 */
	const randomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

	/* eslint-disable max-params */
	/**
	 * Returns an array of random unique numbers from given range
	 *
	 * @param {number} quant Quantity of numbers
	 * @param {number} min Min value
	 * @param {number} max Max value
	 * @param {boolean} unique Whether values have to be unique. Def. 'false'
	 * @param {boolean} startEnd Whether to include min and max value. Def. 'false'
	 * @param {boolean} sort Whether to sort final values. Default 'false'
	 * @param {number[]} arr Tablica startowa indeksów (używna jeśli któreś
	 * indeksy mają być umieszczone w tablicy)
	 * @returns {number[]}
	 */

	const randomIntegersArray = (quant, min, max, unique = false, startEnd = false, sort = false, arr = []) => {
	  if (unique && quant > max - min + 1) {
	    throw new Error('To restrictive min and max for given quantity');
	  }

	  if (arr.length === quant) {
	    return sort ? arr.sort((a, b) => a - b) : randomShuffleArray(arr);
	  }

	  if (startEnd) {
	    arr.push(min, max);
	  }

	  const random = randomInteger(min, max);

	  if (unique) {
	    if (!arr.includes(random)) {
	      arr.push(random);
	    }
	  } else {
	    arr.push(random);
	  }

	  return randomIntegersArray(quant, min, max, unique, false, sort, arr);
	};

	/**
	 * Times Sheets
	 * @typedef {Object} TimesSheets
	 * @property {string} s1 Liczba wierszy do zmiany 1 (sortowana kolejność)
	 * @property {string} s5 Liczba wierszy do zmiany 5 (sortowana kolejność)
	 * @property {string} s10 Liczba wierszy do zmiany 10 (sortowana kolejność)
	 * @property {string} s25 Liczba wierszy do zmiany 25 (sortowana kolejność)
	 * @property {string} s50 Liczba wierszy do zmiany 50 (sortowana kolejność)
	 * @property {string} s100 Liczba wierszy do zmiany 100 (sortowana kolejność)
	 * @property {string} u1 Liczba wierszy do zmiany 1 (niesortowana kolejność)
	 * @property {string} u5 Liczba wierszy do zmiany 5 (niesortowana kolejność)
	 * @property {string} u10 Liczba wierszy do zmiany 10 (niesortowana kolejność)
	 * @property {string} u25 Liczba wierszy do zmiany 25 (niesortowana kolejność)
	 * @property {string} u50 Liczba wierszy do zmiany 50 (niesortowana kolejność)
	 * @property {string} u100 Liczba wierszy do zmiany 100 (niesortowana kolejność)

	 */

	/**
	 * @type {TimesSheets} SHEETS Arkusze do wklejania wyników eksperymentów
	 */
	const SHEETS = {
	  s1: 'T: 1 (s)',
	  s5: 'T: 5 (s)',
	  s10: 'T: 10 (s)',
	  s25: 'T: 25 (s)',
	  s50: 'T: 50 (s)',
	  s100: 'T: 100 (s)',
	  u1: 'T: 1 (u)',
	  u5: 'T: 5 (u)',
	  u10: 'T: 10 (u)',
	  u25: 'T: 25 (u)',
	  u50: 'T: 50 (u)',
	  u100: 'T: 100 (u)'
	};
	/**
	 * URLe zewnętrznych arkuszy do których wklejamy losowe dane
	 * @type {Object<string, string>} EXT_SHEET_URL
	 */

	const EXT_SHEET_URL = {
	  l100: 'https://docs.google.com/spreadsheets/d/1DAsts1B-JuYZUNoQ5oNthmty6LsljPbik5zBZUOjkxg',
	  l200: 'https://docs.google.com/spreadsheets/d/1YxrLrGK-qRM67D6RgBb03Ozvd7ZtNuahwLXlV18QMsw',
	  l500: 'https://docs.google.com/spreadsheets/d/1XZEMpV-BX0X_vRoXwDQE2Fx3Lfug1_cCbssFAN7D-nM',
	  l1000: 'https://docs.google.com/spreadsheets/d/1weGq34nlv0Tto-pjnIFLPG6yX_XX5XS91hFxcyUU3Ak',
	  l2000: 'https://docs.google.com/spreadsheets/d/14lGCP6Fp3UBnJpTl87-S14neBaE3r3ppZddxN1uSQj8',
	  l4000: 'https://docs.google.com/spreadsheets/d/1GXWLCEPXQOIGYhzrdxpuYk9VfNLyFMQFxgHoGYJYqTQ',
	  l8000: 'https://docs.google.com/spreadsheets/d/1yWJPLliF0CDPpS5QqEQJgkjvoUDy784g3UuAfd-vNIo',
	  l16000: 'https://docs.google.com/spreadsheets/d/1_bjTKNKUP_AvAkxmi92peD2t9cdMrsRatprzVvUlIXg'
	};
	/**
	 * Nazwa arkusza w zewnętrznym pliku, w którym znajdują się losowe dane
	 * @type {string} EXT_SHEET_NAME
	 */

	const EXT_SHEET_NAME = 'res';

	/**
	 * Helper
	 * Pobiera odpowiedni obiekt arkusza
	 * @param {string} sheetCode Zdefiniowany kod zadania np. l100
	 */

	const getExtSheet = sheetCode => getSheet(EXT_SHEET_NAME, getIdFromUrl(EXT_SHEET_URL[sheetCode]));
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
	      notRemoveEmptys: true
	    });
	    console.log(`Paste into: '${sheetCode}'. Rows nr: ${idx}. Total rows: '${quant}'.`);
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
	  unSort100: modifiyEntries(100, false)
	};

	/* eslint-disable max-params */

	/**
	 * Sprawsza czas wykonywania się przekazanej funkcji.
	 * Loguje czas. Zwraca efekt działania funkcji (czyli działa trochę
	 * jak tap). Przyjmuje obiekt logResult (Array) do którego po referencji
	 * dodaje nowy wpis z wynikiem - czasem działania funkcji oraz opisami
	 * (pozostałe argumenty)
	 *
	 * @param {Array} logResults Tablica do której doklejane są wyniki perf.
	 * @param {Function} callback Funkcja do wykonania
	 * @param {String} descA Krótki opis
	 * @param {String} descB Dłuższy opis
	 * @param {number|string} [descC=0] Opcjonalnie kod wiadomości 0-3.
	 * @returns {any} Rezultat działania funkcji przekaznej
	 */
	const performanceCheckerObj = (logResults, callback, descA, descB, descC = 0 // status (1-2-3)
	) => {
	  const startTime = new Date();
	  const res = callback();
	  const time = (new Date() - startTime) / 1000;
	  logResults.push([new Date(), descA, time, descB, descC]);
	  return res;
	};

	/* eslint-disable max-params */
	/* ***************** Helpers ******************* */

	/**
	 * @type {array[]} Docelowa tablica na dane z czasami wykonywania funkcji
	 */

	const loggerRes = [];
	/**
	 * Template rodzaju testu
	 * @param {string} jobType
	 * @returns {(callback: function, identifier: string, task: string) => any}
	 */

	const run = jobType => (callback, identifier, task) => () => performanceCheckerObj(loggerRes, callback, identifier, task, jobType);

	const runJbJ = run('Job By Job');
	const runTbT = run('Task By Task');
	/**
	 * Wkleja tablicę z czasami do wskazanego arkusza
	 * @param {string} sheet
	 */

	const printTimes = sheet => () => paste(getSheet(sheet), 'A', loggerRes, {
	  notRemoveFilers: true,
	  restrictCleanup: 'preserve'
	});
	/**
	 * Odpala wskazaną liczbę razy przekazaną funkcję (callback) wklejając
	 * wyniki (czasy wykonania) do wskazanego arkusza
	 *
	 * @param {number} quant Liczba wykonań testu
	 * @param {function} callback Funkcja do wykonania
	 * @param {function} testTypeCallback Funkcja z konkretnym rodzajem eksperymentu (jbj|tbt)
	 * @param {string} desc Opis co robi funkcja (np. 'Wklejenie danych (cache)') pojawi się w tabeli jako opis zadania
	 * @param {string} resSheet Nazwa arkusza do którego mają być wklejone wyniki (czasy)
	 * @returns {function} Zwraca funkcję gotową do odpalenia
	 */


	const fire = (quant, callback, testTypeCallback, desc, resSheet) => pipe(testTypeCallback(quant, callback, desc), printTimes(resSheet));

	/* eslint-disable max-params */
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
	  s1JbJ: fire(1, tasks.sort1, jbj, `${DESC}(1) s`, SHEETS.s1),
	  s1TbT: fire(1, tasks.sort1, tbt, `${DESC}(1) s`, SHEETS.s1),
	  // 2
	  s5JbJ: fire(1, tasks.sort5, jbj, `${DESC}(5) s`, SHEETS.s5),
	  s5TbT: fire(1, tasks.sort5, tbt, `${DESC}(5) s`, SHEETS.s5),
	  // 10
	  s10JbJ: fire(1, tasks.sort10, jbj, `${DESC}(10) s`, SHEETS.s10),
	  s10TbT: fire(1, tasks.sort10, tbt, `${DESC}(10) s`, SHEETS.s10),
	  // 25
	  s25JbJ: fire(1, tasks.sort25, jbj, `${DESC}(25) s`, SHEETS.s25),
	  s25TbT: fire(1, tasks.sort25, tbt, `${DESC}(25) s`, SHEETS.s25),
	  // 50
	  s50JbJ: fire(1, tasks.sort50, jbj, `${DESC}(50) s`, SHEETS.s50),
	  s50TbT: fire(1, tasks.sort50, tbt, `${DESC}(50) s`, SHEETS.s50),
	  // 100
	  s100JbJ: fire(1, tasks.sort100, jbj, `${DESC}(100) s`, SHEETS.s100),
	  s100TbT: fire(1, tasks.sort100, tbt, `${DESC}(100) s`, SHEETS.s100),

	  /* Nie posortowane */
	  // 1
	  u1JbJ: fire(1, tasks.unSort1, jbj, `${DESC}(1) u`, SHEETS.u1),
	  u1TbT: fire(1, tasks.unSort1, tbt, `${DESC}(1) u`, SHEETS.u1),
	  // 5
	  u5JbJ: fire(1, tasks.unSort5, jbj, `${DESC}(5) u`, SHEETS.u5),
	  u5TbT: fire(1, tasks.unSort5, tbt, `${DESC}(5) u`, SHEETS.u5),
	  // 10
	  u10JbJ: fire(1, tasks.unSort10, jbj, `${DESC}(10) u`, SHEETS.u10),
	  u10TbT: fire(1, tasks.unSort10, tbt, `${DESC}(10) u`, SHEETS.u10),
	  // 25
	  u25JbJ: fire(1, tasks.unSort25, jbj, `${DESC}(25) u`, SHEETS.u25),
	  u25TbT: fire(1, tasks.unSort25, tbt, `${DESC}(25) u`, SHEETS.u25),
	  // 50
	  u50JbJ: fire(1, tasks.unSort50, jbj, `${DESC}(50) u`, SHEETS.u50),
	  u50TbT: fire(1, tasks.unSort50, tbt, `${DESC}(50) u`, SHEETS.u50),
	  // 100
	  u100JbJ: fire(1, tasks.unSort100, jbj, `${DESC}(100) u`, SHEETS.u100),
	  u100TbT: fire(1, tasks.unSort100, tbt, `${DESC}(100) u`, SHEETS.u100)
	};

	const removeExtremes = () => {
	  const sheet = SpreadsheetApp.getActive().getActiveSheet();
	  const typeRange = 'V4:W4';
	  const dataRange = 'A3:E';
	  const avgRange = 'X5';
	  const maxMult = 5;
	  const [[structure, type]] = sheet.getRange(typeRange).getValues();
	  const [[average]] = sheet.getRange(avgRange).getValues();
	  const data = sheet.getRange(dataRange).getValues().map(([date, exisStructure, t, task, exisType]) => {
	    if (exisStructure === structure && exisType === type && t > average * maxMult) {
	      return ['-', '-', '-', '-', '-'];
	    }

	    return [new Date(date), exisStructure, t, task, exisType];
	  });
	  paste(sheet, 'A3', data, {
	    restrictCleanup: 'preserve'
	  });
	};

	/* eslint-disable max-lines-per-function */
	global.menu = {
	  test: () => console.log('hello'),
	  exps,
	  removeExtremes
	}; // Funkcje wystawione jako triggery odplana co 15 min

	global.s1TbT = () => {
	  exps.s1TbT();
	};

	global.s5TbT = () => {
	  exps.s5TbT();
	};

	global.s10TbT = () => {
	  exps.s10TbT();
	};

	global.s25TbT = () => {
	  exps.s25TbT();
	};

	global.s50TbT = () => {
	  exps.s50TbT();
	};

	global.s100TbT = () => {
	  exps.s100TbT();
	};

	global.u1TbT = () => {
	  exps.u1TbT();
	};

	global.u5TbT = () => {
	  exps.u5TbT();
	};

	global.u10TbT = () => {
	  exps.u10TbT();
	};

	global.u25TbT = () => {
	  exps.u25TbT();
	};

	global.u50TbT = () => {
	  exps.u50TbT();
	};

	global.u100TbT = () => {
	  exps.u100TbT();
	};

	const menu = () => {
	  const ui = SpreadsheetApp.getUi();
	  ui.createMenu('ICON').addSubMenu(ui.createMenu('Exp: Modyfikuj - 1').addItem('Sort - Job by Job', 'menu.exps.s1JbJ').addItem('Sort - Task by Task', 'menu.exps.s1TbT').addSeparator().addItem('Unsort - Job by Job', 'menu.exps.u1JbJ').addItem('Unsort - Task by Task', 'menu.exps.u1TbT')).addSubMenu(ui.createMenu('Exp: Modyfikuj - 5').addItem('Sort - Job by Job', 'menu.exps.s5JbJ').addItem('Sort - Task by Task', 'menu.exps.s5TbT').addSeparator().addItem('Unsort - Job by Job', 'menu.exps.u5JbJ').addItem('Unsort - Task by Task', 'menu.exps.u5TbT')).addSubMenu(ui.createMenu('Exp: Modyfikuj - 10').addItem('Sort - Job by Job', 'menu.exps.s10JbJ').addItem('Sort - Task by Task', 'menu.exps.s10TbT').addSeparator().addItem('Unsort - Job by Job', 'menu.exps.u10JbJ').addItem('Unsort - Task by Task', 'menu.exps.u10TbT')).addSubMenu(ui.createMenu('Exp: Modyfikuj - 25').addItem('Sort - Job by Job', 'menu.exps.s25JbJ').addItem('Sort - Task by Task', 'menu.exps.s25TbT').addSeparator().addItem('Unsort - Job by Job', 'menu.exps.u25JbJ').addItem('Unsort - Task by Task', 'menu.exps.u25TbT')).addSubMenu(ui.createMenu('Exp: Modyfikuj - 50').addItem('Sort - Job by Job', 'menu.exps.s50JbJ').addItem('Sort - Task by Task', 'menu.exps.s50TbT').addSeparator().addItem('Unsort - Job by Job', 'menu.exps.u50JbJ').addItem('Unsort - Task by Task', 'menu.exps.u50TbT')).addSubMenu(ui.createMenu('Exp: Modyfikuj - 100').addItem('Sort - Job by Job', 'menu.exps.s100JbJ').addItem('Sort - Task by Task', 'menu.exps.s100TbT').addSeparator().addItem('Unsort - Job by Job', 'menu.exps.u100JbJ').addItem('Unsort - Task by Task', 'menu.exps.u100TbT')).addSeparator().addItem('Remove extremes', 'menu.removeExtremes').addSeparator().addItem('Test', 'menu.test').addSeparator().addItem('Update menu', 'onOpen').addToUi();
	};

	// @ts-nocheck

	global.onOpen = () => {
	  menu();
	};

})));
