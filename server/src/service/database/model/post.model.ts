// Core
import { Document, Schema, model, type PaginateModel } from 'mongoose';
import paginate from 'mongoose-paginate-v2';

// Models
import { IUserModel } from './user.model';
import { ICommentModel } from './comment.model';
import { ICategoryModel } from './category.model';

export interface IPostModel extends Document {
  title: string;
  body: string;
  preview: string;
  author: IUserModel;
  comments: ICommentModel[];
  categories: ICategoryModel[];

  isAuthor(user: IUserModel): boolean;
  toJSON(): object;
  toJSONFull(): object;
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
    categories: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Category',
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
    author: this.author.toJSONShort(),
    categories: this.categories.map((category: ICategoryModel) => category.toJSONForPost()),
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
    author: this.author.toJSONShort(),
    comments: this.comments.map((comment: ICommentModel) => comment.toJSONForPost()),
    categories: this.categories.map((category: ICategoryModel) => category.toJSONForPost()),
  };
};

export default model<IPostModel, PaginateModel<IPostModel>>('Post', PostSchema);
