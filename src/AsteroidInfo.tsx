import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./index.css";
import axios from "axios";
import { Card, Button, TextField, Alert, Divider, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

interface AsteroidInfo {
  id: number;
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
}

function AsteroidInfo() {
  const { asteroidId } = useParams<{ asteroidId: string }>();
  console.log(asteroidId);
  const [asteroidInfo, setasteroidInfo] = useState<AsteroidInfo>();
  const navigate = useNavigate();

  function fetchasteroidInfo() {
    console.log("fetch ");
    axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=njkul5KrsHS8DDxMnZJ5RRgqU7CCc8BYM98qbi1H`
      )
      .then((res) => setasteroidInfo(res.data))
      .catch((err) => {
        console.error("Failed in API call", err);
        alert("NO such asteroid");
        navigate("/");
      });
  }
  const handleNav = () => {
    navigate("/");
  };

  useEffect(() => {
    fetchasteroidInfo();
  }, [asteroidId]);

  return (
    <div className="main">
      {asteroidInfo != undefined && (
        <Card
          className="main"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
            p: 4,
            opacity: 0.95,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 10,
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 10,
                textAlign: "left",
              }}
            >
              <Card sx={{ p: 2, backgroundColor: "#d7ccc8" }}>
                <strong data-testid="name">Name : </strong>
                {asteroidInfo.name}
              </Card>

              <Card sx={{ p: 2, backgroundColor: "#d7ccc8" }}>
                <strong data-testid="id">Id : </strong>
                {asteroidInfo.id}
              </Card>
              <Card sx={{ p: 2, backgroundColor: "#d7ccc8" }}>
                <strong data-testid="url">Nasa Url : </strong>
                <Link to={asteroidInfo.nasa_jpl_url}>
                  {asteroidInfo.nasa_jpl_url}
                </Link>
              </Card>
              {asteroidInfo.is_potentially_hazardous_asteroid ? (
                <Alert severity="warning">Dangerous</Alert>
              ) : (
                <Alert severity="success">Not Dangerous</Alert>
              )}
            </div>

            <Button
              data-testid="home"
              variant="contained"
              sx={{ maxWidth: "70%", justifySelf: "center" }}
              size="large"
              onClick={handleNav}
            >
              Home
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

export default AsteroidInfo;
