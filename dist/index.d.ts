/// <reference types="node" />
import { EventEmitter } from "events";
import { ChildProcess } from "child_process";
declare class ClipboardEventListener extends EventEmitter {
    child: null | ChildProcess;
    constructor();
    startListening(): void;
    stopListening(): boolean;
}
declare const _default: ClipboardEventListener;
export default _default;
