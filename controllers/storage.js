const fs = require("fs");
const { matchedData } = require("express-validator");
const { storageModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

const getItems = async (req, res) => {
    try{
      const data = await storageModel.find({});
      res.send({data});
    } catch(e) {
        handleHttpError(res,"ERROR_GET_ITEMS");
    }

};
const getItem =  async (req, res) => {

    try{
        const { id } = matchedData(req);
        const data = await storageModel.findById(id);

        res.send({data});
      } catch(e) {
          handleHttpError(res,"ERROR_GET_ITEM"+e);
      }
};

const createItem = async (req, res) => {
    const { body, file } = req;
   //  const data = ["hello", "body"];
    
   console.log(file);
    const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`,
    };

    const data = await storageModel.create(fileData);
    res.status(201);
    res.send({ data });
};


const deleteItem = async (req, res) => {
    try{
        const { id } = matchedData(req);
        const dataFile = await storageModel.findById(id);
        const deleteResponse = await storageModel.delete({_id: id })
        const {filename} = dataFile;
        const filePath = `${MEDIA_PATH}/${filename}`;
        //fs.unlinkSync(filePath);

        const data = {
            filePath,
            deleted: deleteResponse.matchedCount,
        }
        res.send({data});

      } catch(e) {
          handleHttpError(res,"ERROR_DELETE_ITEM"+e);
      }

};

module.exports = { getItems, getItem, createItem, deleteItem };