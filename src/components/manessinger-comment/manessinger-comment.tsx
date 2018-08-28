import {Component, Prop, State} from '@stencil/core';

@Component({
  tag: 'manessinger-comment',
  styleUrl: 'manessinger-comment.scss',
  shadow: true
})
export class ManessingerComment {

  @State() userNameValue: string;
  @State() emailValue: string;
  @State() websiteValue: string;
  @State() commentValue: string;

  @Prop({ context: 'window' }) private window: Window;

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      "attach_to": this.window.location.hash.substr(1),
      "name": this.userNameValue,
      "email": this.emailValue,
      "website": this.websiteValue,
      "comment": this.commentValue
    };
    // send data to our backend
    this.postData(data)
      .then(data => console.log(JSON.stringify(data))) // JSON-string from `response.json()` call
      .catch(error => console.error(error));
  }

  postData(data, url = `https://7e6ex1bf2c.execute-api.us-east-2.amazonaws.com/default/manessingercomment_receiver`) {
    // Default options are marked with *
    return fetch(url, {
      method: "POST",
      mode: "no-cors", // no-cors, cors, *same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      //credentials: "same-origin", // include, same-origin, *omit
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      redirect: "follow", // manual, *follow, error
      referrer: "no-referrer", // no-referrer, *client
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
      .then(response => response.json()); // parses response to JSON
  }

  handleCancel() {
    this.window.open(this.window.location.toString(), '_self').close();
  }

  handleChangeUserName(event) {
    this.userNameValue = event.target.value;
  }

  handleChangeEmail(event) {
    this.emailValue = event.target.value;
  }

  handleChangeWebsite(event) {
    this.websiteValue = event.target.value;
  }

  handleChangeComment(event) {
    this.commentValue = event.target.value;
  }

  render() {
    return (
      <div class="flex-container">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <div class="form-container">
            <label id="username-label" htmlFor="username">Name:</label>
            <input id="username" type="text" value={this.userNameValue} onInput={(event) => this.handleChangeUserName(event)} />

            <label id="email-label" htmlFor="email">Email (opt.):</label>
            <input id="email" type="text" value={this.emailValue} onInput={(event) => this.handleChangeEmail(event)} />

            <label id="website-label" htmlFor="website">Website (opt.):</label>
            <input id="website" type="text" value={this.websiteValue} onInput={(event) => this.handleChangeWebsite(event)} />

            <label id="comment-label" htmlFor="commment">Your comment:</label>
            <textarea id="comment" value={this.commentValue} onInput={(event) => this.handleChangeComment(event)} />

            <input id="cancel" type="button" value="Cancel" onClick={() => this.handleCancel()}/>
            <input id="submit" type="submit" value="Submit" onClick={(event) => this.handleSubmit(event)}/>
          </div>
        </form>
      </div>
    );
  }
}
