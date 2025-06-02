import mongoose, { Document, Schema, Model,  Types  } from 'mongoose';

export interface IMessage extends Document {
    conversationId: Types.ObjectId;  // <-- usar Types.ObjectId
    sender: Types.ObjectId;          // <-- usar Types.ObjectId
    text: string;
    timestamp: Date;
}
const messageSchema = new Schema<IMessage>({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Message: Model<IMessage> = mongoose.model<IMessage>('Message', messageSchema, 'messages');

export default Message;