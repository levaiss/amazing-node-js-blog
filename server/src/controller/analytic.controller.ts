// Core
import { NextFunction, Request, Response } from 'express';

// Models
import UserModel from '../service/database/model/user.model';
import PostModel from '../service/database/model/post.model';
import CommentModel from '../service/database/model/comment.model';

// Helpers
import { RequestStatusCodes } from '../const/request-status-codes';

export async function getSummaryStatistic(req: Request, res: Response, next: NextFunction) {
  try {
    const [postCount, commentCount, activeUserCount] = await Promise.all([
      UserModel.countDocuments(),
      PostModel.countDocuments(),
      CommentModel.countDocuments(),
    ]);

    res.status(RequestStatusCodes.Success).json({
      postCount,
      commentCount,
      activeUserCount,
    });
  } catch (e) {
    next(e);
  }
}
