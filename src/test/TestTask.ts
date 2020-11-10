import faker from 'faker';
import {DetailTaskActionType, IAction, IDataFormat} from "../task/TaskData";
import {ITaskResult} from "../interfaces/tasks";


class TestTask {

    static getActionData:(action:DetailTaskActionType)=>any = (action)=>{
        switch (action){
            case DetailTaskActionType.Login:
                return {username:"abc",password:"123",checked:true};
            case DetailTaskActionType.MainTask:
                return {getNextData:true};
            default:
                return {}
        }
    }
    static getTaskActionArray: () => IAction[] = () => {
        return [{
            id: 1,
            name: DetailTaskActionType.Login,
            isNeedRequireData: true,
            isNeedUpdateResult:false

        }, {
            id: 2,
            name: DetailTaskActionType.MainTask,
            isNeedRequireData: true,
            isNeedUpdateResult:true //if you want update result, then you must provide a id of your data
        }]

    }

    static login: (data: any) => Promise<any> = (data) => {
        //console.log("LoginData",data);
        const {username,password,checked}  = data;
        //you can use those data to do your methods,
        //for now, I just put a fake code in there to make test works
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    action: "Login",
                    Login: "ok",
                    JWT: faker.random.uuid(),
                });
            }, 1000)
        })
    }

    //as a last call or a create result action , must extend from ITaskResult item :

    static mainTask: (data: IDataFormat) => Promise<ITaskResult> = (data) => {
        //console.log("mainTask getData=>",data);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    id: data.id, // ID is update result must-have item
                    action: DetailTaskActionType.MainTask,
                    rs: true,
                    ts: new Date().valueOf(),
                    data:{
                        orderID:faker.random.number()
                    }
                });
            }, 1000)
        })
    }


}

export default TestTask;