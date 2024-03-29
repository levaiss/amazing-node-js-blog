// Core
import { Document, Schema, model } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { ValidationError } from '../../../errors';

export interface ICategoryModel extends Document {
  name: string;

  ensureCategoriesExist(names: string[]): Promise<ICategoryModel[]>;
  toJSONForPost(): object;
}

const CategorySchema = new Schema<ICategoryModel>(
  {
    name: {
      type: Schema.Types.String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

CategorySchema.methods.toJSON = function () {
  return {
    id: this._id,
    name: this.name,
  };
};

CategorySchema.methods.toJSONForPost = function () {
  return this.name;
};

CategorySchema.methods.ensureCategoriesExist = async (ids: string[]): Promise<ICategoryModel[]> => {
  const categories = await Promise.all(ids.map((id) => model('Category').findById(id)));

  if (categories.includes(null)) {
    throw new ValidationError('One or more categories do not exist');
  }

  return categories;
};

CategorySchema.plugin(mongooseUniqueValidator, { message: 'must be unique' });

export default model<ICategoryModel>('Category', CategorySchema);
