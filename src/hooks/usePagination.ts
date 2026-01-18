import { useReducer, useCallback } from "react";
import { produce } from "immer";

export enum ActionPaginationTypes {
  SET_CURRENT_PAGE = "SET_CURRENT_PAGE",
  SET_ITEMS_PER_PAGE = "SET_ITEMS_PER_PAGE",
  SET_LIST_SIZE = "SET_LIST_SIZE",
}

export interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  listSize: number;
}

export interface PaginationState {
  pagination: Pagination;
}

type PaginationAction =
  | { type: ActionPaginationTypes.SET_CURRENT_PAGE; payload: number }
  | { type: ActionPaginationTypes.SET_ITEMS_PER_PAGE; payload: number }
  | { type: ActionPaginationTypes.SET_LIST_SIZE; payload: number };

export function usePagination(initialState: PaginationState) {
  const [paginationState, dispatch] = useReducer(
    produce((draft: PaginationState, action: PaginationAction) => {
      switch (action.type) {
        case ActionPaginationTypes.SET_CURRENT_PAGE:
          draft.pagination.currentPage = action.payload;
          break;
        case ActionPaginationTypes.SET_ITEMS_PER_PAGE:
          draft.pagination.itemsPerPage = action.payload;
          break;
        case ActionPaginationTypes.SET_LIST_SIZE:
          draft.pagination.listSize = action.payload;
          break;
      }

      // Atualiza totalPages automaticamente sempre que algo muda
      draft.pagination.totalPages = Math.ceil(
        draft.pagination.listSize / draft.pagination.itemsPerPage
      );
    }),
    initialState
  );

  const setCurrentPage = useCallback(
    (currentPage: number) =>
      dispatch({
        type: ActionPaginationTypes.SET_CURRENT_PAGE,
        payload: currentPage,
      }),
    []
  );

  const setItemsPerPage = useCallback(
    (itemsPerPage: number) =>
      dispatch({
        type: ActionPaginationTypes.SET_ITEMS_PER_PAGE,
        payload: itemsPerPage,
      }),
    []
  );

  const setListSize = useCallback(
    (listSize: number) =>
      dispatch({
        type: ActionPaginationTypes.SET_LIST_SIZE,
        payload: listSize,
      }),
    []
  );

  return {
    pagination: paginationState.pagination,
    setCurrentPage,
    setItemsPerPage,
    setListSize,
  };
}
