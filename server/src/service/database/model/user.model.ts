// Core
import bcrypt from 'bcrypt';
import { Document, Schema, model } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';

// Helpers
import { Roles, ROLES_NAME } from '../../../config/roles.config';

export interface IUserModel extends Document {
  username: string;
  email: string;
  avatar: string;
  password: string;
  role: Roles;

  isSameUser(user: IUserModel): boolean;
  createHashedPassword(password: string): string;
  validPassword(password: string): boolean;

  toJSON(): object;
  toJSONShort(): object;
}

const UserSchema = new Schema<IUserModel>(
  {
    username: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
    avatar: {
      type: Schema.Types.String,
    },
    password: {
      type: Schema.Types.String,
      required: true,
    },
    role: {
      type: Schema.Types.Number,
      default: Roles.USER,
    },
  },
  {
    timestamps: true,
  },
);

UserSchema.methods.isSameUser = function (user: IUserModel): boolean {
  return this._id.toString() === user._id.toString();
};

UserSchema.methods.toJSON = function () {
  return {
    id: this._id,
    username: this.username,
    email: this.email,
    avatar: this.avatar,
    role: ROLES_NAME[this.role as Roles],
  };
};

UserSchema.methods.toJSONShort = function () {
  return {
    id: this._id,
    username: this.username,
    avatar: this.avatar,
  };
};

UserSchema.methods.createHashedPassword = function (password: string): string {
  const salt = bcrypt.genSaltSync(6);
  return bcrypt.hashSync(password, salt);
};

UserSchema.methods.validPassword = function (password: string): boolean {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.plugin(mongooseUniqueValidator, { message: 'must be unique' });

UserSchema.pre('save', async function (next) {
  this.password = this.createHashedPassword(this.password);

  next();
});

export default model<IUserModel>('User', UserSchema);
