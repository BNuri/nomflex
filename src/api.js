import api from "./apiInstance";

export const tvApi = {
  tvDetail: id => {
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos"
      }
    });
  },
  topRated: () => {
    api.get("tv/top_rated");
  },
  popular: () => {
    api.get("tv/popular");
  },
  airingToday: () => {
    api.get("tv/airing_today");
  },
  search: term => {
    api.get("search/tv", {
      params: {
        query: encodeURIComponent(term)
      }
    });
  }
};

export const moviesApi = {
  movieDetail: id => {
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos"
      }
    });
  },
  nowPlaying: () => {
    api.get("movie/now_playing");
  },
  upcoming: () => {
    api.get("movie/upcoming");
  },
  popular: () => {
    api.get("movie/popular");
  },
  search: term => {
    api.get("search/movie", {
      params: {
        query: encodeURIComponent(term)
      }
    });
  }
};
