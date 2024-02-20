import { CombinedFilters } from "./query.utils";

export function mapFindOptions(props: CombinedFilters<any>) {
  const {
    query = {},
    projection = '',
    limit = 0,
    sort = [],
    skip = 0,
    populate = '',
  } = props;

  // Aquí puedes realizar cualquier lógica adicional según tus necesidades

  return {
    query,
    projection,
    limit,
    sort,
    skip,
    populate,
  };
}