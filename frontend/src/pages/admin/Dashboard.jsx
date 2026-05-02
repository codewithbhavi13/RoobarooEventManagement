import { Grid, Paper, Typography, Box } from "@mui/material";

export default function Dashboard() {
  const cards = [
    { title: "Total Events", value: 10 },
    { title: "Participants", value: 120 },
    { title: "Committees", value: 5 },
    { title: "Tasks", value: 25 },
  ];

  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}> 
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Dashboard
      </Typography>

      <Grid container spacing={3}>
        {cards.map((card, i) => (
          /* xs={12}: Full width on mobile
             sm={6}:  Two cards per row on tablets
             md={3}:  Four cards per row on desktop
          */
          <Grid item xs={12} sm={6} md={3} key={i}>
            <Paper 
              elevation={2}
              sx={{ 
                p: 3, 
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center", // Optional: centers text for better mobile look
                textAlign: "center",
                minHeight: "120px",
                justifyContent: "center"
              }}
            >
              <Typography variant="subtitle1" color="text.secondary" sx={{ fontWeight: 500 }}>
                {card.title}
              </Typography>
              <Typography variant="h4" sx={{ mt: 1, fontWeight: 700, color: "#582F0E" }}>
                {card.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}