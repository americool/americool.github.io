import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from './store';
import { switchTest } from './store/main/actions';

import Button from '@material-ui/core/Button';

interface IProps extends IActions {
  test: boolean;
}

interface IActions {
  switchTest(value: boolean): void;
}

export class FirstComponent extends React.Component<IProps,{}> {
  public render() {
    return (
      <div>
        <Button onClick={this.handleClick}>Click Me</Button>
        <div>Current Value is {this.props.test.toString()}</div>
      </div>
    )
  }

  private handleClick = () => {
    this.props.switchTest(!this.props.test);
  }
}

export const mapStateToProps = (state: IRootState) => {
  const { main: { test } } = state;
  return {
    test
  }
}

const mapDispatchToProps: IActions = {
  switchTest
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstComponent)
