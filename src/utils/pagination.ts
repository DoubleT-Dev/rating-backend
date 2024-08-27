export function calculatePagination(page: number) {
    const pageSize = parseInt(process.env.PAGE_SIZE!);
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    return { from, to };
}