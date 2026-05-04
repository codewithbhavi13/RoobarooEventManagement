import User from "../models/User.js";

const committeeToRole = {
  Technical: "technical_committee_head",
  Creativity: "creativity_committee_head",
  "Social Media": "socialmedia_committee_head",
};

export const requestForCommitteeHead = async (req, res) => {
  try {
    const { committee } = req.body;
    const userId = req.user.id;

    // 1. Validate committee
    const roleToAssign = committeeToRole[committee];
    if (!roleToAssign) {
      return res.status(400).json({ message: "Invalid committee" });
    }

    // 2. Check if user belongs to this committee (recommended)
    const existingUser = await User.findById(userId);
    if (!existingUser.committees.includes(committee)) {
      return res.status(400).json({
        message: "You are not part of this committee",
      });
    }

    // 3. Count assigned heads for this specific committee
    const count = await User.countDocuments({
      role: roleToAssign,
    });

    // 4. Limit check (max 2)
    if (count >= 2) {
      return res.status(400).json({
        message: "Already 2 committee heads assigned for this committee",
      });
    }

    // 5. Save request
    const user = await User.findByIdAndUpdate(
      userId,
      { req: roleToAssign },
      { new: true },
    );

    res.status(200).json({
      message: "Request sent successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const roleToCommittee = {
  technical_committee_head: "Technical",
  creativity_committee_head: "Creativity",
  socialmedia_committee_head: "Social Media",
};

export const acceptReqForCommitteeHead = async (req, res) => {
  try {
    const { userId, ans } = req.body;

    // 1. Get user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Check if request exists
    if (!user.req) {
      return res.status(400).json({
        message: "No request found for this user",
      });
    }

    // 🔥 NEW: If rejected → just clear req
    if (ans === false) {
      user.req = undefined;
      await user.save();

      return res.status(200).json({
        message: "Request rejected successfully",
        user,
      });
    }

    // If ans is not true or false
    if (ans !== true) {
      return res.status(400).json({
        message: "Invalid value for ans (must be true or false)",
      });
    }

    const requestedRole = user.req;

    // 3. Check if already a committee head
    const committeeHeadRoles = [
      "technical_committee_head",
      "creativity_committee_head",
      "socialmedia_committee_head",
    ];

    if (committeeHeadRoles.includes(user.role)) {
      return res.status(400).json({
        message: "User is already a committee head",
      });
    }

    // 4. Validate committee membership
    const committee = roleToCommittee[requestedRole];
    if (!user.committees.includes(committee)) {
      return res.status(400).json({
        message: "User does not belong to this committee",
      });
    }

    // 5. Check max 2 heads constraint
    const count = await User.countDocuments({
      role: requestedRole,
    });

    if (count >= 2) {
      return res.status(400).json({
        message: "Already 2 committee heads assigned for this committee",
      });
    }

    // 6. Promote user
    user.role = requestedRole;
    user.req = undefined;

    await user.save();

    res.status(200).json({
      message: "User promoted to committee head successfully",
      user,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllMembers = async (req, res) => {
  try {
    const members = await User.find(
      {
        role: { $nin: ["admin", "event_head"] }, // exclude both
      },
      "name email phone department committees role rollNo",
    );

    res.status(200).json({
      success: true,
      count: members.length,
      members,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
