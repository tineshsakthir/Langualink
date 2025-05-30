import { Socket } from "socket.io";
import { RoomManager } from "./RoomManager";

export interface User {
    socket: Socket;
    name: string;
    language : string;
    uuid: string;
}

export class UserManager {

    private roomManager: RoomManager;
    private laguageUsers: {[key: string]: User[]};  // {tamil: [], english: []}
    private languageQueue: {[key: string]: string[]}; // {tamil: [], english: []}


    constructor() {

        this.roomManager = new RoomManager();
        this.laguageUsers = {};
        this.languageQueue = {};
    }

    addUser(name: string, socket: Socket, language: string,uuid: string  ) {
         console.log(name, socket.toString(),language,uuid);
         if(language !== undefined && name !== undefined && uuid !== undefined){

        language = language.trim().toLocaleLowerCase();
        if (!this.laguageUsers[language]) {
            this.laguageUsers[language] = [];
        }
        if (!this.languageQueue[language]) {
            this.languageQueue[language] = [];
        }

        this.laguageUsers[language].push({name, socket, language,uuid});
        console.log('**********',this.laguageUsers[language][this.laguageUsers[language].length-1]);
        this.languageQueue[language].push(socket.id);

        // if (language === "Tamil") {
        //     this.Tamilusers.push({name, socket, language});
        //     this.Tamilqueue.push(socket.id);
        // } else if (language === "English") {
        //     this.Englishusers.push({name, socket, language});
        //     this.Englishqueue.push(socket.id);
        // }
        
        socket.emit("lobby");
        this.clearQueue(language)
        this.initHandlers(socket);
    }
    }

    removeUser(socketId: string) {

        //I need to check in all the languages
        for (const language in this.laguageUsers) {
            const users = this.laguageUsers[language];
            const queue = this.languageQueue[language];
            const user = users.find(x => x.socket.id === socketId);
            if (user) {
                this.laguageUsers[language] = this.laguageUsers[language].filter(x => x.socket.id !== socketId);
                this.languageQueue[language] = this.languageQueue[language].filter(x => x !== socketId);
                return;
            }
        }

        // const user = this.Tamilusers.find(x => x.socket.id === socketId);
        
        // this.Tamilusers = this.Tamilusers.filter(x => x.socket.id !== socketId);
        // this.Tamilqueue = this.Tamilqueue.filter(x => x === socketId);
    }

    clearQueue(language: string) {

        const users = this.laguageUsers[language];
        const queue = this.languageQueue[language];
        if (queue.length < 2) {
            return;
        }

        const id1 = queue.pop();
        const id2 = queue.pop();
        const user1 = users.find(x => x.socket.id === id1);
        const user2 = users.find(x => x.socket.id === id2);

        if (!user1 || !user2) {
            return;
        }

        console.log("creating roonm");
        const room = this.roomManager.createRoom(user1, user2);
        this.clearQueue(language);

        // console.log("inside clear queues")
        // console.log(this.Tamilqueue.length);
        // if (this.Tamilqueue.length < 2) {
        //     return;
        // }

        // const id1 = this.Tamilqueue.pop();
        // const id2 = this.Tamilqueue.pop();
        // console.log("id is " + id1 + " " + id2);
        // const user1 = this.Tamilusers.find(x => x.socket.id === id1);
        // const user2 = this.Tamilusers.find(x => x.socket.id === id2);

        // if (!user1 || !user2) {
        //     return;
        // }
        // console.log("creating roonm");

        // const room = this.roomManager.createRoom(user1, user2);
        // this.clearQueue(language);
    }






    initHandlers(socket: Socket) {
        socket.on("offer", ({sdp, roomId ,uuid}: {sdp: string, roomId: string ,uuid:string}) => {
            this.roomManager.onOffer(roomId, sdp, socket.id ,uuid);
        })

        socket.on("answer",({sdp, roomId ,uuid}: {sdp: string, roomId: string ,uuid:string}) => {
            this.roomManager.onAnswer(roomId, sdp, socket.id);
        })

        socket.on("add-ice-candidate", ({candidate, roomId, type}) => {
            this.roomManager.onIceCandidates(roomId, socket.id, candidate, type);
        });
    }

}