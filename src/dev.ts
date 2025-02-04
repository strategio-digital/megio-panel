import { createMegioPanel } from './index'

createMegioPanel({
    baseUrl: 'http://localhost:8090/',
    // errorHandler: (response, errors) => {
    //     console.log(response.status)
    //     console.log(errors)
    // }
})