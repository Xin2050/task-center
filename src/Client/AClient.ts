import ARunAble from "../interfaces/ARunAble";
import {Socket} from "net";
import colors from "colors";
import {ServerState} from "../interfaces/";
import net from 'net';


abstract class AClient extends ARunAble{
    client: Socket;

    constructor(public port: number,
                public serverAddress: string) {
       super();
    };

    abstract dataCallBack:  (data: any) => void;

    startCallBack: () => void = () => {
        console.log("you don't need me!");
    };
    stop(): void {
        this.client.destroy()
    }
    stopCallBack: () => void = () => {

        console.log(colors.bgMagenta(`🚗 Client is disconnected from Server ${this.getServerName()} 🔚`));
    };
    connectedCallBack: () => void = () => {

        console.log(colors.bgMagenta(`🚗 Client ${this.getClientName()} is connect to the Server: ${this.getServerName()} ✅`));
    };
    getServerName():string{
        return `${this.serverAddress}:${this.port}:`
    }
    getClientName():string{
        return `${this.client.localAddress}:${this.client.localPort}`
    }
    setSendDataCallBack(callback:(data:any)=>void):void{
        this.dataCallBack = callback;
    }
    start():void{
        if(this.dataCallBack && this.stopCallBack && this.connectedCallBack){
            this.serverState = this.connect();
        }else{
            throw Error("You have to set all the call back functions!")
        }

    }

    connect():ServerState{
        try{
            this.client = net.createConnection({port: this.port, host: this.serverAddress},
                this.connectedCallBack);
            this.client.on('data', this.dataCallBack);
            this.client.on('close', this.stopCallBack)
                .on("error",(error:any)=>{
                console.log(colors.bgMagenta(`🚀 Client ${this.client.localAddress}:${this.client.localPort} has Error :${error}`));
                this.client.destroy();
                return(ServerState.Error);
            });
            return (ServerState.Available);
        }catch (error){
            return(ServerState.Error);
        }
    }
}




export default AClient;
