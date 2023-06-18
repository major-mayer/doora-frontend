/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from '../models/Item';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class ItemControllerService {

    /**
     * Set iconID by tag ID
     * @param tagId
     * @param iconId
     * @returns string IconID successfully set
     * @throws ApiError
     */
    public static setIconIdForItem(
        tagId: string,
        iconId: number,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/setIconIDForItem/{tagID}',
            path: {
                'tagID': tagId,
            },
            query: {
                'iconID': iconId,
            },
            errors: {
                404: `Item not found`,
            },
        });
    }

    /**
     * Rename an item by tag ID
     * @param tagId
     * @param newName
     * @returns string Item renamed successfully
     * @throws ApiError
     */
    public static renameItem(
        tagId: string,
        newName: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/renameItem/{tagID}',
            path: {
                'tagID': tagId,
            },
            query: {
                'newName': newName,
            },
            errors: {
                404: `Item not found`,
            },
        });
    }

    /**
     * Edit an item descriptio  by tag ID
     * @param tagId
     * @param newDescription
     * @returns string Item description edited successfully
     * @throws ApiError
     */
    public static editItemDescription(
        tagId: string,
        newDescription: string,
    ): CancelablePromise<string> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/editItemDescription/{tagID}',
            path: {
                'tagID': tagId,
            },
            query: {
                'newDescription': newDescription,
            },
            errors: {
                404: `Item not found`,
            },
        });
    }

    /**
     * Neues Item erstellen
     * @param itemName Der Name des Items
     * @param itemDescription Die Beschreibung des Items
     * @param tagId Die ID des Tags
     * @param iconId Die ID des Icons
     * @returns Item Item erfolgreich erstellt
     * @throws ApiError
     */
    public static createItem(
        itemName: string,
        itemDescription: string,
        tagId: string,
        iconId: number,
    ): CancelablePromise<Item> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/createItem',
            query: {
                'itemName': itemName,
                'itemDescription': itemDescription,
                'tagID': tagId,
                'iconID': iconId,
            },
            errors: {
                400: `Ungueltige Anforderung`,
            },
        });
    }

    /**
     * Ueberpruefen, ob ein Item fehlt
     * @param tagIDs Ein Array mit den IDs der Items
     * @returns boolean Erfolgreich ueberprueft
     * @throws ApiError
     */
    public static isItemMissing(
        tagIDs: Array<string>,
    ): CancelablePromise<boolean> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/isItemMissing',
            query: {
                'tagIDs': tagIDs,
            },
            errors: {
                400: `Ungueltige Anforderung`,
            },
        });
    }

    /**
     * Alle Items abrufen
     * @returns Item Erfolgreich alle Items abgerufen
     * @throws ApiError
     */
    public static getAllItemSets(): CancelablePromise<Item> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/getAllItems',
        });
    }

    /**
     * Item loeschen
     * @param tagId Die ID des Items
     * @returns any Item erfolgreich geloescht
     * @throws ApiError
     */
    public static deleteItem(
        tagId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/deleteItem',
            query: {
                'tagID': tagId,
            },
            errors: {
                400: `Item nicht gefunden oder Item ist noch einem Benutzer zugewiesen`,
                404: `Ungueltige Anforderung`,
            },
        });
    }

}
