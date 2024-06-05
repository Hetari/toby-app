import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { v4 as uuidv4 } from 'uuid';
import { Organization, OrganizationMember } from '../models/organizations.js';

const createOrganization = async (req, res) => {
  const { title } = req.body;
  if (!title) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Invalid title',
    });
  }

  const uuid = uuidv4();
  try {
    const organization = await Organization.create({
      title,
      joinCode: uuid,
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

    const memberOf = await OrganizationMember.findAll({
      include: [
        {
          model: Organization,
        },
      ],
      where: {
        userId,
      },
    });

    // const data = [...organization, ...memberOf];
    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      data: {
        owner: organization,
        member: memberOf,
      },
    });
  } catch (error) {
    console.error(error.message);
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

const joinOrganization = async (req, res) => {
  const { string } = req.params;

  try {
    // Find organization by join code
    const organizationRoom = await Organization.findOne({
      where: { joinCode: string },
    });

    if (!organizationRoom) {
      return res.status(StatusCodes.NOT_FOUND).json({
        success: false,
        message: ReasonPhrases.NOT_FOUND,
      });
    }

    const userId = req.user.id;
    if (organizationRoom.creatorId == userId) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: 'You cannot join your own organization',
      });
    }

    // Check if user is already a member
    const existingMembership = await OrganizationMember.findOne({
      userId,
      organizationId: organizationRoom.id,
    });

    if (!existingMembership) {
      // Create a new membership entry
      await OrganizationMember.create({
        userId,
        organizationId: organizationRoom.id,
      });
    }

    return res.status(StatusCodes.OK).json({
      success: true,
      message: ReasonPhrases.OK,
      data: organizationRoom,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: error.message,
    });
  }
};

const leaveRoom = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  console.log(id, userId);
  try {
    const organization = await OrganizationMember.destroy({
      where: { userId, organizationId: id },
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

export {
  createOrganization,
  getAllOrganizations,
  deleteOrganization,
  updateOrganization,
  joinOrganization,
  leaveRoom,
};
