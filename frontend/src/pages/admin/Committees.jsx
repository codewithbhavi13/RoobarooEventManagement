import {
  Box,
  Typography,
  Paper,
  Stack,
  Chip,
  Divider,
  Button,
} from "@mui/material";
import { useContext, useMemo } from "react";
import { CommitteeContext } from "../../context/Committee";
import { UserContext } from "../../context/User";

export default function Committees() {
  const { members, createReqForHead } = useContext(CommitteeContext);
  const { user } = useContext(UserContext);

  const isAdmin = user?.role === "admin";

  const normalize = (str) => str?.toLowerCase().replace(/\s+/g, "");

  // ✅ Committees
  const userCommittees = useMemo(() => {
    if (!members) return [];

    if (isAdmin) {
      return [...new Set(members.flatMap((m) => m.committees || []))];
    }

    return user?.committees || [];
  }, [members, user, isAdmin]);

  // ✅ Filter members
  const filteredMembers = useMemo(() => {
    if (!members) return [];

    if (isAdmin) return members;

    return members.filter((m) =>
      m.committees?.some((c) => userCommittees.includes(c)),
    );
  }, [members, userCommittees, isAdmin]);

  // ✅ Group + sort
  const grouped = useMemo(() => {
    const result = {};

    userCommittees.forEach((committee) => {
      result[committee] = filteredMembers
        .filter((m) => m.committees?.includes(committee))
        .sort((a, b) => {
          const aHead =
            normalize(a.role) === `${normalize(committee)}_committee_head`;

          const bHead =
            normalize(b.role) === `${normalize(committee)}_committee_head`;

          return bHead - aHead;
        });
    });

    return result;
  }, [userCommittees, filteredMembers]);

  // ❗ Empty handler (you will implement API later)
  const handleRequestHead = (committee) => {
    console.log("Request for head:", committee);
    console.log("Running");
  };

  return (
    <Box
      sx={{
        p: 3,
        background: "#F5E6CC",
        minHeight: "100vh",
      }}
    >
      <Typography
        variant="h4"
        sx={{ fontWeight: 700, color: "#582F0E", mb: 1 }}
      >
        Committees
      </Typography>

      {isAdmin && (
        <Typography sx={{ mb: 3, color: "#7F4F24" }}>
          Viewing all committees (Admin)
        </Typography>
      )}

      {userCommittees.length === 0 ? (
        <Typography sx={{ color: "#7F4F24" }}>No committees found.</Typography>
      ) : (
        userCommittees.map((committee) => {
          const membersList = grouped[committee] || [];

          // ✅ Count heads in this committee
          const headCount = membersList.filter(
            (m) =>
              normalize(m.role) === `${normalize(committee)}_committee_head`,
          ).length;

          // ✅ Conditions for showing button
          const isMember = user?.role === "member";
          const belongsToCommittee = user?.committees?.includes(committee);
          const canRequest = isMember && belongsToCommittee && headCount < 2;

          return (
            <Paper
              key={committee}
              elevation={4}
              sx={{ p: 3, mb: 3, borderRadius: "15px" }}
            >
              {/* Header Row */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 600, color: "#7F4F24" }}
                >
                  {committee}
                </Typography>

                {/* ✅ Request Button */}

                {canRequest && (
                  <>
                    <Button
                      type="button"
                      variant="contained"
                      onClick={() => console.log("first")}
                      sx={{
                        background: "#936639",
                        color: "#F5E6CC",
                        textTransform: "none",
                        "&:hover": {
                          background: "#7F4F24",
                        },
                      }}
                    >
                      Request Head
                    </Button>
                  </>
                )}
              </Box>

              <Divider sx={{ mb: 2 }} />

              {/* Members */}
              <Stack spacing={1.5}>
                {membersList.length > 0 ? (
                  membersList.map((member) => {
                    const isHead =
                      normalize(member.role) ===
                      `${normalize(committee)}_committee_head`;

                    return (
                      <Box
                        key={member._id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          p: 1.5,
                          borderRadius: "10px",
                          background: isHead ? "#E6CCB2" : "#FFF9F0",
                          "&:hover": { background: "#DDB892" },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: isHead ? 600 : 400,
                            color: "#582F0E",
                          }}
                        >
                          {member.name}
                        </Typography>

                        <Stack direction="row" spacing={2} alignItems="center">
                          <Typography sx={{ color: "#7F4F24" }}>
                            {member.phone}
                          </Typography>

                          {isHead && (
                            <Chip
                              label="Head"
                              size="small"
                              sx={{
                                background: "#936639",
                                color: "#F5E6CC",
                              }}
                            />
                          )}
                        </Stack>
                      </Box>
                    );
                  })
                ) : (
                  <Typography sx={{ color: "#7F4F24" }}>
                    No members in this committee.
                  </Typography>
                )}
              </Stack>
            </Paper>
          );
        })
      )}
    </Box>
  );
}
