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
      "author": this.userNameValue,
      "author_email": this.emailValue,
      "author_url": this.websiteValue,
      "content": this.commentValue
    };
    // send data to our backend
    fetch('https://b70j7je6yl.execute-api.us-east-2.amazonaws.com/default/manessingercomment_receiver',
      {
        method: 'post',
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(data),
      })
      .then(this.status)
      .then(this.jsonify)
      .then((data) => {
        console.log('Request succeeded with JSON response', data);
        if (data.status) {
          this.window.alert('comment submitted with status ' + data.status);
        }
        this.closeWindow();
      }).catch((error) => {
        console.log('Request failed', error);
        this.window.alert('submission failed: ' + error);
        this.closeWindow();
    });
  }

  status(response) {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error(response.statusText))
    }
  }

  jsonify(response) {
    return response.json()
  }

  handleCancel() {
    this.closeWindow();
  }

  closeWindow() {
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
