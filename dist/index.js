"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("events");
const path = require("path");
const child_process_1 = require("child_process");
class ClipboardEventListener extends events_1.EventEmitter {
    constructor() {
        super();
        this.child = null;
    }
    startListening() {
        const { platform } = process;
        if (platform === "win32") {
            this.child = child_process_1.execFile(path.join(__dirname, "platform/clipboard-event-handler-win32.exe"));
        }
        else if (platform === "linux") {
            this.child = child_process_1.execFile(path.join(__dirname, "platform/clipboard-event-handler-linux"));
        }
        else if (platform === "darwin") {
            this.child = child_process_1.execFile(path.join(__dirname, "platform/clipboard-event-handler-mac"));
        }
        else {
            throw "Not yet supported";
        }
        this.child.stdout.on("data", (data) => {
            if (data.trim() === "CLIPBOARD_CHANGE") {
                this.emit("change");
            }
        });
    }
    stopListening() {
        const res = this.child.kill();
        return res;
    }
}
exports.default = new ClipboardEventListener();
