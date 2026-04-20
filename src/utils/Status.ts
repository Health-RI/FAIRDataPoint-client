import _ from 'lodash'

export default class Status {
  static readonly PENDING = 'PENDING'

  static readonly ERROR = 'ERROR'

  static readonly SUCCESS = 'SUCCESS'

  static readonly DEFAULT = 'DEFAULT'

  status: string = Status.DEFAULT

  errorCode: number | null = null

  msg: string | null = null

  constructor() {
    this.clear()
  }

  setStatus(status: string, msg?: string): void {
    this.status = status
    this.msg = msg ?? null
  }

  get message(): string | null {
    return this.msg
  }

  isPending(): boolean {
    return this.status === Status.PENDING
  }

  isDefault(): boolean {
    return this.status === Status.DEFAULT
  }

  isError(): boolean {
    return this.status === Status.ERROR
  }

  isSuccess(): boolean {
    return this.status === Status.SUCCESS
  }

  setPending(): void {
    this.clear()
    this.status = Status.PENDING
    this.errorCode = null
  }

  setError(msg?: string, errorCode: number | null = null): void {
    this.status = Status.ERROR
    this.msg = msg ?? null
    this.errorCode = errorCode
  }

  setErrorFromResponse(error: any, defaultMsg: string): void {
    this.status = Status.ERROR
    const responseMessage = _.get(error, 'response.data.message')
    const responseBody = _.get(error, 'response.data')
    const errorMessage = _.get(error, 'message')

    if (typeof responseMessage === 'string' && responseMessage.trim().length > 0) {
      this.msg = responseMessage
    } else if (typeof responseBody === 'string' && responseBody.trim().length > 0) {
      this.msg = responseBody
    } else if (typeof errorMessage === 'string' && errorMessage.trim().length > 0) {
      this.msg = `${defaultMsg} (${errorMessage})`
    } else {
      this.msg = defaultMsg
    }

    this.errorCode = _.get(error, 'response.status') ?? null
  }

  setDone(msg?: string): void {
    this.msg = msg ?? null
    this.status = msg ? Status.SUCCESS : Status.DEFAULT
  }

  clear(): void {
    this.status = Status.DEFAULT
    this.msg = null
    this.errorCode = null
  }
}
