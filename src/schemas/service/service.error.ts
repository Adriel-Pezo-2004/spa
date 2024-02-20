export const ServiceErrors = {
    SERVICE_NOT_FOUND: 'Servicio no encontrado.',
    SERVICES_NOT_FOUND: 'Servicios no encontrados.',
    SERVICE_CREATE_ERROR: 'Error al crear el servicio.',
    SERVICE_UPDATE_ERROR: 'Error al actualizar el servicio.',
    SERVICE_DELETE_ERROR: 'Error al eliminar el servicio.',
  } as const;
  
  export type ServiceErrorsMessage =
    (typeof ServiceErrors)[keyof typeof ServiceErrors];
  
  export const ServiceErrorCodes = {
    SERVICE_NOT_FOUND: 'SERVICE_NOT_FOUND',
    SERVICES_NOT_FOUND: 'SERVICES_NOT_FOUND',
    SERVICE_CREATE_ERROR: 'SERVICE_CREATE_ERROR',
    SERVICE_UPDATE_ERROR: 'SERVICE_UPDATE_ERROR',
    SERVICE_DELETE_ERROR: 'SERVICE_DELETE_ERROR',
  } as const;
  
  export type VendorErrorCodesEnum =
    (typeof ServiceErrorCodes)[keyof typeof ServiceErrorCodes];