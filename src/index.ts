/*
all start with here
First run a loop to start server and client
//todo it's should be a automatic program base task and data size

for now we start from test data just a small group

*/

///init server group
import {IClient, TaskClient} from "./Client/Client";
import {TaskServer} from './server/Server'
import {ClientState, IServerConfig, ISingleRunner, ServerType} from "./interfaces/";
import os from "os";
import {SingleRun} from "./SingleRun";


export const ServerConfig: IServerConfig = {
    mainServer:{ip:"10.1.0.7",port:4000},
    servers: [{
        ip: "10.1.0.7",
        port: 3000
    }],
}

///init data

//get MySelf a Server
const singleRunner:ISingleRunner = SingleRun.getInstance();

const {serverDefinition,instance} = singleRunner;



//init start server and clients




/*
const server = new TaskServer(3000)
server.start();

const dataCallback = (data:any)=>{
    console.log(data);
}


let clients:TaskClient[]=new Array(5);
for(let i=0;i<5;i++){
    const someDummyData = {
        data:"sys",
        id :i,
        name:"xin li times" + i,
        add:"2050 ssxie cre" + Math.random()
    }
    clients[i] = new TaskClient(3000,"10.1.0.7",dataCallback);
    clients[i].connect().then((resolve:ClientState)=>{
        console.log(resolve);
        clients[i].send(someDummyData);
    }).catch((error) => {
        console.log(error);
    })
}
*/




