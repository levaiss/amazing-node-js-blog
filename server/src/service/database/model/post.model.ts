// Core
import { Document, Schema, model, type PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

// Models
import { IUserModel } from './user.model';
import { ICommentModel } from './comment.model';

// Helpers
import { truncateWithEllipses } from '../../../utils/truncate';

export interface IPostModel extends Document {
  title: string;
  body: string;
  preview: string;
  author: IUserModel;
  comments: ICommentModel[];

  isAuthor(user: IUserModel): boolean;
  toJSON(): object;
  toJSONFull(): object;
  toJSONShort(): object;
}

const PostSchema = new Schema<IPostModel>(
  {
    title: {
      type: String,
      required: true,
    },
    preview: {
      type: String,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  },
);

PostSchema.plugin(paginate);

PostSchema.methods.isAuthor = function (user: IUserModel): boolean {
  return this.author.toString() === user._id.toString();
};

PostSchema.methods.toJSON = function () {
  return {
    id: this._id,
    title: this.title,
    preview: this.preview,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    author: this.author.toJSON(),
  };
};

PostSchema.methods.toJSONFull = function () {
  return {
    id: this._id,
    title: this.title,
    preview: this.preview,
    body: this.body,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
    author: this.author.toJSON(),
    comments: this.comments.map((comment: ICommentModel) => comment.toJSONForPost()),
  };
};

PostSchema.methods.toJSONShort = function () {
  return {
    id: this._id,
    title: this.title,
    body: truncateWithEllipses(this.body),
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

export default model<IPostModel, PaginateModel<IPostModel>>('Post', PostSchema);
