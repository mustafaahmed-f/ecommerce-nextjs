import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/app/_components/shadcn/pagination";
import { useNextNavigation } from "@/app/_context/NextNavigationProvider";

interface ShadcnPaginationProps {
  count: number;
  siblingCount?: number;
  showFirstLast?: boolean;
}

function ShadcnPagination({
  count,
  siblingCount = 1,
  showFirstLast = true,
}: ShadcnPaginationProps) {
  const { router, pathName, searchParams } = useNextNavigation();
  const currentPage = parseInt(searchParams.get("page") ?? "1");

  const handleChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.replace(`${pathName}?${params.toString()}`);
  };

  const createPageRange = (): (number | string)[] => {
    const totalPages = count;
    const DOTS = "...";
    const totalPageNumbers = siblingCount * 2 + 1;

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPages - 1;

    if (!showLeftDots && showRightDots) {
      const leftRange = Array.from(
        { length: 3 + 2 * siblingCount },
        (_, i) => i + 1,
      );
      return [...leftRange, DOTS, totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightRange = Array.from(
        { length: 3 + 2 * siblingCount },
        (_, i) => totalPages - (3 + 2 * siblingCount) + 1 + i,
      );
      return [1, DOTS, ...rightRange];
    }

    const middleRange = Array.from(
      { length: rightSiblingIndex - leftSiblingIndex + 1 },
      (_, i) => leftSiblingIndex + i,
    );

    return [1, DOTS, ...middleRange, DOTS, totalPages];
  };

  const pageRange = createPageRange();

  return (
    <Pagination className="flex w-full justify-end">
      <PaginationContent>
        {showFirstLast && currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleChange(currentPage - 1);
              }}
            />
          </PaginationItem>
        )}

        {pageRange.map((page, idx) =>
          page === "..." ? (
            <PaginationItem key={idx}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={idx}>
              <PaginationLink
                href="#"
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault();
                  handleChange(Number(page));
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {showFirstLast && currentPage < count && (
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleChange(currentPage + 1);
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}

export default ShadcnPagination;
