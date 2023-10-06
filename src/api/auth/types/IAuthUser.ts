/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.dev, jz@strategio.dev)
 */

export interface IAuthUser {
    bearer_token: string
    bearer_token_id: string
    user: {
        id: string
        email: string
        roles: string[]
        resources: string[]
    }
}