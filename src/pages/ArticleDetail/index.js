import React from "react";
import { Container, Card, Paper, TextField, Button } from "@material-ui/core";

export default class ArticleDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      article: {},
      comment: "123",
    };
  }

  componentDidMount() {
    this.fetchArticle();
  }

  fetchArticle() {
    fetch(`http://localhost:3000/articles/${this.props.match.params.id}`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({ article: res });
      })
      .catch((e) => {
        alert("Get Article detail failed");
      });
  }

  commitComment() {
    fetch(
      `http://localhost:3000/articles/${this.props.match.params.id}/comments`,
      {
        method: "POST",
        body: JSON.stringify({ comment: this.state.comment }),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        this.setState({ comment: "" });
        this.fetchArticle();
      })
      .catch((e) => {
        alert("Commit comments failed");
      });
  }

  render() {
    const { article } = this.state;
    return (
      <div>
        <Container maxWidth="md">
          <Card>
            <h1>{article.title}</h1>
            <h5>{article.subtitle}</h5>
            <span>
              ---{article.author} at {article.created_at}
            </span>
            <p>{article.content}</p>
          </Card>
          <Paper>Comment List</Paper>
          {article && article.comments
            ? article.comments.map((item) => (
                <Card>
                  <p>{item}</p>
                </Card>
              ))
            : null}
          <TextField
            style={{ marginTop: 16 }}
            value={this.state.comment}
            placeholder="Please enter your comment"
            fullWidth
            onChange={(e) => {
              this.setState({ comment: e.target.value });
            }}
          ></TextField>
          <Button
            style={{ float: "right", marginTop: 16 }}
            color="primary"
            onClick={this.commitComment.bind(this)}
          >
            Commit
          </Button>
        </Container>
      </div>
    );
  }
}
