import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import Collection from '../models/collections.js';

// TODO: add space logic
const createCollection = async (req, res) => {
  const { title } = req.body;

  if (!title || title.trim().length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Invalid title',
    });
  }

  try {
    const collection = await Collection.create({
      title,
      userId: req.user.id,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: ReasonPhrases.CREATED,
      data: collection,
    });
  } catch (error) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllCollection = async (req, res) => {
  const id = req.user.id;

  try {
    const collections = await Collection.findAll({
      where: {
        ...(id ? { id: id } : {}),
        userId: req.user.id,
      },
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      data: collections,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCollection = async (req, res) => {
  const { id } = req.params;

  try {
    const collection = await Collection.findOne({
      where: { id, userId: req.user.id },
    });
    if (!collection) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: ReasonPhrases.NOT_FOUND,
      });
    }
    await collection.destroy();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCollectionPatch = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  try {
    const collection = await Collection.findOne({
      where: { id },
    });

    console.log('collection: ', collection);
    console.log();
    console.log();

    if (!collection) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: ReasonPhrases.NOT_FOUND,
      });
    }

    if (collection.userId !== req.user.id) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        success: false,
        message: ReasonPhrases.UNAUTHORIZED,
      });
    }

    collection.title = title;
    await collection.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      data: collection,
    });
  } catch (error) {}
};

export {
  createCollection,
  getAllCollection,
  deleteCollection,
  updateCollectionPatch,
};
