const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {} as Record<keyof T, string>);
};

export const getAllIdeasRoute = () => '/';

export const ViewIdeaRouteParams = getRouteParams({ ideaNick: true });
export type ViewIdeaRouteParams = typeof ViewIdeaRouteParams;
export const getViewIdeaRoute = ({ ideaNick }: ViewIdeaRouteParams) => `/ideas/${ideaNick}`;
