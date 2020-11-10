import {IRunAble, ServerState} from "./index";
import colors from 'colors';


abstract class ARunAble implements IRunAble{
    protected serverState:ServerState;

    abstract stop():void;

    abstract start(): void;
    abstract startCallBack: () => void;
    abstract stopCallBack: () => void;
    abstract connectedCallBack: () => void;
    abstract connect():ServerState;

    getStatus():ServerState{
        return this.serverState;
    }
    setStatus(code:ServerState):void{
        this.serverState = code;
    }

    setConnectedCallBack(callback: () => void): void {
        this.connectedCallBack = callback;
    }
    setStartCallBack(callback: () => void): void {
        this.startCallBack = callback;
    }

    setStopCallBack(callback: () => void): void {
        this.stopCallBack = callback;
    }

}
export default ARunAble;