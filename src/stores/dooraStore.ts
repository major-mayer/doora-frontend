import { defineStore } from 'pinia'
import { CancelablePromise, Item, ItemControllerService, ItemSet, ItemSetControllerService } from '@/doora-api-client'

export interface LocalItem {
  id: string, // Is a string for some reason and the same as the rfidCode
  name: string,
  description: string,
  created: string,
  lastAccessed: string
}

export interface LocalCollection {
  id: number,
  name: string,
  alwaysRequired: boolean,
  description: string,
  itemIds: string[]
}


export const useDooraStore = defineStore('items',
  {
    state: () => ({
      items: [] as LocalItem[],

      collections: [] as LocalCollection[],

      initFinished: false
    }),

    getters: {
      getItemById: (state) => {
        return (id: string) => state.items.find((item) => item.id === id)
      },
      getItemsForCollectionId: (state) => {
        return (id: number) => {
          const itemIds = state.collections.find((collection) => collection.id === id)?.itemIds

          return state.items.filter((item) => itemIds?.includes(item.id));
        }
      },
      getCollectionById: (state) => {
        return (id: number) => state.collections.find((collection) => collection.id === id)
      }
    },

    actions: {
      async initData() {
        const serverItems = await ItemControllerService.getAllItems();
        this.items = serverItems.map(item => {
          // We need to map the item structure and property naming to our own interface
          return {
            id: item.tagID,
            name: item.itemName,
            created: item.creationTimestamp,
            description: item.itemDescription,
            lastAccessed: item.lastAccessedTimestamp
          }
        })

        const serverCollections = await ItemSetControllerService.getAllItemSets();
        this.collections = serverCollections.map(collection => {
          // Same for collections
          return {
            id: collection.itemSetID,
            name: collection.itemSetName,
            alwaysRequired: collection.alwaysRequired,
            description: collection.itemSetDescription,
            itemIds: collection.assignedItems?.map(item => item.tagID)
          }
        })

        this.initFinished = true;
        console.log("Downloaded store values")

      },

      async addItem(name: string, description: string, rfidCode: string) {
        const response = await ItemControllerService.createItem(name, description, rfidCode, 0);
        this.items.push({
          id: rfidCode, name: response.itemName, description: response.itemDescription, rfidCode: response.tagID, created: response.creationTimestamp, lastAccessed: response.lastAccessedTimestamp
        });
        return rfidCode;
      },

      async addCollection(name: string, description: string, itemIds: string[], alwaysRequired: boolean) {
        // First create a new collection /item set
        const response = await ItemSetControllerService.createItemSet(name, description, alwaysRequired);

        // Then add all the required items
        if (itemIds.length !== 0) {
          // The API doesn't handle the case when no item is added
          await ItemSetControllerService.assignMultipleItemsToItemSet(response.itemSetID, itemIds, false);
        }

        // Then add it to the local store
        this.collections.push({
          id: response.itemSetID, name: response.itemSetName, description: response.itemSetDescription, itemIds, alwaysRequired: response.alwaysRequired
        });
        return response.itemSetID;
      },

      async updateItem(itemId: string, newItemName: string | undefined, newItemDescription: string | undefined) {
        let storeItemIndex = this.items.findIndex((item) => item.id == itemId)

        if (newItemName) {
          await ItemControllerService.renameItem(itemId, newItemName);
          this.items[storeItemIndex].name = newItemName;

        }
        if (newItemDescription) {
          await ItemControllerService.editItemDescription(itemId, newItemDescription);
          this.items[storeItemIndex].description = newItemDescription;
        }
      },

      async addItemToCollection(collectionId: number, itemId: string) {
        await ItemSetControllerService.assignItemToItemSet(collectionId, itemId);
        let storeCollectionIndex = this.collections.findIndex((collection) => collection.id == collectionId)
        this.collections[storeCollectionIndex].itemIds.push(itemId);
      },

      async removeItemFromCollection(collectionId: number, itemId: string) {
        await ItemSetControllerService.removeItemFromItemSet(collectionId, itemId);
        let storeCollectionIndex = this.collections.findIndex((collection) => collection.id == collectionId)
        let itemIdIndex = this.collections[storeCollectionIndex].itemIds.findIndex((item) => item == itemId)
        this.collections[storeCollectionIndex].itemIds.splice(itemIdIndex, 1);
      },

      async updateCollection(collectionId: number,
        newCollectionName: string | undefined,
        newCollectionDescription: string | undefined,
        newAlwaysRequiredFlag: boolean | undefined,
        newItemIds: string[] | undefined
      ) {
        let storeCollectionIndex = this.collections.findIndex((collection) => collection.id == collectionId);

        if (newCollectionName) {
          await ItemSetControllerService.renameItemSet(collectionId, newCollectionName);
          this.collections[storeCollectionIndex].name = newCollectionName;
        }

        if (newCollectionDescription) {
          await ItemSetControllerService.editItemSetDescription(collectionId, newCollectionDescription);
          this.collections[storeCollectionIndex].description = newCollectionDescription;
        }

        if (newItemIds) {
          await ItemSetControllerService.assignMultipleItemsToItemSet(collectionId, newItemIds, true);
          this.collections[storeCollectionIndex].itemIds = newItemIds;
        }
      },

    }
  })