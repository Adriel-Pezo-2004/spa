export const WorkersErrors = {
    WORKERS_NOT_FOUND: 'Trabajador no encontrado.',
    WORKERSS_NOT_FOUND: 'Trabajadores no encontrados.',
    WORKERS_CREATE_ERROR: 'Error al crear la trabajadora.',
    WORKERS_UPDATE_ERROR: 'Error al actualizar la trabajadora.',
    WORKERS_DELETE_ERROR: 'Error al eliminar la trabajadora.',
  } as const;
  
  export type WorkersErrorsMessage =
    (typeof WorkersErrors)[keyof typeof WorkersErrors];
  
  export const WorkersErrorCodes = {
    WORKERS_NOT_FOUND: 'WORKERS_NOT_FOUND',
    WORKERSS_NOT_FOUND: 'WORKERSS_NOT_FOUND',
    WORKERS_CREATE_ERROR: 'WORKERS_CREATE_ERROR',
    WORKERS_UPDATE_ERROR: 'WORKERS_UPDATE_ERROR',
    WORKERS_DELETE_ERROR: 'WORKERS_DELETE_ERROR',
  } as const;
  
  export type WorkersErrorCodesEnum =
    (typeof WorkersErrorCodes)[keyof typeof WorkersErrorCodes];