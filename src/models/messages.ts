import {Schema, model, Document, Types} from 'mongoose';

export interface IMessages extends Partial<Document> {
    room: Types.ObjectId,
    user_id: Types.ObjectId,
    name: string,
    message: string,
    createdAt: Date
};

const messagesSchema = new Schema<IMessages>({
    room: {
        type: Schema.Types.ObjectId,
        ref: 'Rooms'
    },
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'Users'
    },
    name: {
        type: String
    },
    message: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date
    },
});

export default model<IMessages>('Messages', messagesSchema);