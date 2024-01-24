import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";
import { Card, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

function AsteroidSearch() {
  const [searchTerm, setSearchTerm] = useState("");

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("inside handle search");
    setLoading1(true);
    axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/neo/${searchTerm}?api_key=njkul5KrsHS8DDxMnZJ5RRgqU7CCc8BYM98qbi1H`
      )
      .then(() => {
        navigate(`/asteroid/${searchTerm}`);
        setLoading1(false);
      })
      .catch(() => {
        setLoading1(false);
        alert("no such asteroid");
      });
  };

  const handleRandom = () => {
    console.log("clicked the random button");
    setLoading(true);
    axios
      .get(
        "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=njkul5KrsHS8DDxMnZJ5RRgqU7CCc8BYM98qbi1H"
      )
      .then((res) => {
        const randomIndex = Math.floor(
          Math.random() * res.data.near_earth_objects.length
        );
        const randomAsteroidId = res.data.near_earth_objects[randomIndex].id;
        setLoading(false);
        navigate(`asteroid/${randomAsteroidId}`);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <div className="main">
      <Card
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          alignItems: "center",
          p: 4,
        }}
      >
        <Typography variant="h4" gutterBottom>
          Search Asteroids
        </Typography>

        <form
          onSubmit={handleSearch}
          style={{
            display: "flex",
            gap: 10,
          }}
        >
          <TextField
            type="number"
            variant="outlined"
            label="Enter an asteroid Id"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {!loading1 ? (
            <Button
              variant="contained"
              type="submit"
              disabled={!searchTerm}
              size="small"
            >
              Search
            </Button>
          ) : (
            <CircularProgress />
          )}
        </form>

        {!loading ? (
          <Button
            data-testid="random-btn"
            variant="contained"
            onClick={handleRandom}
            sx={{ maxWidth: "70%", justifySelf: "center" }}
            size="large"
            color="success"
          >
            Random Button
          </Button>
        ) : (
          <CircularProgress />
        )}
      </Card>
    </div>
  );
}

export default AsteroidSearch;
