export const slicingFormat = (name: string, start: number, end: number) => {
    return name?.length > end
        ? name.slice(start, end) + '...'
        : name
}
