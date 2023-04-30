import {Schema, model, Document, Types} from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IRoomsUser extends Partial<Document> {
    user_id: string,
    name: string,
    online: boolean, 
    socket_id: string,
}

export interface IRooms extends Partial<Document> {
    admin: Types.ObjectId,
    contents: Types.ObjectId,
    users: IRoomsUser[],
    name: string,
    password: string,
    image: string,
    createdAt: Date,
    correctPassword: (candidatePassword: string, userPassword: string) => Promise<boolean>,
};

const roomsSchema = new Schema<IRooms>({
    admin: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    contents: {
        type: Schema.Types.ObjectId,
        ref: 'Contents'
    },
    users: [
        {
            user_id: String,
            name: String,
            online: Boolean,
            socket_id: String
        }
    ],
    image: {
        type: String
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: new Date
    },
});

//check if confirm code matches the encrypted code.
roomsSchema.methods.correctPassword = async function(candidatePassword: string, userPassword: string): Promise<boolean>{
    return await bcrypt.compare(candidatePassword, userPassword)
};

export default model<IRooms>('Rooms', roomsSchema);