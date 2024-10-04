import { v4 as uuid } from 'uuid';

/* eslint-disable @typescript-eslint/no-unsafe-function-type */
export const fileNamer = (
  req: Request | any,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];

  return callback(null, `${uuid()}.${fileExtension}`);
};
