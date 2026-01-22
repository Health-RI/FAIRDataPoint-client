import request from '../request'

export default {
  postReset(reset: Record<string, unknown>) {
    return request.post('/reset', reset)
  },
}
