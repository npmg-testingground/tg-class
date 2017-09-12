/**
 * This file contains decorators,
 * needed in the response handlers
 */
import Boom from 'boom';

export function handleResponse(target, name, descriptor) {
  console.log(target, name, descriptor)
}

export function ReplyPromiseResponse(target, name, descriptor) {
  let fn = descriptor.value.bind(target);
  descriptor.value = (request, reply) => {
    fn(request, reply).then(result => {
      reply(result);
    }).catch(error => {
      reply(Boom.badImplementation(error));
    })
  }
  return descriptor;
}