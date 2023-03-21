const express = require("express");
const router = express.Router();
const { getItems, getItem, createItem, updateItem, deleteItem } = require("../controllers/tracks");
const { validatorCreateItem, validatorGetItem } = require("../validators/tracks");
const authMidlleware = require("../middleware/session")
const  customHeader = require("../middleware/customHeader");
const checkRol = require("../middleware/rol");

// TODO http://localhost:3001/api/tracks GET, POST, DELETE, PUT

router.get("/", authMidlleware, getItems);

router.get("/:id", authMidlleware, validatorGetItem, getItem);

router.put("/:id", authMidlleware,  validatorGetItem, validatorCreateItem, updateItem);

router.delete("/:id", authMidlleware, validatorGetItem, deleteItem);

// router.post("/", validatorCreateItem, customHeader, createItem);
router.post("/", authMidlleware, checkRol(['admin','user']), validatorCreateItem, createItem);


module.exports = router;