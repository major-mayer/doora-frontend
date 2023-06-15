/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UnknownTag } from '../models/UnknownTag';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UnknownTagControllerService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Neuen Tag speichern
     * @param tagId Die ID des Tags
     * @returns UnknownTag Neuen Tag erfolgreich gespeichert
     * @throws ApiError
     */
    public detectedNewTag(
        tagId: string,
    ): CancelablePromise<UnknownTag> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/api/detectedNewTag',
            query: {
                'tagID': tagId,
            },
            errors: {
                400: `Ungueltige Anforderung`,
            },
        });
    }

    /**
     * Neue Tag ID abrufen
     * @returns string Erfolgreich alle Items abgerufen
     * @throws ApiError
     */
    public getNewTagId(): CancelablePromise<string> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/api/getNewTagID',
            errors: {
                404: `Ungueltige Anforderung oder aktuell kein neuer Tag vorhanden`,
            },
        });
    }

}
