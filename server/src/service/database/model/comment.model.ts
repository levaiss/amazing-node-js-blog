// Core
import { Document, Schema, model, type PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

// Models
import { IUserModel } from './user.model';

// Helpers
import { IPostModel } from './post.model';

export interface ICommentModel extends Document {
  text: string;
  author: IUserModel;
  post: IPostModel;

  isAuthor(user: IUserModel): boolean;
  toJSON(): object;
  toJSONForPost(): object;
  toJSONForProfile(): object;
}

const CommentSchema = new Schema<ICommentModel>(
  {
    text: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
    },
  },
  {
    timestamps: true,
  },
);

CommentSchema.plugin(paginate);

CommentSchema.methods.isAuthor = function (user: IUserModel): boolean {
  return this.author.toString() === user._id.toString();
};

CommentSchema.methods.toJSON = function () {
  return {
    id: this._id,
    text: this.text,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    author: this.author.toJSONShort(),
    post: this.post,
  };
};

CommentSchema.methods.toJSONForPost = function () {
  return {
    id: this._id,
    text: this.text,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    author: this.author.toJSONShort(),
  };
};

CommentSchema.methods.toJSONForProfile = function () {
  return {
    id: this._id,
    text: this.text,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    post: this.post,
  };
};

export default model<ICommentModel, PaginateModel<ICommentModel>>('Comment', CommentSchema);
