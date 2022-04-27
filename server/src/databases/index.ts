import { DB_DATABASE, DB_HOST } from '@config';

export const dbConnection = {
  url: `${DB_HOST}/${DB_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
