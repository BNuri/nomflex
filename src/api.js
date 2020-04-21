export const tvApi = {
  tvDetail: (id) => ({
    url: `tv/${id}`,
    params: {
      append_to_response: "videos,person",
    },
  }),
  topRated: () => ({ url: `tv/top_rated` }),
  popular: () => ({ url: `tv/popular` }),
  airingToday: () => ({ url: `tv/airing_today` }),
  search: (term) => ({
    url: `search/tv`,
    params: {
      query: encodeURIComponent(term),
    },
  }),
};

export const moviesApi = {
  movieDetail: (id) => ({
    url: `movie/${id}`,
    params: { append_to_response: "videos,person" },
  }),
  nowPlaying: () => ({ url: `movie/now_playing` }),
  upcoming: () => ({ url: `movie/upcoming` }),
  popular: () => ({ url: `movie/popular` }),
  search: (term) => ({
    url: `search/movie`,
    params: {
      query: encodeURIComponent(term),
    },
  }),
  collection: (id) => ({ url: `collection/${id}` }),
};
