import { MapperRegistry } from 'http-problem-details-mapper';
import {
  ChatNotFoundMapper,
  DtoValidationExceptionMapper,
  FormValidationExceptionMapper,
  InvalidCredentialsMapper,
  UserEmailAlreadyExistsConflictMapper,
  // ProgramDoesNotExistMapper,
  // ScholarshipApplicationRequestNotFoundMapper,
  ValidationPipeExceptionMapper,
} from './mappers';

export class MapperRegistryFactory {
  static create(): MapperRegistry {
    return new MapperRegistry({ useDefaultErrorMapper: false })
      // .registerMapper(new ProgramDoesNotExistMapper())
      // .registerMapper(new ScholarshipApplicationRequestNotFoundMapper())
      .registerMapper(new DtoValidationExceptionMapper())
      .registerMapper(new FormValidationExceptionMapper())
      .registerMapper(new ValidationPipeExceptionMapper())
      .registerMapper(new InvalidCredentialsMapper())
      .registerMapper(new UserEmailAlreadyExistsConflictMapper())
      .registerMapper(new ChatNotFoundMapper())
  }
}
