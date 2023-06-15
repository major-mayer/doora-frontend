/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from '../models/Item';
import type { ItemSet } from '../models/ItemSet';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ItemSetControllerService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Item aus ItemSet entfernen
     * @param itemSetId Die ID des ItemSets
     * @param tagId Die ID des Items
     * @returns any Item erfolgreich aus ItemSet entfernt
     * @throws ApiError
     */
    public removeItemFromItemSet(
        itemSetId: number,
        tagId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
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
    public createItemSet(
        itemSetName: string,
        itemSetDescription: string,
        alwaysRequired: boolean,
    ): CancelablePromise<ItemSet> {
        return this.httpRequest.request({
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
     * @param tagId Die ID des Items
     * @returns any Item erfolgreich zu ItemSet zugewiesen
     * @throws ApiError
     */
    public assignItemToItemSet(
        itemSetId: number,
        tagId: string,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
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
    public getAssignedItemsForItemSet(
        itemSetId: number,
    ): CancelablePromise<Item> {
        return this.httpRequest.request({
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
    public getAllItemSets1(): CancelablePromise<ItemSet> {
        return this.httpRequest.request({
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
    public deleteItem1(
        itemSetId: number,
    ): CancelablePromise<any> {
        return this.httpRequest.request({
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
