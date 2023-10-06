/**
 * Copyright (c) 2022 Strategio Digital s.r.o.
 * @author Jiří Zapletal (https://strategio.dev, jz@strategio.dev)
 */

const logout = (): void => {
    localStorage.removeItem('strategio_saas_user')
}

export default logout