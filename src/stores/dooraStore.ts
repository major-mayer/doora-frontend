import { defineStore } from 'pinia'
import { CancelablePromise, ItemControllerService, ItemSetControllerService } from '@/doora-api-client'

interface Item {
  id: string, // Is a string for some reason and the same as the rfidCode
  name: string,
  description: string,
  created: string,
  lastAccessed: string
}

interface Collection {
  id: number,
  name: string,
  alwaysRequired: boolean,
  description: string,
  itemIds: string[]
}


export const useDooraStore = defineStore('items',
  {
    state: () => ({
      items: [
        { id: "0", name: 'Portemonnaie', description: "Das mit den dicken Batzen", created: "2023-06-15T14:53:57.038Z", lastAccessed: "2023-06-15T14:53:57.038Z" },
        { id: "1", name: 'Schlüssel', description: "Haustüre, Garage und Büro", created: "2023-06-15T14:53:57.038Z", lastAccessed: "2023-06-15T14:53:57.038Z" },
        { id: "2", name: 'Wasserflasche', description: null, created: "2023-06-15T14:53:57.038Z", lastAccessed: "2023-06-15T14:53:57.038Z" },
        { id: "3", name: 'Laptop', description: null, created: "2023-06-15T14:53:57.038Z", lastAccessed: "2023-06-15T14:53:57.038Z" },
        { id: "4", name: 'Sportschuhe', description: "Weiße Nikes, Größe 44", created: "2023-06-15T14:53:57.038Z", lastAccessed: "2023-06-15T14:53:57.038Z" },
      ] as Item[],

      collections: [
        {
          id: 0, name: "Uni", itemIds: ["0", "1", "2", "3"], alwaysRequired: false,
        },
        {
          id: 1, name: "Sport", description: "Meine Fußball Sachen", itemIds: ["0", "1", "2", "4"], alwaysRequired: false

        }
      ] as Collection[]
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
        const items = await ItemControllerService.getAllItemSets() // This is correct and downloads Items! 
        console.log(items)

        const collections = await ItemSetControllerService.getAllItemSets1(); // This downloads all Item Sets!
        console.log(collections)
      },

      async addItem(name: string, description: string, rfidCode: string) {
        const response = await ItemControllerService.createItem(name, description, rfidCode, 0);
        this.items.push({
          id: rfidCode, name: response.itemName, description: response.itemDescription, rfidCode: response.tagID, created: response.creationTimestamp, lastAccessed: response.lastAccessedTimestamp
        });
        return id;
      },

      async addCollection(name: string, description: string, itemIds: number[], alwaysRequired: boolean) {
        // First create a new collection /item set
        const response = await ItemSetControllerService.createItemSet(name, description, alwaysRequired);

        // Then add all the required items
        const itemIdPromises: CancelablePromise<any>[] = [];
        itemIds.forEach((itemId) => {
          itemIdPromises.push(ItemSetControllerService.assignItemToItemSet(response.itemSetID, itemId));
        })

        // We don't need the responses. When this doesn't throw, we have successfully added all the items to our new item sets
        await Promise.all(itemIdPromises);

        // Then add it to the local store
        const id = this.collections.length;
        this.collections.push({
          id: response.itemSetID, name: response.itemSetName, description: response.itemSetDescription, itemIds, alwaysRequired: response.alwaysRequired
        });
        return id;
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

        // TODO wait for Marcs new Endpoint to add multiple Items at once
        await ItemSetControllerService.assignItemToItemSet(collectionId, itemId);
        let storeCollectionIndex = this.items.findIndex((collection) => collection.id == updatedCollection.id)
        this.collections[storeCollectionIndex].itemIds.push(itemId);
      }
    }
  })