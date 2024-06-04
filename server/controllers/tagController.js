import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import Tag from '../models/tags.js';
import Collection from '../models/collections.js';

const createTag = async (req, res) => {
  const { title, url, collection } = req.body;
  if (!title || title.trim().length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Invalid title',
    });
  }

  try {
    const tag = await Tag.create({
      title,
      userId: req.user.id,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Tag created successfully',
      data: tag,
    });
  } catch (error) {
    return res
      .status(
        error.message.startsWith('Validation error')
          ? StatusCodes.BAD_REQUEST
          : StatusCodes.INTERNAL_SERVER_ERROR
      )
      .json({
        success: false,
        message: 'Error creating tab',
        error: error.message,
      });
  }
};

const getAllTag = async (req, res) => {
  const id = req.user.id;

  try {
    const tag = await Tag.findAll({
      where: {
        userId: id,
      },

      include: [
        {
          model: Collection,
        },
      ],
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      data: tag,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTag = async (req, res) => {
  const { id } = req.params;

  try {
    const tag = await Tag.destroy({
      where: { id },
    });

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

const updateTagPut = async (req, res) => {
  const { id } = req.params;
  const { title, url, collectionId } = req.body;

  try {
    const tag = await Tag.findOne({
      where: { id },
    });

    if (!tag) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: ReasonPhrases.NOT_FOUND,
      });
    }

    tag.title = title;
    await tag.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      data: tag,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export { createTag, getAllTag, deleteTag, updateTagPut };
