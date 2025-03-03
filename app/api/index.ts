import { ENDPOINTS } from './endpoints';
import commentsService from './services/comments.service';
import postsService from './services/posts.service';
import usersService from './services/users.service';

export default {
  posts: postsService,
  users: usersService,
  comments: commentsService,
};

export { ENDPOINTS };