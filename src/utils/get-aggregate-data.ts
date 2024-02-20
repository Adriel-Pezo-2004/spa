import { CombinedFilters } from './query.utils';
import { mapFindOptions } from './convertQueries';
import { isEmpty, isNumber } from 'lodash';

export function getArr(...args: any) {
  return args;
}

export const getAggregateData = (queryBuild: CombinedFilters<any>) => {
  const {
    query,
    projection = undefined,
    limit,
    sort,
    skip = 0,
  } = mapFindOptions(queryBuild);
  const dataFacet = [];
  !isEmpty(sort) && dataFacet.push({ $sort: sort });
  isNumber(limit) && dataFacet.push(...[{ $skip: skip }, { $limit: limit }]);
  const project = [];
  if (!isEmpty(projection)) {
    project.push({
      $project: Object.assign(
        {},
        ...getArr(
          ...projection
            .split(' ')
            .map((item: string) => ({
              [item.replace(/-/g, '')]: item.includes('-') ? 0 : 1,
            }))
            .flat(Infinity),
        ),
      ),
    });
  }
  return { query, dataFacet, project, skip, sort, limit };
};