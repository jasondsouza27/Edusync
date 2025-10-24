/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k6ovh85jygj08v4")

  collection.createRule = null

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("k6ovh85jygj08v4")

  collection.createRule = "@request.data.id != \"\""

  return dao.saveCollection(collection)
})
