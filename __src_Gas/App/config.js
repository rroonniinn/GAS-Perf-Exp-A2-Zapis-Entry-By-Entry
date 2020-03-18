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

/**
 * URLe zewnętrznych arkuszy do których wklejamy losowe dane
 * @type {Object<string, string>} EXT_SHEET_URL
 */
const EXT_SHEET_URL = {
	l100:
		'https://docs.google.com/spreadsheets/d/1DAsts1B-JuYZUNoQ5oNthmty6LsljPbik5zBZUOjkxg',
	l200:
		'https://docs.google.com/spreadsheets/d/1YxrLrGK-qRM67D6RgBb03Ozvd7ZtNuahwLXlV18QMsw',
	l500:
		'https://docs.google.com/spreadsheets/d/1XZEMpV-BX0X_vRoXwDQE2Fx3Lfug1_cCbssFAN7D-nM',
	l1000:
		'https://docs.google.com/spreadsheets/d/1weGq34nlv0Tto-pjnIFLPG6yX_XX5XS91hFxcyUU3Ak',
	l2000:
		'https://docs.google.com/spreadsheets/d/14lGCP6Fp3UBnJpTl87-S14neBaE3r3ppZddxN1uSQj8',
	l4000:
		'https://docs.google.com/spreadsheets/d/1GXWLCEPXQOIGYhzrdxpuYk9VfNLyFMQFxgHoGYJYqTQ',
	l8000:
		'https://docs.google.com/spreadsheets/d/1yWJPLliF0CDPpS5QqEQJgkjvoUDy784g3UuAfd-vNIo',
	l16000:
		'https://docs.google.com/spreadsheets/d/1_bjTKNKUP_AvAkxmi92peD2t9cdMrsRatprzVvUlIXg',
};
/**
 * Nazwa arkusza w zewnętrznym pliku, w którym znajdują się losowe dane
 * @type {string} EXT_SHEET_NAME
 */
const EXT_SHEET_NAME = 'res';

/**
 * @type {array[]} Zmodyfikowany wiersz do wklejenia
 */
const MOD_ROW = [
	[
		'xyz',
		'xyz',
		'xyz',
		'xyz',
		'xyz',
		'xyz',
		'xyz',
		'xyz',
		'xyz',
		'xyz',
		'xyz',
		'xyz',
		'xyz',
		'xyz',
		'xyz',
	],
];

export { SHEETS, EXT_SHEET_URL, EXT_SHEET_NAME, MOD_ROW };
