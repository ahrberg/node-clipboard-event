import { EventEmitter } from "events";
import * as path from "path";
import { execFile, ChildProcess } from "child_process";

class ClipboardEventListener extends EventEmitter {
  child: null | ChildProcess;

  constructor() {
    super();
    this.child = null;
  }

  startListening() {
    const { platform } = process;
    if (platform === "win32") {
      this.child = execFile(
        path.join(__dirname, "platform/clipboard-event-handler-win32.exe")
      );
    } else if (platform === "linux") {
      this.child = execFile(
        path.join(__dirname, "platform/clipboard-event-handler-linux")
      );
    } else if (platform === "darwin") {
      this.child = execFile(
        path.join(__dirname, "platform/clipboard-event-handler-mac")
      );
    } else {
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

export default new ClipboardEventListener();

// Sample usage
/*
import clipboardListener from 'clipboard-event';

// To start listening
clipboardListener.startListening();

clipboardListener.on('change', () => {
  console.log('Clipboard changed');
});

// To stop listening
clipboardListener.stopListening();
*/
