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

export { createTab };
