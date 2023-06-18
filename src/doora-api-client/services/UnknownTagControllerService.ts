/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { UnknownTag } from '../models/UnknownTag';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UnknownTagControllerService {

    /**
     * Neuen Tag speichern
     * @param tagId Die ID des Tags
     * @returns UnknownTag Neuen Tag erfolgreich gespeichert
     * @throws ApiError
     */
    public static detectedNewTag(
        tagId: string,
    ): CancelablePromise<UnknownTag> {
        return __request(OpenAPI, {
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
    public static getNewTagId(): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/getNewTagID',
            errors: {
                404: `Ungueltige Anforderung oder aktuell kein neuer Tag vorhanden`,
            },
        });
    }

}
