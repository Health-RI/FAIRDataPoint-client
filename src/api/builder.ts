import config from '@/config'
import request from '@/api/request'

function build(entity: string) {
  return {
    get(id: string | number) {
      return request.get(`/${entity}/${id}`, {
        headers: {
          Accept: 'text/turtle',
        },
      })
    },

    getSpec() {
      return request.get(`/${entity}/spec`, {
        headers: {
          Accept: 'text/turtle',
        },
      })
    },

    getChildren(id: string | number, child: string, page: number) {
      return request.get(`/${entity}/${id}/page/${child}?page=${page}&size=${config.defaultPageSize}`, {
        headers: {
          Accept: 'text/turtle',
        },
      })
    },

    post(data: string) {
      return request.post(`/${entity}`, data, {
        headers: {
          Accept: 'text/turtle',
          'Content-Type': 'text/turtle',
        },
      })
    },

    put(id: string | number, data: string) {
      return request.put(`/${entity}/${id}`, data, {
        headers: {
          Accept: 'text/turtle',
          'Content-Type': 'text/turtle',
        },
      })
    },

    getMeta(id: string | number) {
      return request.get(`/${entity}/${id}/meta`)
    },

    putMetaState(id: string | number, data: Record<string, unknown>) {
      return request.put(`/${entity}/${id}/meta/state`, data)
    },

    delete(id: string | number) {
      return request.delete(`/${entity}/${id}`)
    },

    getMembers(id: string | number) {
      return request.get(`/${entity}/${id}/members`)
    },

    putMember(id: string | number, userUuid: string, membershipUuid: string) {
      return request.put(`/${entity}/${id}/members/${userUuid}`, {
        membershipUuid,
      })
    },

    deleteMember(id: string | number, userUuid: string) {
      return request.delete(`/${entity}/${id}/members/${userUuid}`)
    },
  }
}

export default {
  build,
}
