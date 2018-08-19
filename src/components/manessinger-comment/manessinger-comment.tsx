import { Component, State } from '@stencil/core';

@Component({
  tag: 'manessinger-comment',
  styleUrl: 'manessinger-comment.scss',
  shadow: true
})
export class ManessingerComment {

  @State() userNameValue: string;
  @State() emailValue: string;
  @State() commentValue: string;

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.userNameValue);
    console.log(this.emailValue);
    console.log(this.commentValue);
    // send data to our backend
  }

  handleChangeUserName(event) {
    this.userNameValue = event.target.value;
  }

  handleChangeEmail(event) {
    this.emailValue = event.target.value;
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

            <label id="comment-label" htmlFor="commment">Your comment:</label>
            <textarea id="comment" value={this.commentValue} onInput={(event) => this.handleChangeComment(event)} />

            <input id="cancel" type="button" value="Cancel"/>
            <input id="submit" type="submit" value="Submit" />
          </div>
        </form>
      </div>
    );
  }
}
