/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from '../models/Item';
import type { ItemSet } from '../models/ItemSet';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ItemSetControllerService {

    /**
     * Rename an item set by  ID
     * @param itemSetId
     * @param newName
     * @returns string Item renamed successfully
     * @throws ApiError
     */
    public static renameItemSet(
        itemSetId: number,
        newName: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/renameItemSet/{itemSetID}',
            path: {
                'itemSetID': itemSetId,
            },
            query: {
                'newName': newName,
            },
            errors: {
                404: `Item Set not found`,
            },
        });
    }

    /**
     * Edit an item set description  by  ID
     * @param itemSetId
     * @param newDescription
     * @returns string Item Set description edited successfully
     * @throws ApiError
     */
    public static editItemSetDescription(
        itemSetId: number,
        newDescription: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/editItemSetDescription/{itemSetID}',
            path: {
                'itemSetID': itemSetId,
            },
            query: {
                'newDescription': newDescription,
            },
            errors: {
                404: `Item Set not found`,
            },
        });
    }

    /**
     * Item aus ItemSet entfernen
     * @param itemSetId Die ID des ItemSets
     * @param tagId Die ID des Items
     * @returns any Item erfolgreich aus ItemSet entfernt
     * @throws ApiError
     */
    public static removeItemFromItemSet(
        itemSetId: number,
        tagId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/removeItemFromItemSet',
            query: {
                'itemSetID': itemSetId,
                'tagID': tagId,
            },
            errors: {
                404: `ItemSet oder Item nicht gefunden`,
            },
        });
    }

    /**
     * Neues ItemSet erstellen
     * @param itemSetName Der Name des ItemSets
     * @param itemSetDescription Die Beschreibung des ItemSets
     * @param alwaysRequired Kennzeichen ob ItemSet immer benoetigt wird
     * @returns ItemSet ItemSet erfolgreich erstellt
     * @throws ApiError
     */
    public static createItemSet(
        itemSetName: string,
        itemSetDescription: string,
        alwaysRequired: boolean,
    ): CancelablePromise<ItemSet> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/createItemSet',
            query: {
                'itemSetName': itemSetName,
                'itemSetDescription': itemSetDescription,
                'alwaysRequired': alwaysRequired,
            },
            errors: {
                400: `Ungueltige Anforderung`,
            },
        });
    }

    /**
     * Item zu ItemSet zuweisen
     * @param itemSetId Die ID des ItemSets
     * @param tagIDs Die IDs der Items
     * @param overwrite Bestehende ItemIds entfernen
     * @returns any Item erfolgreich zu ItemSet zugewiesen
     * @throws ApiError
     */
    public static assignMultipleItemsToItemSet(
        itemSetId: number,
        tagIDs: Array<string>,
        overwrite: boolean,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/assignMultipleItemsToItemSet',
            query: {
                'itemSetID': itemSetId,
                'tagIDs': tagIDs,
                'overwrite': overwrite,
            },
            errors: {
                404: `ItemSet oder Item nicht gefunden`,
            },
        });
    }

    /**
     * Item zu ItemSet zuweisen
     * @param itemSetId Die ID des ItemSets
     * @param tagId Die ID des Items
     * @returns any Item erfolgreich zu ItemSet zugewiesen
     * @throws ApiError
     */
    public static assignItemToItemSet(
        itemSetId: number,
        tagId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/assignItemToItemSet',
            query: {
                'itemSetID': itemSetId,
                'tagID': tagId,
            },
            errors: {
                404: `ItemSet oder Item nicht gefunden`,
            },
        });
    }

    /**
     * Gibt alle dem bestimmten ItemSet zugewiesenen Items zurueck
     * @param itemSetId Die ID des ItemSets
     * @returns Item Erfolgreiche Abfrage der zugewiesenen Items
     * @throws ApiError
     */
    public static getAssignedItemsForItemSet(
        itemSetId: number,
    ): CancelablePromise<Item> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/getAssignedItemsForItemSet/{itemSetID}',
            path: {
                'itemSetID': itemSetId,
            },
            errors: {
                404: `ItemSet nicht gefunden`,
            },
        });
    }

    /**
     * Alle ItemSets abrufen
     * @returns ItemSet Erfolgreich alle ItemSets abgerufen
     * @throws ApiError
     */
    public static getAllItemSets(): CancelablePromise<Array<ItemSet>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/getAllItemSets',
        });
    }

    /**
     * ItemSet loeschen
     * @param itemSetId Die ID des ItemSets
     * @returns any ItemSet erfolgreich geloescht
     * @throws ApiError
     */
    public static deleteItemSet(
        itemSetId: number,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/deleteItemSet',
            query: {
                'itemSetID': itemSetId,
            },
            errors: {
                400: `ItemSet nicht gefunden`,
                404: `Ungueltige Anforderung`,
            },
        });
    }

}
