/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ItemSet } from '../models/ItemSet';
import type { User } from '../models/User';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UserControllerService {

    /**
     * ItemSet von Benutzer entfernen
     * @param itemSetId Die ID des ItemSets
     * @param userId Die ID des Benutzers
     * @returns any ItemSet erfolgreich von Benutzer entfernt
     * @throws ApiError
     */
    public static removeItemSetFromUser(
        itemSetId: number,
        userId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/removeItemSetFromUser',
            query: {
                'itemSetID': itemSetId,
                'userID': userId,
            },
            errors: {
                404: `ItemSet oder Benutzer nicht gefunden`,
            },
        });
    }

    /**
     * Neuen Benutzer erstellen
     * @param userName Der Benutzername
     * @returns User Benutzer erfolgreich erstellt
     * @throws ApiError
     */
    public static createUser(
        userName: string,
    ): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/createUser',
            query: {
                'userName': userName,
            },
            errors: {
                400: `Ungueltige Anforderung`,
            },
        });
    }

    /**
     * ItemSet einem Benutzer zuweisen
     * @param userId Die ID des Benutzers
     * @param itemSetId Die ID des ItemSets
     * @returns any ItemSet erfolgreich einem Benutzer zugewiesen
     * @throws ApiError
     */
    public static assignItemSetToUser(
        userId: number,
        itemSetId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/assignItemSetToUser',
            query: {
                'userID': userId,
                'itemSetID': itemSetId,
            },
            errors: {
                404: `Benutzer oder ItemSet nicht gefunden`,
            },
        });
    }

    /**
     * Gibt alle dem bestimmten Nutzer zugewiesenen ItemSets zurueck
     * @param userId Die ID des Nutzers
     * @returns ItemSet Erfolgreiche Abfrage der zugewiesenen ItemSets
     * @throws ApiError
     */
    public static getAssignedItemSetsForUser(
        userId: number,
    ): CancelablePromise<ItemSet> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/getAssignedItemSetsForUser/{userID}',
            path: {
                'userID': userId,
            },
            errors: {
                404: `Nutzer nicht gefunden`,
            },
        });
    }

    /**
     * Alle Benutzer abrufen
     * @returns User Erfolgreich alle Benutzer abgerufen
     * @throws ApiError
     */
    public static getAllUsers(): CancelablePromise<User> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/getAllUsers',
        });
    }

}
