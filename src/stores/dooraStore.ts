import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface Item {
  id: number,
  name: string,
  description: string | null,
  rfidCode: string | null
}

interface Collection {
  id: number,
  name: string,
  itemIds: number[]
}


export const useDooraStore = defineStore('items',
  {
    state: () => ({
      items: [
        { id: 0, name: 'Portemonnaie', description: "Das mit den dicken Batzen", "rfidCode": "abc123" },
        { id: 1, name: 'Schlüssel', description: "Haustüre, Garage und Büro", "rfidCode": "abc123" },
        { id: 2, name: 'Wasserflasche', description: null, "rfidCode": "abc123" },
        { id: 3, name: 'Laptop', description: null, "rfidCode": "abc123" },
        { id: 4, name: 'Sportschuhe', description: "Weiße Nikes, Größe 44", "rfidCode": "abc123" },
      ] as Item[],

      collections: [
        {
          id: 0, name: "Uni", itemIds: [0, 1, 2, 3],
        },
        {
          id: 1, name: "Sport", itemIds: [0, 1, 2, 4]

        }
      ] as Collection[]
    }),

    getters: {
      getItemById: (state) => {
        return (id: number) => state.items.find((item) => item.id === id)
      },
      getItemsForCollectionId: (state) => {
        return (id: number) => {
          const itemIds = state.collections.find((collection) => collection.id === id)?.itemIds

          return state.items.filter((item) => itemIds?.includes(item.id));
        }
      }
    },

    actions: {
      addItem(id: number, name: string, description: string | null, rfidCode: string | null) {
        this.items.push({
          id, name, description, rfidCode
        });
      },
      updateItem(updatedItem: Item) {
        // fetch(  update api)
        let storeItemIndex = this.items.findIndex((item) => item.id == updatedItem.id)
        this.items[storeItemIndex] = updatedItem
      }
    }
  })