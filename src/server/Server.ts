import AServer from "./AServer";
import colors from "colors";
import {Socket} from "net";
import {ClientActionType, IMessage, IPayload, ServerActionType} from "../interfaces/";
import {DetailTaskActionType, LinkedActionList} from "../task/TaskData";
import TestTask from "../test/TestTask";
import {TaskDataManager} from "../task/TaskDataManager";
import {ITaskDataManager, TaskStatus} from "../interfaces/tasks";

const NOTHING: IMessage = {
    type: ClientActionType.NOTHING,
    payload: {
        action: DetailTaskActionType.Nothing,
        data: {}
    },
    sendBack: false
}

export class TaskServer extends AServer {
    detailTaskAction: LinkedActionList;
    taskDataManager: ITaskDataManager;
    currentClient: string;

    constructor(public port: number) {
        super(port);
        this.detailTaskAction = LinkedActionList.getInstance();
        this.taskDataManager = TaskDataManager.getInstance();
    }

    //Server side only response client's data, until client send data to server,
    // server won't able to talk to client.

    dataCallBack = (socket: Socket) => (data: any) => {
        this.currentClient = `${socket.remoteAddress}:${socket.remotePort}`;

        console.log(colors.cyan(`Received data from Client:${socket.remoteAddress}:${socket.remotePort}:${data}`));
        data = JSON.parse(data);
        const rsdata: IMessage = this.responseAction(data)
        if (rsdata.sendBack) {
            socket.write(JSON.stringify(rsdata));
        }
    }

    responseAction(message: IMessage): IMessage {
        const {type, payload, sendBack} = message;
        switch (type) {
            case ClientActionType.CheckServerStatus:
                return this.getResponseServerStatusCheckAction();
            case ClientActionType.RequireAction:

                return this.getNextAction(payload);

            case ClientActionType.ReturnResult:
                //Check is a next Action and is need updateResult
                //if has then tell client can ask next action

                const currentAction = this.detailTaskAction.getAction(payload.action);


                if (currentAction.isNeedUpdateResult) {

                    this.taskDataManager.setResult(payload.data.id,
                        {...payload.data,exeBy:this.currentClient}
                    )
                    //
                    if(payload.data.rs){
                        this.taskDataManager.updateStatus(payload.data.id,TaskStatus.Done);
                    }
                }
                if (this.detailTaskAction.isLast(currentAction.name)) {
                    //last action after your should tell client all done,
                    // then client can back to the beginning from responseServerStatusCheck
                    return this.getResponseServerStatusCheckAction();
                } else {
                    return this.getNextAction(payload)

                }
            default:
                return NOTHING
        }

    }

    getResponseServerStatusCheckAction(): IMessage {
        return {
            type: ServerActionType.ResponseStatusCheck,
            payload: {
                action: DetailTaskActionType.Nothing,
                data: this.getStatus()
            },
            sendBack: true
        }
    }

    getNextAction(payload: IPayload): IMessage {
        if(!this.taskDataManager.getNextData()){
            console.log("All Done");
            // this.taskDataManager.getDataMap().forEach(v=>{
            //     console.log(v);
            // })
            return NOTHING;
        }

        const nextAction = this.detailTaskAction.getNextAction(payload.action);

        let data: any = {};
        if (nextAction.isNeedRequireData) {
            data = TestTask.getActionData(nextAction.name);
            //console.log("Data",data);
            if (data?.getNextData) {
                data = this.taskDataManager.getNextData();
                if(data){
                    this.taskDataManager.updateStatus(data.id,TaskStatus.Processing);
                }else {
                    return NOTHING
                }
                //console.log(this.taskDataManager.getData(data.id));
            }
        }

        return {
            type: ServerActionType.ExecuteAction,
            payload: {
                action: nextAction.name,
                data: data
            },
            sendBack: true
        }
    }

}

