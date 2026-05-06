import { useState, useEffect, useRef } from "react";
import axios from "axios";

const BASE_URL = "https://api.freeapi.app/api/v1/public";

export const useFetchData = (endpoint, options = {}) => {
  const { initialPage = 1, isPaginated = true, appendMode = false } = options;
  const appendNextPage = useRef(false);
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
    page: initialPage,
    query: "",
  });

  const fetchData = async (currentPage, currentQuery, shouldAppend = false) => {
    const previousScrollY = shouldAppend ? window.scrollY : null;
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const params = isPaginated
        ? {
            limit: 10,
            query: currentQuery,
            page: currentPage,
          }
        : {};

      const response = await axios.request({
        method: "GET",
        url: `${BASE_URL}${endpoint}`,
        params,
        headers: { accept: "application/json" },
      });

      if (shouldAppend) {
        setState((prev) => ({
          ...prev,
          data: {
            ...response.data,
            data: {
              ...response.data.data,
              data: [
                ...(prev.data?.data?.data || []),
                ...response.data.data.data,
              ],
            },
          },
        }));
      } else {
        setState((prev) => ({ ...prev, data: response.data }));
      }

      if (previousScrollY !== null) {
        requestAnimationFrame(() => {
          window.scrollTo(0, previousScrollY);
        });
      }
    } catch (err) {
      setState((prev) => ({
        ...prev,
        error: err.response?.data?.message || err.message,
      }));
    } finally {
      setState((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    const shouldAppend = appendMode && appendNextPage.current;
    fetchData(state.page, state.query, shouldAppend);
    appendNextPage.current = false;
  }, [state.page, state.query, appendMode]);

  const handleSearch = (searchValue) => {
    appendNextPage.current = false;
    setState((prev) => ({ ...prev, page: 1, query: searchValue }));
  };

  const goToNextPage = () => {
    setState((prev) => {
      if (prev.data?.data?.nextPage) {
        appendNextPage.current = false;
        return { ...prev, page: prev.page + 1 };
      }
      return prev;
    });
  };

  const loadMore = () => {
    setState((prev) => {
      if (appendMode && prev.data?.data?.nextPage) {
        appendNextPage.current = true;
        return { ...prev, page: prev.page + 1 };
      }
      return prev;
    });
  };

  const goToPage = (pageNum) => {
    appendNextPage.current = false;
    setState((prev) => ({ ...prev, page: pageNum }));
  };

  const goToPrevPage = () => {
    setState((prev) => {
      if (prev.data?.data?.previousPage) {
        return { ...prev, page: prev.page - 1 };
      }
      return prev;
    });
  };

  const refetch = () => {
    fetchData(state.page, state.query);
  };

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    page: state.page,
    query: state.query,
    handleSearch,
    goToNextPage,
    goToPrevPage,
    goToPage,
    loadMore,
    refetch,
  };
};
