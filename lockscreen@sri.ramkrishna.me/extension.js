/* -*- mode: js2; js2-basic-offset: 4; indent-tabs-mode: nil -*- */

/*
 * Simple extension to lock the screen from an icon on the panel.
 */

const Gio = imports.gi.Gio;
const Lang = imports.lang;
const Shell = imports.gi.Shell;
const St = imports.gi.St;

const ScreenSaver = imports.misc.screenSaver;
const Main = imports.ui.main;

function init() {

	button = new St.Bin({ style_class: 'panel-button', 
								reactive: true,
								can_focus: true,
								x_fill: true,
								y_fill: false,
								track_hover: true });
	let icon = new St.Icon ({ icon_name: 'changes-prevent',
								icon_type: St.IconType.SYMBOLIC,
								style_class: 'system-status-icon'});
	button.set_child(icon);
	button.connect('button-press-event', _LockScreenActivate);
}

function _LockScreenActivate () {
	Main.overview.hide();
	screenSaverProxy = new ScreenSaver.ScreenSaverProxy();
	screenSaverProxy.LockRemote();
}


function enable () {
	Main.panel._rightBox.insert_child_at_index(button,0);
}

function disable () {
	Main.panel._rightBox.remove_actor(button);
}
