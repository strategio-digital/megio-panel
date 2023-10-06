/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.dev, jz@strategio.dev)
 */

export interface IPagination {
    currentPage: number
    lastPage: number
    itemsPerPage: number
    itemsCountAll: number
}