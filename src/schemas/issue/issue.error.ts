export const IssueErrors = {
    ISSUE_NOT_FOUND: 'Recibo no encontrado.',
    ISSUES_NOT_FOUND: 'Recibos no encontrados.',
    ISSUE_CREATE_ERROR: 'Error al crear el recibo.',
    ISSUE_UPDATE_ERROR: 'Error al actualizar el recibo.',
    ISSUE_DELETE_ERROR: 'Error al eliminar el recibo.',
  } as const;
  
  export type IssueErrorsMessage =
    (typeof IssueErrors)[keyof typeof IssueErrors];
  
  export const IssueErrorCodes = {
    ISSUE_NOT_FOUND: 'ISSUE_NOT_FOUND',
    ISSUES_NOT_FOUND: 'ISSUES_NOT_FOUND',
    ISSUE_CREATE_ERROR: 'ISSUE_CREATE_ERROR',
    ISSUE_UPDATE_ERROR: 'ISSUE_UPDATE_ERROR',
    ISSUE_DELETE_ERROR: 'ISSUE_DELETE_ERROR',
  } as const;
  
  export type IssueErrorCodesEnum =
    (typeof IssueErrorCodes)[keyof typeof IssueErrorCodes];