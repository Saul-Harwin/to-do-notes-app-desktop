const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev'); // This w9ill be used to find out if we are in dev mode.
// const { electron } = require('process')

const fs = require('fs');

function createWindow() {
	// Create the browser window.
	const win = new BrowserWindow({
		width: 1080,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	// if we are in developer mode then we want to use "localhost" and
	// if not we want to load from out build folder.
	win.loadURL(
		isDev
			? 'http://localhost:3000'
			: `file://${path.join(__dirname, '../build/index.html')}`
	);

	// Open the DevTools.
	win.webContents.openDevTools();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// Find the operating systems default app storage.

ipcMain.on('SEND_DIR_LIST', (event, arg) => {
	const storage = require('electron-json-storage');
	const dirTree = require('directory-tree');

	var dirPath = storage.getDataPath();
	var tree = dirTree(dirPath, { extensions: /\.txt/ });

	// tree = tree.children;
	event.returnValue = tree;
});

ipcMain.on('SEND_CODE_TO_ELECTRON', (event, arg) => {
	var value = arg[0];
	var path = arg[1];
	console.log('value:', value);
	console.log('path', path);

	fs.writeFileSync(path, value);
});

ipcMain.on('OPEN_NOTE', (event, path) => {
	var note = fs.readFileSync(path, 'utf-8', (err, data) => {
		if (err) throw err;
		return data;
	});
	console.log(note);
	event.returnValue = note;
});
