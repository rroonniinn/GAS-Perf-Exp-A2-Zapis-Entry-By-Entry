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
	u100: 'T: 100 (u)',
};

/* *********************** HUB ******************* */
const HUB_URL =
	'https://docs.google.com/spreadsheets/d/12VLf8P3pZSB_VGjY3rNGRZQBufvk86cVB0HkDru_kt4';

/* *********************** EXTERNALS ******************* */

/**
 * URLe zewnętrznych arkuszy do których wklejamy losowe dane
 * @type {Object<string, string>} EXT_SHEET_URL
 */
const EXT_SHEET_URL = {
	l100:
		'https://docs.google.com/spreadsheets/d/1aS7Mcqj-dNAWSBSy1mOZknT-OhLFKEURnVSMD5Xrc18',
	l200:
		'https://docs.google.com/spreadsheets/d/1mrIyNFShU3s_CCrP1qAiG9rFuFE4Er7_Y4R-5gMStug',
	l500:
		'https://docs.google.com/spreadsheets/d/1TIiUqF-Ps8eRHMsjfTlXrgQ-97Wpx3otybJH-oRt5tY',
	l1000:
		'https://docs.google.com/spreadsheets/d/1rcbKqV5N3la92jRFSBrEhYmrYd3MfYuToZaEymIpmis',
	l2000:
		'https://docs.google.com/spreadsheets/d/1l6BdVxjzXNnU5dFqsyd71wpI1y8zNLnWNJk_xMmQlKk',
	l4000:
		'https://docs.google.com/spreadsheets/d/17IIg50HcP4qsIjDg5A-o7CLzZ6hai3VqFaKbAMLf-kY',
	l8000:
		'https://docs.google.com/spreadsheets/d/1KQdqbM_9f56aTk6oh2GwpUzgJ0atXBO9c4OQL04Dl78',
	l16000:
		'https://docs.google.com/spreadsheets/d/18ujFjrnd1gmm_avfosL6QwadwxeGWMwBStaUT0ClHOQ',
};

/**
 * Nazwa arkusza w zewnętrznym pliku, w którym znajdują się losowe dane
 * @type {string} EXT_SHEET_NAME
 */
const EXT_SHEET_NAME = 'res';

/**
 * Opis zadania wykorzysytwany w singlu
 * @type {Object<string, string>}
 */

const SHORT_DSC = {
	l100: 'Arr 1: 100',
	l200: 'Arr 2: 200',
	l500: 'Arr 3: 500',
	l1000: 'Arr 4: 1000',
	l2000: 'Arr 5: 2000',
	l4000: 'Arr 6: 4000',
	l8000: 'Arr 7: 8000',
	l16000: 'Arr 8: 16000',
};

/**
 * Dłuższy opis wykorzystywany w singlu
 * @type {Object<string, string>}
 */

const LONG_DESC = {
	sort1: 'Modyfikacja entry by entry (1) s',
	sort5: 'Modyfikacja entry by entry (5) s',
	sort10: 'Modyfikacja entry by entry (10) s',
	sort25: 'Modyfikacja entry by entry (25) s',
	sort50: 'Modyfikacja entry by entry (50) s',
	sort100: 'Modyfikacja entry by entry (100) s',

	ext1: 'EbE 1: 1 row - Ext',
	ext5: 'EbE 2: 5 rows - Ext',
	ext10: 'EbE 3: 10 rows - Ext',
	ext25: 'EbE 4: 25 rows - Ext',
	ext50: 'EbE 5: 50 rows - Ext',
	ext100: 'EbE 6: 100 rows - Ext',

	loc1: 'EbE 1: 1 row - Loc',
	loc5: 'EbE 2: 5 rows - Loc',
	loc10: 'EbE 3: 10 rows - Loc',
	loc25: 'EbE 4: 25 rows - Loc',
	loc50: 'EbE 5: 50 rows - Loc',
	loc100: 'EbE 6: 100 rows - Loc',

	hub1: 'EbE 1: 1 row - Hub',
	hub5: 'EbE 2: 5 rows - Hub',
	hub10: 'EbE 3: 10 rows - Hub',
	hub25: 'EbE 4: 25 rows - Hub',
	hub50: 'EbE 5: 50 rows - Hub',
	hub100: 'EbE 6: 100 rows - Hub',
};

/**
 * Gdzie wkleić wyniki ekspetymentów
//  * @type {Object<string, string>}
 */

const WHERE_TO_PRINT = {
	sort1: SHEETS.s1,
	sort5: SHEETS.s5,
	sort10: SHEETS.s10,
	sort25: SHEETS.s25,
	sort50: SHEETS.s50,
	sort100: SHEETS.s100,
	ext1: 'T: 1',
	ext5: 'T: 5',
	ext10: 'T: 10',
	ext25: 'T: 25',
	ext50: 'T: 50',
	ext100: 'T: 100',
	geo: {
		loc:
			'https://docs.google.com/spreadsheets/d/1VYO0IWb24aaf4RRz3Bo01dsF1wuKk75Vvmhb-AWsKoI/edit#gid=1387586056',
		hub:
			'https://docs.google.com/spreadsheets/d/1go0ZdOM6qC0AQrYdTtCqLKeC8p1hHod9sAX3qgzon5M/edit#gid=1387586056',
		ext:
			'https://docs.google.com/spreadsheets/d/1vlw4rsft39S7KdatpkuIRzx1eoLZEMLJmeSnoS6fN44/edit#gid=717913167',
	},
	entries: {
		e1: 'T: 1',
		e5: 'T: 5',
		e10: 'T: 10',
		e25: 'T: 25',
		e50: 'T: 50',
		e100: 'T: 100',
	},
};

export {
	SHEETS,
	EXT_SHEET_URL,
	EXT_SHEET_NAME,
	SHORT_DSC,
	LONG_DESC,
	WHERE_TO_PRINT,
	HUB_URL,
};
