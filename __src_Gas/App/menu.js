/* eslint-disable max-lines-per-function */
// @ts-nocheck

import { ditributeToOtherFiles } from './ditributeToOtherFiles';
import {
	exps,
	randomExternal,
	randomLocal,
	randomHub,
} from './experiments';
import { copySheetsToLocalTest, deleteOldDate } from './tasks';
import { startTimeTrigger, cancelTimeTriggers } from './triggers';

// Funkcja do trigerów co minutę
global.randomExternal = () => {
	randomExternal();
};
global.randomLocal = () => {
	randomLocal();
};
global.randomHub = () => {
	randomHub();
};

global.menu = {
	test: () => console.log('hello'),
	exps,
	ditributeToOtherFiles,
	copySheetsToLocalTest,
	deleteOldDate,
	triggers: {
		ext: () => startTimeTrigger('randomExternal'),
		loc: () => startTimeTrigger('randomLocal'),
		hub: () => startTimeTrigger('randomHub'),
		stop: cancelTimeTriggers,
	},
};

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
		.addItem(
			'Uruchom Trigger dla Random External',
			'menu.triggers.ext'
		)
		.addItem('Uruchom Trigger dla Random Local', 'menu.triggers.loc')
		.addItem('Uruchom Trigger dla Random Hub', 'menu.triggers.hub')
		.addSeparator()
		.addItem('Zatrzymaj triggery', 'menu.triggers.stop')
		.addSeparator()
		.addItem('Test', 'menu.test')
		.addSeparator()
		.addItem('Update menu', 'onOpen')
		.addToUi();
};

export { menu };
