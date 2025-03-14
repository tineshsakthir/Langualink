 import { User } from "./UserManger";

let GLOBAL_ROOM_ID = 1;

interface Room {
    user1: User,
    user2: User,
}

export class RoomManager {
    private rooms: Map<string, Room>
    constructor() {
        this.rooms = new Map<string, Room>()
    }

    createRoom(user1: User, user2: User) {
        const roomId = this.generate().toString();
        this.rooms.set(roomId.toString(), {
            user1, 
            user2,
        })

        user1.socket.emit("send-offer", {
            roomId,
            partnerUuid: user2.uuid
        })

        user2.socket.emit("send-offer", {
            roomId,
            partnerUuid: user1.uuid
        })
    }

    // onOffer(roomId: string, sdp: string, senderSocketid: string, uuid: string) {
    //     const room = this.rooms.get(roomId);
    //     if (!room) {
    //         return;
    //     }
    //     const receivingUser = room.user1.socket.id === senderSocketid ? room.user2: room.user1;
    //     receivingUser?.socket.emit("offer", {
    //         sdp,
    //         roomId,
    //         uuid
    //     })
    // }

    onOffer(roomId: string, sdp: string, senderSocketid: string, uuid: string) {
        const room = this.rooms.get(roomId);
        if (!room) {
            return;
        }
        const receivingUser = room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
        receivingUser.socket.emit("offer", {
            sdp,
            roomId,
            uuid // Ensure UUID is sent
        });
    }
    
    
    // onAnswer(roomId: string, sdp: string, senderSocketid: string) {
    //     const room = this.rooms.get(roomId);
    //     if (!room) {
    //         return;
    //     }
    //     const receivingUser = room.user1.socket.id === senderSocketid ? room.user2: room.user1;

    //     receivingUser?.socket.emit("answer", {
    //         sdp,
    //         roomId
    //     });
    // }

    onAnswer(roomId: string, sdp: string, senderSocketid: string) {
        const room = this.rooms.get(roomId);
        if (!room) {
            return;
        }
        const receivingUser = room.user1.socket.id === senderSocketid ? room.user2 : room.user1;
    
        receivingUser.socket.emit("answer", {
            sdp,
            roomId,
            uuid: room.user1.socket.id === senderSocketid ? room.user1.uuid : room.user2.uuid // Send UUID
        });
    }
    

    onIceCandidates(roomId: string, senderSocketid: string, candidate: any, type: "sender" | "receiver") {
        const room = this.rooms.get(roomId);
        if (!room) {
            return;
        }
        const receivingUser = room.user1.socket.id === senderSocketid ? room.user2: room.user1;
        receivingUser.socket.emit("add-ice-candidate", ({candidate, type}));
    }

    generate() {
        return GLOBAL_ROOM_ID++;
    }

}