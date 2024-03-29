// Core
import { NextFunction, Request, Response } from 'express';

// Models
import PostModel from '../service/database/model/post.model';
import CommentModel from '../service/database/model/comment.model';
import { IUserModel } from '../service/database/model/user.model';

// Helpers
import { RequestStatusCodes } from '../const/request-status-codes';
import { ForbiddenError, NotFoundError } from '../errors';
import { isAdmin } from '../config/roles.config';

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

    res.status(RequestStatusCodes.Created).json({ message: 'Comment created' });
  } catch (e) {
    next(e);
  }
}

export async function getAllComments(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const paginatedComments = await CommentModel.paginate(
      {},
      {
        populate: ['author'],
        page,
        limit,
        customLabels: {
          docs: 'comments',
        },
      },
    );

    res.status(RequestStatusCodes.Success).json(paginatedComments);
  } catch (e) {
    next(e);
  }
}

export async function updateComment(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      params: { id },
      body: { text },
    } = req;

    const comment = await CommentModel.findById(id);
    if (!comment) {
      return next(new NotFoundError(`Comment not found`));
    }

    const user = req.user as IUserModel;
    if (!(isAdmin(user.role) || comment.isAuthor(user))) {
      return next(new ForbiddenError());
    }

    comment.text = text;
    await comment.save();

    res.status(RequestStatusCodes.Success).json({ message: 'Comment updated' });
  } catch (e) {
    next(e);
  }
}

export async function deleteComment(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const comment = await CommentModel.findById(id);
    if (!comment) {
      return next(new NotFoundError('Comment not found'));
    }

    const user = req.user as IUserModel;
    if (!(isAdmin(user.role) || comment.isAuthor(user))) {
      return next(new ForbiddenError());
    }

    await CommentModel.deleteOne({ _id: id });

    res.status(RequestStatusCodes.Success).json({ message: 'Comment deleted' });
  } catch (e) {
    next(e);
  }
}
