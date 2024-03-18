// Core
import { NextFunction, Request, Response } from 'express';

// Models
import PostModel from '../service/database/model/post.model';
import CommentModel from '../service/database/model/comment.model';
import { IUserModel } from '../service/database/model/user.model';

// Helpers
import { RequestStatusCodes } from '../const/request-status-codes';
import { NotFoundError } from '../errors';

export async function createComment(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as IUserModel;

    const post = await PostModel.findById(req.body.post);
    if (!post) {
      return next(new NotFoundError(`Post not found`));
    }

    const comment = new CommentModel({
      ...req.body,
      author: user._id,
    });
    await comment.save();

    post.comments.push(comment._id);
    await post.save();

    res.status(RequestStatusCodes.Created).json({ comment: comment.toJSON() });
  } catch (e) {
    next(e);
  }
}

export async function getComments(req: Request, res: Response) {
  const comments = await CommentModel.find();

  res.json({ comments: comments.map((comment) => comment.toJSON()) });
}
