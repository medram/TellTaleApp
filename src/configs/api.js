import axios from 'axios'

export const BASE_URL = 'https://www.telltale.com'
export const URL_API = 'https://api.telltale.com/3'

// Default global Axios configs
axios.defaults.baseURL = URL_API
axios.defaults.headers.common['User-Agent'] = "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_8_9) AppleWebKit/5322 (KHTML, like Gecko) Chrome/37.0.819.0 Mobile Safari/5322"
