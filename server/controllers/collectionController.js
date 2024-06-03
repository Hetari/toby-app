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
  try {
    const collections = await Collection.findAll();

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

export { createCollection, getAllCollection };
