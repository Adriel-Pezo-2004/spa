export interface CombinedFilters<T> {
    query?: T; // Filtro de consulta principal
    projection?: string; // Proyección de campos
    limit?: number; // Límite de documentos a recuperar
    sort?: []; // Campos por los cuales ordenar
    skip?: number; // Número de documentos para omitir (para la paginación)
    populate?: string; // Campo para realizar población (populate)
  }