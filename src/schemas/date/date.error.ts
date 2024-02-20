export const DateErrors = {
    DATE_NOT_FOUND: 'Cita no encontrado.',
    DATES_NOT_FOUND: 'Citas no encontrados.',
    DATE_CREATE_ERROR: 'Error al crear la cita.',
    DATE_UPDATE_ERROR: 'Error al actualizar la cita.',
    DATE_DELETE_ERROR: 'Error al eliminar la cita.',
  } as const;
  
  export type DateErrorsMessage =
    (typeof DateErrors)[keyof typeof DateErrors];
  
  export const DateErrorCodes = {
    DATE_NOT_FOUND: 'DATE_NOT_FOUND',
    DATES_NOT_FOUND: 'DATES_NOT_FOUND',
    DATE_CREATE_ERROR: 'DATE_CREATE_ERROR',
    DATE_UPDATE_ERROR: 'DATE_UPDATE_ERROR',
    DATE_DELETE_ERROR: 'DATE_DELETE_ERROR',
  } as const;
  
  export type DateErrorCodesEnum =
    (typeof DateErrorCodes)[keyof typeof DateErrorCodes];