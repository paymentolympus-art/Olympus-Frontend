import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
import { useMemo } from "react";

interface PaginationWidgetProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisiblePages?: number; // padrão: 6
  showBoundaries?: boolean; // "Primeira" e "Última" página
}

export function PaginationWidget({
  currentPage,
  totalPages,
  onPageChange,
  maxVisiblePages = 6,
  showBoundaries = false,
}: PaginationWidgetProps) {
  const pages = useMemo(() => {
    const middlePage = Math.floor(maxVisiblePages / 2);
    let startPage = Math.max(1, currentPage - middlePage);
    let endPage = Math.min(totalPages, currentPage + middlePage);

    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - maxVisiblePages + 1);
      }
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [currentPage, totalPages, maxVisiblePages]);

  const renderEllipsis = (key: string, label: string) => (
    <PaginationItem key={key}>
      <span className="px-2 text-gray-400 select-none" title={label}>
        ...
      </span>
    </PaginationItem>
  );

  return (
    <Pagination className="mt-6">
      <PaginationContent className="space-x-2">
        {showBoundaries && currentPage > 1 && (
          <PaginationItem>
            <button
              className="px-4 py-2 border hover:bg-primary rounded-full"
              onClick={() => onPageChange(1)}
            >
              Primeiro
            </button>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationPrevious
            className={
              currentPage === 1
                ? "pointer-events-none opacity-50 border"
                : "border"
            }
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
          />
        </PaginationItem>

        {pages[0] > 1 && renderEllipsis("start-ellipsis", "Páginas anteriores")}

        {pages.map((page) => (
          <PaginationItem key={page}>
            <button
              onClick={() => onPageChange(page)}
              className={`py-1 px-3 border rounded-full hover:bg-tertiary ${
                page === currentPage ? "text-primary font-bold" : ""
              }`}
            >
              {page}
            </button>
          </PaginationItem>
        ))}

        {pages[pages.length - 1] < totalPages &&
          renderEllipsis("end-ellipsis", "Próximas páginas")}

        <PaginationItem>
          <PaginationNext
            className={
              currentPage === totalPages
                ? "pointer-events-none opacity-50 border"
                : "border"
            }
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
          />
        </PaginationItem>

        {showBoundaries && currentPage < totalPages && (
          <PaginationItem>
            <button
              className="px-4 py-2 border hover:bg-primary rounded-full"
              onClick={() => onPageChange(totalPages)}
            >
              Último
            </button>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
