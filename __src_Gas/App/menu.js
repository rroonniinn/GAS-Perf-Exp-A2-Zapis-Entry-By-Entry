/* eslint-disable max-lines-per-function */
// @ts-nocheck

import { exps, runRandomSingle } from './experiments';
import { removeExtremes } from './removeExtremes';
import { ditributeToOtherFiles } from './ditributeToOtherFiles';

global.menu = {
	test: () => console.log('hello'),
	exps,
	removeExtremes,
	ditributeToOtherFiles,
};

// Funkcja do trigerów co minutę
// global.runRandomSingle = () => {
// 	runRandomSingle();
// };

// Funkcje wystawione jako triggery odplana co 15 min
// global.s1TbT = () => {
// 	exps.s1TbT();
// };
// global.s5TbT = () => {
// 	exps.s5TbT();
// };
// global.s10TbT = () => {
// 	exps.s10TbT();
// };
// global.s25TbT = () => {
// 	exps.s25TbT();
// };
// global.s50TbT = () => {
// 	exps.s50TbT();
// };
// global.s100TbT = () => {
// 	exps.s100TbT();
// };
// global.u1TbT = () => {
// 	exps.u1TbT();
// };
// global.u5TbT = () => {
// 	exps.u5TbT();
// };
// global.u10TbT = () => {
// 	exps.u10TbT();
// };
// global.u25TbT = () => {
// 	exps.u25TbT();
// };
// global.u50TbT = () => {
// 	exps.u50TbT();
// };
// global.u100TbT = () => {
// 	exps.u100TbT();
// };

const menu = () => {
	const ui = SpreadsheetApp.getUi();
	ui.createMenu('ICON')
		.addSubMenu(
			ui
				.createMenu('Exp: Modyfikuj - 1')
				.addItem('Sort - Job by Job', 'menu.exps.s1JbJ')
				.addItem('Sort - Task by Task', 'menu.exps.s1TbT')
				.addSeparator()
				.addItem('Unsort - Job by Job', 'menu.exps.u1JbJ')
				.addItem('Unsort - Task by Task', 'menu.exps.u1TbT')
		)
		.addSubMenu(
			ui
				.createMenu('Exp: Modyfikuj - 5')
				.addItem('Sort - Job by Job', 'menu.exps.s5JbJ')
				.addItem('Sort - Task by Task', 'menu.exps.s5TbT')
				.addSeparator()
				.addItem('Unsort - Job by Job', 'menu.exps.u5JbJ')
				.addItem('Unsort - Task by Task', 'menu.exps.u5TbT')
		)
		.addSubMenu(
			ui
				.createMenu('Exp: Modyfikuj - 10')
				.addItem('Sort - Job by Job', 'menu.exps.s10JbJ')
				.addItem('Sort - Task by Task', 'menu.exps.s10TbT')
				.addSeparator()
				.addItem('Unsort - Job by Job', 'menu.exps.u10JbJ')
				.addItem('Unsort - Task by Task', 'menu.exps.u10TbT')
		)
		.addSubMenu(
			ui
				.createMenu('Exp: Modyfikuj - 25')
				.addItem('Sort - Job by Job', 'menu.exps.s25JbJ')
				.addItem('Sort - Task by Task', 'menu.exps.s25TbT')
				.addSeparator()
				.addItem('Unsort - Job by Job', 'menu.exps.u25JbJ')
				.addItem('Unsort - Task by Task', 'menu.exps.u25TbT')
		)
		.addSubMenu(
			ui
				.createMenu('Exp: Modyfikuj - 50')
				.addItem('Sort - Job by Job', 'menu.exps.s50JbJ')
				.addItem('Sort - Task by Task', 'menu.exps.s50TbT')
				.addSeparator()
				.addItem('Unsort - Job by Job', 'menu.exps.u50JbJ')
				.addItem('Unsort - Task by Task', 'menu.exps.u50TbT')
		)
		.addSubMenu(
			ui
				.createMenu('Exp: Modyfikuj - 100')
				.addItem('Sort - Job by Job', 'menu.exps.s100JbJ')
				.addItem('Sort - Task by Task', 'menu.exps.s100TbT')
				.addSeparator()
				.addItem('Unsort - Job by Job', 'menu.exps.u100JbJ')
				.addItem('Unsort - Task by Task', 'menu.exps.u100TbT')
		)
		.addSeparator()
		.addItem('Remove extremes', 'menu.removeExtremes')
		.addSeparator()
		.addItem('Distribute', 'menu.ditributeToOtherFiles')
		.addItem('Test', 'menu.test')
		.addItem('runRandomSingle', 'runRandomSingle')
		.addSeparator()
		.addItem('Update menu', 'onOpen')
		.addToUi();
};

export { menu };
