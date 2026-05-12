const { app, BrowserWindow, ipcMain } = require("electron");

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 700,
    minWidth: 700,
    minHeight: 500,
    backgroundColor: "#fff0f5",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });

  mainWindow.loadFile("index.html");
}

app.whenReady().then(createMainWindow);

// Navigation
ipcMain.on("go-home", () => mainWindow && mainWindow.loadFile("index.html"));
ipcMain.on("go-dashboard", () => mainWindow && mainWindow.loadFile("dashboard.html"));
ipcMain.on("go-account", () => mainWindow && mainWindow.loadFile("account.html"));

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});