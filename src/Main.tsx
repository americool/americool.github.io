import * as React from 'react';
import PageContainer from './ProjectDemo/PageObjects/PageContainer'

import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import DesktopMac from '@material-ui/icons/DesktopMac';
import Person from '@material-ui/icons/Person';
import Info from '@material-ui/icons/Info';

interface IState {
  display: DisplayTypes;
}

export enum DisplayTypes {
  Work = 'DisplayTypes/Work',
  About = 'DisplayTypes/About',
  Main = 'DisplayTypes/Main'
}

export default class Main extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props);
    this.state = { display: DisplayTypes.Main}
  }

  public render() {
    const { display } = this.state;
    return (
      <div className="main">
        <BottomNavigation
          value={display}
          onChange={this.handleChange}
          showLabels={true}
        >
          <BottomNavigationAction label="Main"  value={DisplayTypes.Main} icon={<Person />} />
          <BottomNavigationAction label="Work Samples" value={DisplayTypes.Work} icon={<DesktopMac />} />
          <BottomNavigationAction label="About" value={DisplayTypes.About} icon={<Info />} />
        </BottomNavigation>
      <div className="display">
        {this.renderDisplay()}
      </div>
      </div>
    )
  }

  private handleChange = (event: React.FormEvent, value: DisplayTypes) => {
    console.log(event);
    this.setState({ display: value})
  }

  private renderDisplay = () => {
    switch(this.state.display) {
      case DisplayTypes.Main:
        return <div>My Name is Abe And I code stuff I guess</div>;
      case DisplayTypes.Work:
        return (
          <div>
            <strong>Work Part</strong>
            <PageContainer/>
          </div>
        );
      case DisplayTypes.About:
        return (
          <div>
            <p className="App-intro">
              In the mean time you can view my resume <a href="https://resume.creddle.io/resume/i4d7un7f8op">here</a>.
            </p>
          </div>
        );
      default:
        return <div>Something Went Very Wrong</div>
    }
  }
}
