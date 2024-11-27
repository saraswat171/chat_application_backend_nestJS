export class ChatNotFound extends Error {
    constructor() {
      super('No chat exist with these credentials');
    }
  }