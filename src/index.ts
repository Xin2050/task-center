/*
all start with here
First run a loop to start server and client
//todo it's should be a automatic program base task and data size

for now we start from test data just a small group

*/

///init server group
import {TaskClient} from "./Client/Client";
import {ClientActionType, IServerConfig, ISingleRunner} from "./interfaces/";
import {SingleRun} from "./SingleRun";
import {DetailTaskActionType} from "./task/TaskData";


export const ServerConfig: IServerConfig = {
    mainServer:{ip:"10.1.0.17",port:4000},
    servers: [{
        ip: "10.1.0.7",
        port: 3000
    }],
}

///init data

// //get MySelf a Server
const singleRunner:ISingleRunner = SingleRun.getInstance();

const {serverDefinition,instance} = singleRunner;


instance.start();

const start = {
    type:ClientActionType.CheckServerStatus,
    payload: {
        action:DetailTaskActionType.Nothing,
        data:{}
    },
    sendBack:true
}


const c1 = new TaskClient(3000,"10.1.0.7");
c1.start()
setTimeout(()=>{
    c1.send(start)
},800);
const c2 = new TaskClient(3000,"10.1.0.7");
c2.start()
setTimeout(()=>{
    c2.send(start)
},800);



process.on("exit",(code)=> {
    console.log("Process exit on code:",code);
})

//
// const server = new TaskServer(3000);
// server.start();
// const c1 = new TaskClient(3000,"10.1.0.7");
// c1.start()
// setInterval(()=>{
//     c1.send({data:{name:'c1',dt:new Date()}})
// },800);
// const c2 = new TaskClient(3000,"10.1.0.7");
// c2.start()
// setInterval(()=>{
//     c2.send({data:{name:'c2',dt:new Date()}})
// },700);
// const c3 = new TaskClient(3000,"10.1.0.7");
// c3.start()
// setInterval(()=>{
//     c3.send({data:{name:'c3',dt:new Date()}})
// },600);
//
//
//
// const server1 = new TaskServer(4000);
// server1.start();
//
// const cc1 = new TaskClient(4000,"10.1.0.7");
// cc1.start()
// setInterval(()=>{
//     cc1.send({data:{name:'cc1',dt:new Date()}})
// },500);
// const cc2 = new TaskClient(4000,"10.1.0.7");
// cc2.start()
// setInterval(()=>{
//     cc2.send({data:{name:'cc2',dt:new Date()}})
// },400);
// const cc3 = new TaskClient(4000,"10.1.0.7");
// cc3.start()
// setInterval(()=>{
//     cc3.send({data:{name:'cc3',dt:new Date()}})
// },300);






