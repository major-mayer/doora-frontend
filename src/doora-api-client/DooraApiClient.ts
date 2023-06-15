/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { ItemControllerService } from './services/ItemControllerService';
import { ItemSetControllerService } from './services/ItemSetControllerService';
import { UnknownTagControllerService } from './services/UnknownTagControllerService';
import { UserControllerService } from './services/UserControllerService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class DooraApiClient {

    public readonly itemController: ItemControllerService;
    public readonly itemSetController: ItemSetControllerService;
    public readonly unknownTagController: UnknownTagControllerService;
    public readonly userController: UserControllerService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'http://doora.horbach5x.de',
            VERSION: config?.VERSION ?? '0',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.itemController = new ItemControllerService(this.request);
        this.itemSetController = new ItemSetControllerService(this.request);
        this.unknownTagController = new UnknownTagControllerService(this.request);
        this.userController = new UserControllerService(this.request);
    }
}

