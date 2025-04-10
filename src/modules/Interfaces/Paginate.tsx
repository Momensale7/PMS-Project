export default interface PaginationProps{
    pageNumber: number;
    pageSize: number;
    totalItems: number;
    onPageSizeChange: (newSize: number) => void;
    label: string;
    handlePrev: () => void;
    handleNext: () => void;
}