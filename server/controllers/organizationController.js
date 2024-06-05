import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import Organization from '../models/organizations.js';

const createOrganization = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Invalid title',
    });
  }

  try {
    const organization = await Organization.create({
      title,
      creatorId: req.user.id,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      data: organization,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllOrganizations = async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;

  try {
    const organization = await Organization.findAll({
      where: {
        ...(id ? { id: id } : {}),
        creatorId: userId,
      },
    });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      data: organization,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteOrganization = async (req, res) => {
  const { id } = req.params;
  try {
    const organization = await Organization.destroy({
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

const updateOrganization = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  try {
    const organization = await Organization.findOne({
      where: { id },
    });
    organization.title = title;
    await organization.save();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      data: organization,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

export {
  createOrganization,
  getAllOrganizations,
  deleteOrganization,
  updateOrganization,
};
