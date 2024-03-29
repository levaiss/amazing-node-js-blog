// Core
import { NextFunction, Request, Response } from 'express';

// Models
import PostModel from '../service/database/model/post.model';
import { IUserModel } from '../service/database/model/user.model';

// Helpers
import { RequestStatusCodes } from '../const/request-status-codes';
import { ForbiddenError, NotFoundError } from '../errors';
import { isAdmin } from '../config/roles.config';

export async function createPost(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user as IUserModel;

    const post = new PostModel({
      ...req.body,
      author: user._id,
    });
    await post.save();

    res.status(RequestStatusCodes.Created).json({ post: post.toJSON() });
  } catch (e) {
    next(e);
  }
}

export async function getPosts(req: Request, res: Response, next: NextFunction) {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 5;

    const paginatedPosts = await PostModel.paginate(
      {},
      {
        populate: ['author'],
        page,
        limit,
        customLabels: {
          docs: 'posts',
        },
      },
    );

    res.status(RequestStatusCodes.Success).json(paginatedPosts);
  } catch (e) {
    next(e);
  }
}

export async function getPost(req: Request, res: Response, next: NextFunction) {
  try {
    const { id } = req.params;

    const post = await PostModel.findById(id).populate([
      'author',
      {
        path: 'comments',
        populate: {
          path: 'author',
          model: 'User',
        },
      },
    ]);
    if (!post) {
      return next(new NotFoundError(`Post not found`));
    }

    res.status(RequestStatusCodes.Created).json({ post: post.toJSONFull() });
  } catch (e) {
    next(e);
  }
}

export async function updatePost(req: Request, res: Response, next: NextFunction) {
  try {
    const {
      params: { id },
      body,
    } = req;

    const post = await PostModel.findById(id);
    if (!post) {
      return next(new NotFoundError('Post not found'));
    }

    const user = req.user as IUserModel;
    if (!(isAdmin(user.role) || post.isAuthor(user))) {
      return next(new ForbiddenError());
    }

    post.set(body);
    await post.save();

    res.status(RequestStatusCodes.Success).json({
      post,
    });
  } catch (e) {
    next(e);
  }
}

export async function deletePost(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;

  const post = await PostModel.findById(id);
  if (!post) {
    return next(new NotFoundError('Post not found'));
  }

  const user = req.user as IUserModel;
  if (!(isAdmin(user.role) || post.isAuthor(user))) {
    return next(new ForbiddenError());
  }

  await PostModel.deleteOne({ _id: id });

  res.status(RequestStatusCodes.Success).json({ post: post.toJSON() });
}
