import React from "react";
import {
  Button,
  Container,
  Card,
  CardActions,
  Grid,
  TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";

class Articles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [
        {
          title: "title",
          subtitle: "subtitle",
        },
      ],
      search_text: "",
    };
  }

  fetchAriticles() {
    fetch(
      `http://localhost:3000/articles?search_text=${this.state.search_text}`
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({ articles: res });
      })
      .catch((e) => {
        alert("Get Article list failed");
      });
  }

  componentDidMount() {
    this.fetchAriticles();
  }

  render() {
    return (
      <div>
        <Container maxWidth="md">
          <Card style={{ padding: "20px" }}>
            <Grid container>
              <Grid item xs={6}>
                <TextField
                  placeholder="Search contents or details"
                  value={this.state.earch_text}
                  onChange={(e) => {
                    this.setState({ search_text: e.target.value });
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  color="primary"
                  variant="contained"
                  onClick={this.fetchAriticles.bind(this)}
                >
                  Search!
                </Button>
              </Grid>
            </Grid>
          </Card>
          {this.state.articles.length
            ? this.state.articles.map((item) => (
                <Card style={{ padding: "16px" }} key={item.id}>
                  <p>{item.title}</p>
                  <span>{item.subtitle}</span>
                  <CardActions>
                    <Link to={`articles/${item.id}`}>
                      <Button size="small">Learn More</Button>
                    </Link>
                  </CardActions>
                </Card>
              ))
            : null}
        </Container>
      </div>
    );
  }
}

export default Articles;
