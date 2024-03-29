import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { StatsResponse } from "../../types/api-types";

export const server = "http://localhost:4000";

export const dashboardAPI = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/dashboard/` }),
  tagTypes: ["users"],
  endpoints: (builder) => ({
     stats: builder.query<StatsResponse, string>({
      query: (id) => `stats?id=${id}`,
      keepUnusedDataFor: 0,
    }),

    pie: builder.query<string, string>({
      query: (id) => `pie?id=${id}`,
    }),

    bar: builder.query<string, string>({
      query: (id) => `bar?id=${id}`,
    }),

    line: builder.query<string, string>({
      query: (id) => `line?id=${id}`,
    }),
  }),
});

export const { useStatsQuery, useBarQuery, useLineQuery, usePieQuery } =
  dashboardAPI;
