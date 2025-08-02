import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    Property: {
      type: Schema.Types.ObjectId,
      ref: 'Property',
      required: true,
    },
    name: {
      type: String,
      required: [required, 'Name is required'],
    },
    email: {
      type: String,
      required: [required, 'Email is required'],
    },
    phone: {
      type: String,
    },
    body: {
      type: String,
    },
    read: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = models.Message || model(MessageSchema);

export default Message;
