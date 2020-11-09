
import AServer from "./AServer";
import colors from "colors";
import {Socket} from "net";




export class TaskServer extends AServer {

    constructor(public port: number) {
        super(port);
    }
    //Server side only response client's data, until client send data to server,
    // server won't able to talk to client.

    dataCallBack = (socket: Socket)=> (data: any) =>{
        console.log(colors.cyan(`Received data from Client:${socket.remoteAddress}:${socket.remotePort}:${data}`));
        socket.write("Message read!");
    }

}

