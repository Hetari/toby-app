import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import Site from '../models/sites.js';
import Collection from '../models/collections.js';

const createTab = async (req, res) => {
  const { title, url, collection } = req.body;

  if (!title || title.trim().length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Invalid title',
    });
  }

  try {
    // TODO: add description, customTitle, customDescription
    const site = await Site.create({
      title,
      collectionId: collection,
      url,
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Tab created successfully',
      data: site,
    });
  } catch (error) {
    console.log();
    console.log();
    console.log();
    console.log();
    console.error(error);

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

const getAllTab = async (req, res) => {
  const id = req.user.id;
  // TODO: fix the query
  try {
    const site = await Site.findAll({
      include: [
        {
          ...(id ? { id: id } : {}),
          model: Collection,
          where: {
            userId: req.user.id,
          },
        },
      ],
    });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      data: site,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTab = async (req, res) => {
  const { id } = req.params;

  try {
    const site = await Site.destroy({
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

const updateTabPut = async (req, res) => {
  const { id } = req.params;
  const { title, url, collectionId } = req.body;

  try {
    const site = await Site.findOne({
      where: { id },
    });

    if (!site) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: ReasonPhrases.NOT_FOUND,
      });
    }

    site.title = title;
    site.url = url;
    site.collectionId = collectionId;

    await site.save();

    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      data: site,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export { createTab, getAllTab, deleteTab, updateTabPut };
