import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
} from "@mui/material";

export default function ParticipantForm() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #582F0E 0%, #7F4F24 50%, #936639 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 3,
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: 700,
          borderRadius: "25px",
          p: 5,
          background: "rgba(255,255,255,0.06)",
          backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
        }}
      >
        {/* TITLE */}
        <Typography
          align="center"
          sx={{
            color: "#F5E6CC",
            fontSize: "2.4rem",
            fontWeight: 700,
            mb: 1,
            letterSpacing: "1px",
            fontFamily: "'Times New Roman', serif",
          }}
        >
          RooBaRoo Registration
        </Typography>

        <Typography
          align="center"
          sx={{
            color: "#DDB892",
            mb: 4,
            fontSize: "1rem",
          }}
        >
          Fill all details carefully
        </Typography>

        {/* FORM */}
        <Box
  component="form"
  sx={{
    display: "flex",
    flexDirection: "column",
    gap: 3,
  }}
>
          <TextField
          required
            label="Full Name"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              style: { color: "#DDB892" },
            }}
            sx={inputStyle}
          />

          <TextField
          required
            label="College Name"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              style: { color: "#DDB892" },
            }}
            sx={inputStyle}
          />

          <TextField
          required
            label="Phone Number"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              style: { color: "#DDB892" },
            }}
            sx={inputStyle}
          />

          <TextField
          required
            label="Email Address"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              style: { color: "#DDB892" },
            }}
            sx={inputStyle}
          />

          <TextField
            label="Team Name (Optional)"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              style: { color: "#DDB892" },
            }}
            sx={inputStyle}
          />

          {/* FILE UPLOAD */}
          <Box>
<Typography
  sx={{
    color: "#F5E6CC",
    mb: 1,
    fontWeight: 600,
  }}
>
  Upload College ID
</Typography>

<Typography
  sx={{
    color: "#E6CCB2",
    fontSize: "0.9rem",
    lineHeight: 1.7,
    mb: 2,
  }}
>
  Solo Event : If it is a solo event then upload your college ID card.
  <br />
  Team Event : If it is an  team event, upload ONE combined PDF
  containing IDs of all members.
</Typography>

            <Button
              variant="outlined"
              component="label"
              sx={{
                borderColor: "#DDB892",
                color: "#F5E6CC",
                px: 3,
                py: 1,
                borderRadius: "12px",
                "&:hover": {
                  borderColor: "#F5E6CC",
                  background: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Choose File
              <input hidden type="file" required/>
            </Button>
          </Box>

          {/* PAYMENT SECTION */}
          <Box
            sx={{
              mt: 2,
              p: 3,
              borderRadius: "20px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.1)",
              textAlign: "center",
            }}
          >
            <Typography
              sx={{
                color: "#F5E6CC",
                fontSize: "1.4rem",
                fontWeight: 700,
                mb: 2,
              }}
            >
              Registration Payment
            </Typography>

            <Box
              component="img"
              src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay"
              alt="QR"
              sx={{
                width: 220,
                height: 220,
                borderRadius: "20px",
                mb: 2,
                border: "5px solid #DDB892",
              }}
            />

            <Typography
            required
              sx={{
                color: "#F5E6CC",
                fontWeight: 700,
                fontSize: "1.1rem",
              }}
            >
              UPI ID:
            </Typography>

            <Typography
              sx={{
                color: "#DDB892",
                fontSize: "1rem",
                mb: 1,
              }}
            >
              roobaroo@oksbi
            </Typography>

            <Typography
              sx={{
                color: "#E6CCB2",
                fontSize: "0.9rem",
              }}
            >
              Scan QR using any UPI app
            </Typography>
          </Box>

          <TextField
          required
            label="Payment ID / UTR Number"
            variant="outlined"
            fullWidth
            InputLabelProps={{
              style: { color: "#DDB892" },
            }}
            sx={inputStyle}
          />

          {/* PAYMENT SCREENSHOT */}
          <Box>
            <Typography
            required
              sx={{
                color: "#F5E6CC",
                mb: 1,
                fontWeight: 600,
              }}
            >
              Upload Payment Screenshot
            </Typography>

            <Button
              variant="outlined"
              component="label"
              sx={{
                borderColor: "#DDB892",
                color: "#F5E6CC",
                px: 3,
                py: 1,
                borderRadius: "12px",
                "&:hover": {
                  borderColor: "#F5E6CC",
                  background: "rgba(255,255,255,0.08)",
                },
              }}
            >
              Choose File
              <input hidden type="file" required />
            </Button>
          </Box>

          {/* SUBMIT */}
          <Button
          type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: "14px",
              background:
                "linear-gradient(135deg, #DDB892 0%, #B08968 100%)",
              color: "#582F0E",
              fontWeight: 700,
              fontSize: "1rem",
              letterSpacing: "1px",
              boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
              transition: "0.3s",
              "&:hover": {
                transform: "translateY(-3px)",
                background:
                  "linear-gradient(135deg, #E6CCB2 0%, #DDB892 100%)",
              },
            }}
          >
            Submit Registration
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

/* INPUT STYLE */
const inputStyle = {
  "& .MuiOutlinedInput-root": {
    color: "#F5E6CC",
    borderRadius: "14px",
    background: "rgba(255,255,255,0.05)",

    "& fieldset": {
      borderColor: "rgba(221,184,146,0.4)",
    },

    "&:hover fieldset": {
      borderColor: "#DDB892",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#F5E6CC",
    },
  },

  "& .MuiInputBase-input::placeholder": {
    color: "#E6CCB2",
  },
};