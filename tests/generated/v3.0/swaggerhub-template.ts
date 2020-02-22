/* tslint:disable */
/* eslint-disable */

/*
* ---------------------------------------------------------------
* ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
* ##                                                           ##
* ## AUTHOR: acacode                                           ##
* ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
* ---------------------------------------------------------------
*/


export namespace example {

  /**
  * @name exampleList
  * @summary Server example operation
  * @request GET:/example
  * @description This is an example operation to show how security is applied to the call.
  */
  export namespace ExampleList {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }
}
export namespace ping {

  /**
  * @name pingList
  * @summary Server heartbeat operation
  * @request GET:/ping
  * @description This operation shows how to override the global security defined above, as we want to open it up for all users.
  */
  export namespace PingList {
    export type RequestQuery = {};
    export type RequestBody = never;
    export type ResponseBody = any;
  }
}

export type RequestParams = Omit<RequestInit, "body" | "method"> & {
  secure?: boolean;
}

type ApiConfig<SecurityDataType> = {
  baseUrl?: string,
  baseApiParams?: RequestParams,
  securityWorker?: (securityData: SecurityDataType) => RequestParams,
}

/** This is an example of using OAuth2 Application Flow in a specification to describe security to your API. */
export class Api<SecurityDataType> {
  
  public baseUrl = "https://virtserver.swaggerhub.com/sdfsdfsffs/sdfff/1.0.0";
  public title = "Sample Application Flow OAuth2 Project";
  public version = "1.0.0";

  private securityData: SecurityDataType = (null as any);
  private securityWorker: ApiConfig<SecurityDataType>["securityWorker"] = (() => {}) as any
  
  private baseApiParams: RequestParams = {
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
  }

  constructor({ baseUrl,baseApiParams,securityWorker, }: ApiConfig<SecurityDataType> = {}) {
    this.baseUrl = baseUrl || this.baseUrl;
    this.baseApiParams = baseApiParams || this.baseApiParams;
    this.securityWorker = securityWorker || this.securityWorker;
  }

  public setSecurityData = (data: SecurityDataType) => {
    this.securityData = data
  }


  private mergeRequestOptions(params: RequestParams, securityParams?: RequestParams): RequestParams {
    return {
      ...this.baseApiParams,
      ...params,
      ...(securityParams || {}),
      headers: {
        ...(this.baseApiParams.headers || {}),
        ...(params.headers || {}),
        ...((securityParams && securityParams.headers) || {})
      }
    }
  }
  
  private safeParseResponse = <T = any>(response: Response): Promise<T> =>
    response.json()
      .then(data => data)
      .catch(e => response.text);
  
  public request = <T = any>(
    path: string,
    method: string,
    { secure, ...params }: RequestParams = {},
    body?: any,
    secureByDefault?: boolean,
  ): Promise<T> =>
    fetch(`${this.baseUrl}${path}`, {
      // @ts-ignore
      ...this.mergeRequestOptions(params, (secureByDefault || secure) && this.securityWorker(this.securityData)),
      method,
      body: body ? JSON.stringify(body) : null,
    }).then(async response => {
      const data = await this.safeParseResponse<T>(response);
      if (!response.ok) throw data
      return data
    })



  example = {


    /**
    * @name exampleList
    * @summary Server example operation
    * @request GET:/example
    * @description This is an example operation to show how security is applied to the call.
    */
    exampleList: (params?: RequestParams) =>
      this.request<any>(`/example`, "GET", params, null),
  }
  ping = {


    /**
    * @name pingList
    * @summary Server heartbeat operation
    * @request GET:/ping
    * @description This operation shows how to override the global security defined above, as we want to open it up for all users.
    */
    pingList: (params?: RequestParams) =>
      this.request<any>(`/ping`, "GET", params, null),
  }

}