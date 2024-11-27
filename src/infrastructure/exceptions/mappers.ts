import { BadRequestException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import {
  ProblemDocument,
  ProblemDocumentExtension,
} from 'http-problem-details';
import { ErrorMapper } from 'http-problem-details-mapper';
import { ChatNotFound } from 'src/domain/chat/exception/exception';
import { UserEmailAlreadyExistsConflict } from 'src/domain/user/exception/exception';
import {
  DtoValidation,
  FormValidation,
} from 'src/infrastructure/exceptions/exceptions';

class BadRequestMapper {
  static mapError(
    error: Error,
    extension?: ProblemDocumentExtension,
  ): ProblemDocument {
    return new ProblemDocument(
      {
        title: 'Bad Request',
        detail: error.message,
        status: HttpStatus.BAD_REQUEST,
      },
      extension,
    );
  }
}

class ConflictMapper {
  static mapError(error: Error): ProblemDocument {
    return new ProblemDocument({
      title: 'Conflict',
      detail: error.message,
      status: HttpStatus.CONFLICT,
    });
  }
}

export class InvalidCredentialsMapper extends ErrorMapper {
  constructor() {
    super(UnauthorizedException);
  }

  mapError(error: Error): ProblemDocument {
    return BadRequestMapper.mapError(error);
  }
}
export class UserEmailAlreadyExistsConflictMapper extends ErrorMapper {
  constructor() {
    super(UserEmailAlreadyExistsConflict);
  }

  mapError(error: Error): ProblemDocument {
    return ConflictMapper.mapError(error);
  }
}

export class ChatNotFoundMapper extends ErrorMapper {
  constructor() {
    super(ChatNotFound);
  }

  mapError(error: Error): ProblemDocument {
    return ConflictMapper.mapError(error);
  }
}

// export class ScholarshipApplicationRequestNotFoundMapper extends ErrorMapper {
//   constructor() {
//     super(ScholarshipApplicationRequestNotFound);
//   }

//   mapError(error: Error): ProblemDocument {
//     return new ProblemDocument({
//       title: 'Not Found',
//       detail: error.message,
//       status: HttpStatus.NOT_FOUND,
//     });
//   }
// }

export class DtoValidationExceptionMapper extends ErrorMapper {
  constructor() {
    super(DtoValidation);
  }

  mapError(error: Error): ProblemDocument {
    const response =
      error instanceof DtoValidation ? error.getResponse() : null;
    const extension = new ProblemDocumentExtension({
      invalid_params:
        response && typeof response === 'object'
          ? (response as any)?.message
          : null,
    });
    return BadRequestMapper.mapError(error, extension);
  }
}

export class ValidationPipeExceptionMapper extends ErrorMapper {
  constructor() {
    super(BadRequestException);
  }
  mapError(error: Error): ProblemDocument {
    return BadRequestMapper.mapError(error);
  }
}

export class FormValidationExceptionMapper extends ErrorMapper {
  constructor() {
    super(FormValidation);
  }

  mapError(error: Error): ProblemDocument {
    const response =
      error instanceof DtoValidation ? error.getResponse() : null;
    const extension = new ProblemDocumentExtension({
      invalid_params:
        response && typeof response === 'object'
          ? (response as any)?.message
          : null,
    });
    return new ProblemDocument(
      {
        title: 'Bad Request',
        detail: error.message,
        status: HttpStatus.BAD_REQUEST,
      },
      extension,
    );
  }
}
