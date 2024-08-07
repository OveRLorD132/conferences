import {expect, test} from "@jest/globals";
import JWT from "./JWT";

test("Testing Token Generation", () => {
  const token = JWT.generateToken('1', 'secret')
  const generated = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTYwNjE1NTQ0NjEsImV4cCI6MTcxNjA2MTU1NDQ2MSwic3ViIjoiMSJ9.xDxmtFRHWjG2-7-tbsXo67FQbOeuzfHifhmzfzJ-xr8"

  expect(typeof token).toBe('string');

  expect(() => JWT.decodeToken(token, 'secret')).not.toThrow();
  expect(() => JWT.decodeToken(generated, 'secret')).not.toThrow();

  expect(() => JWT.decodeToken(token, 'wrong secret')).toThrow();
  expect(() => JWT.decodeToken(generated, 'wrong secret')).toThrow();

  expect(() => JWT.decodeToken('wrong token', 'secret')).toThrow();
  expect(() => JWT.decodeToken('wrong token', ' wrong secret')).toThrow();

  expect(() => JWT.decodeToken(token + '123', ' wrong secret')).toThrow();

  expect(() => JWT.decodeToken(token.split('.')[0], ' wrong secret')).toThrow();
  expect(() => JWT.decodeToken(token.split('.')[1], ' secret')).toThrow();
  expect(() => JWT.decodeToken(token.split('.')[2], ' wrong secret')).toThrow();
  expect(() => JWT.decodeToken(token.split('.').join(','), ' secret')).toThrow();

  expect(() => JWT.decodeToken(generated.split('.')[0], 'secret')).toThrow()

  const letters = generated.split('');
  letters.pop();
  const editedToken = letters.join('');
  console.log(editedToken);
  expect(() => JWT.decodeToken(editedToken, 'secret')).toThrow();

})