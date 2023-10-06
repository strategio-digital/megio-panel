/**
 * Copyright (c) 2023 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.dev, jz@strategio.dev)
 */

export interface IResourceDiff {
    to_create: string[],
    to_remove: string[]
}