import { User } from 'src/types/user.type'

export type SocketUser = {
    userId: String;
    socketId: String;
    profile: User;
}

export type OngoingCall = {
    partcipants: Partcipants;
    isRinging: boolean;
}

export type Partcipants = {
    caller: SocketUser;
    receiver: SocketUser;
}