import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IConversation extends Document {
    participants: string[]; // Array of User IDs
    createdAt: Date;
    updatedAt: Date;
}

const conversationSchema = new Schema<IConversation>({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }]},
    { timestamps: true });

const Conversation: Model<IConversation> = mongoose.model<IConversation>( 'Conversation', conversationSchema, 'conversations');

export default Conversation;