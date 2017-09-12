import Boom from 'boom';
import env from './env.config';
import r from './db/config';
import {
  ReplyPromiseResponse
} from './decorators';

import union from 'lodash.union';

class Handlers {
  @ReplyPromiseResponse
  static getClasses(request) {
    return r.table(env.DB_TABLE_NAME);
  }

  @ReplyPromiseResponse
  static getClass(request) {
    const { classId } = request.params;
    return r.table(env.DB_TABLE_NAME).get(classId);
  }

  @ReplyPromiseResponse
  static async createClass(request) {
    const { payload } = request;
    return r.table(env.DB_TABLE_NAME).insert(
      r.expr(payload).merge({
        createdAt: r.now()
      }),
      // This tells rethinkdb that changes should be return
      {returnChanges: true}
    )
  }

  @ReplyPromiseResponse
  static async putClass(request) {
    const { classId } = request.params;
    const { payload } = request;
    payload.id = classId;
    return r.table(env.DB_TABLE_NAME)
      .get(classId)
      .replace(payload, {returnChanges: true})
  }

  @ReplyPromiseResponse
  static async deleteClass(request) {
    const { classId } = request.params;
    return r.table(env.DB_TABLE_NAME)
      .get(classId)
      .delete({returnChanges: true})
  }
}

export default Handlers;
