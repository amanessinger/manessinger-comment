import { Component, State } from '@stencil/core';

@Component({
  tag: 'manessinger-comment',
  styleUrl: 'manessinger-comment.scss',
  shadow: true
})
export class ManessingerComment {

  @State() nameValue: string;

  handleSubmit(e) {
    e.preventDefault()
    console.log(this.nameValue);
    // send data to our backend
  }

  handleChange(event) {
    this.nameValue = event.target.value;
  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)}>
        <label>
          Name:
          <input type="text" value={this.nameValue} onInput={(event) => this.handleChange(event)} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
