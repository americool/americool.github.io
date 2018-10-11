import * as React from 'react';

import Button from '@material-ui/core/Button';


export default class FirstComponent extends React.Component<{},{}> {
  public render() {
    return (
      <Button onClick={this.handleClick}>Click Me</Button>
    )
  }

  private handleClick = () => {
    console.log('yo');
  }
}
