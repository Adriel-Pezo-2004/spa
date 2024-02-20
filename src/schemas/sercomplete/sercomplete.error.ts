export const SerCompleteErrors = {
    SERVICECOMPLETE_NOT_FOUND: 'Servicio completo no encontrado.',
    SERVICECOMPLETES_NOT_FOUND: 'Servicios completos no encontrados.',
    SERVICECOMPLETE_CREATE_ERROR: 'Error al crear el servicio completo.',
    SERVICECOMPLETE_UPDATE_ERROR: 'Error al actualizar el servicio completo.',
    SERVICECOMPLETE_DELETE_ERROR: 'Error al eliminar el servicio completo.',
  } as const;
  
  export type SerCompleteMessage =
    (typeof SerCompleteErrors)[keyof typeof SerCompleteErrors];
  
  export const SerCompleteErrorCodes = {
    SERVICECOMPLETE_NOT_FOUND: 'SERVICECOMPLETE_NOT_FOUND',
    SERVICECOMPLETES_NOT_FOUND: 'SERVICECOMPLETES_NOT_FOUND',
    SERVICECOMPLETE_CREATE_ERROR: 'SERVICECOMPLETE_CREATE_ERROR',
    SERVICECOMPLETE_UPDATE_ERROR: 'SERVICECOMPLETE_UPDATE_ERROR',
    SERVICECOMPLETE_DELETE_ERROR: 'SERVICECOMPLETE_DELETE_ERROR',
  } as const;
  
  export type SerCompleteErrorCodesEnum =
    (typeof SerCompleteErrorCodes)[keyof typeof SerCompleteErrorCodes];