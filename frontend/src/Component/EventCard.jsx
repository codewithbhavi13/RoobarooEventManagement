import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";

export default function EventCard({ event }) {
  return (
    <Card
      sx={{
        width: 320,
        borderRadius: "18px",
        overflow: "hidden",
        boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
        transition: "0.3s",
        background: "#fff",

        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 12px 30px rgba(0,0,0,0.18)",
        },
      }}
    >
      {/* EVENT IMAGE */}
      <CardMedia
        component="img"
        height="200"
        image={event.image}
        alt={event.title}
      />

      {/* CONTENT */}
      <CardContent>
        {/* TITLE */}
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: "#582F0E",
            mb: 1,
          }}
        >
          {event.title}
        </Typography>

        {/* DESCRIPTION */}
        <Typography
          variant="body2"
          sx={{
            color: "#555",
            mb: 2,
            minHeight: "60px",
          }}
        >
          {event.description}
        </Typography>

        {/* DATE + CATEGORY */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Typography
            sx={{
              fontSize: "0.9rem",
              color: "#936639",
              fontWeight: 600,
            }}
          >
            {new Date(event.date).toLocaleDateString()}
          </Typography>

          <Typography
            sx={{
              fontSize: "0.85rem",
              background: "#F5E6CC",
              color: "#7F4F24",
              px: 1.5,
              py: 0.4,
              borderRadius: "20px",
            }}
          >
            {event.category}
          </Typography>
        </Box>

        {/* BUTTON */}
        <Button
          fullWidth
          variant="contained"
          sx={{
            borderRadius: "30px",
            py: 1,
            fontWeight: 600,
            background:
              "linear-gradient(135deg, #936639 0%, #7F4F24 100%)",

            "&:hover": {
              background:
                "linear-gradient(135deg, #7F4F24 0%, #582F0E 100%)",
            },
          }}
        >
          Register Now
        </Button>
      </CardContent>
    </Card>
  );
}