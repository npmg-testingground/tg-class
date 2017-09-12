import Handlers from './handlers';

import {
	ClassModelRequired
} from './db/model';


const routes = [
  {
    method: 'GET',
    path: '/classes',
    handler: Handlers.getClasses
  },
  {
    method: 'GET',
    path: '/classes/{classId}',
    handler: Handlers.getClass
  },
  {
    method: 'POST',
    path: '/classes',
    handler: Handlers.createClass,
    config: {
      validate: {
        payload: ClassModelRequired
      }
    }
  },
  {
    method: 'PUT',
    path: '/classes/{classId}',
    handler: Handlers.putClass,
    config: {
      validate: {
        payload: ClassModelRequired
      }
    }
  },
  {
    method: 'DELETE',
    path: '/classes/{classId}',
    handler: Handlers.deleteClass
  }
]

export default routes;
