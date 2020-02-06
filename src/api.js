import api from "./apiInstance";

export const tvApi = {
  tvDetail: id => {
    return api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos,person"
      }
    });
  },
  topRated: () => api.get("tv/top_rated"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  search: term => {
    return api.get("search/tv", {
      params: {
        query: encodeURIComponent(term)
      }
    });
  }
};

export const moviesApi = {
  movieDetail: id => {
    return api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos,person"
      }
    });
  },
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  search: term => {
    return api.get("search/movie", {
      params: {
        query: encodeURIComponent(term)
      }
    });
  },
  collection: id => api.get(`collection/${id}`)
};
