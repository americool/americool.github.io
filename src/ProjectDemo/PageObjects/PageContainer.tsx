import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../store';
import { addObject, deleteObject, editObject, setCurrentObject } from '../../store/Page/actions';
import { ILayout, IPageObjectProps } from '../../interfaces';
import TextField from '@material-ui/core/TextField';

import Page from './Page';
import PageObject from './PageObject';

import Button from '@material-ui/core/Button';

interface IProps extends IActions {
  objects: {
    [key: string]: IPageObjectProps;
  }
  currentObject: string;
}

interface IState {
  h: string,
  x: string,
  y: string,
  w: string
}

interface IActions {
  addObject(value: IPageObjectProps): void;
  editObject(value: ILayout): void;
  setCurrentObject(id: string): void;
  deleteObject(): void;
}

export class PageContainer extends React.Component<IProps, IState> {
  public constructor(props: IProps) {
    super(props)
    this.state = {
      x: '',
      y: '',
      h: '',
      w: ''
    }
  }

  public render() {
    const { currentObject, objects } = this.props;
    const display = currentObject ? '' : 'none';
    const pageObjects = Object.keys(objects).map((key, index) => {
      objects[key].id = key;
      objects[key].clickHandler = this.handleClick(key);
      objects[key].selected = key === currentObject;
      const props = objects[key];
      return <PageObject key={index}
        {...props} />
    })
    return (
      <div className="page-project-container">
        <div className="page-container">
        <Page>
          {pageObjects}
        </Page>
        </div>
        <div className="page-object-editor">
          <div className="page-object-buttons">
          <Button onClick={this.addOrEditPageObject('add')}>Add Object</Button>
          <Button style={{ display }} onClick={this.addOrEditPageObject('edit')}>Edit Object</Button>
          <Button style={{ display }} onClick={this.deletePageObject}>Delete Object</Button>
          </div>
          <TextField
            label="X"
            value={this.state.x}
            onChange={this.handleChange('x')}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            label="Y"
            value={this.state.y}
            onChange={this.handleChange('y')}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            label="H"
            value={this.state.h}
            onChange={this.handleChange('h')}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
          <TextField
            label="W"
            value={this.state.w}
            onChange={this.handleChange('w')}
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
          />
        </div>
      </div>
    )
  }

  private addOrEditPageObject = (choice:string) => () => {
    const { x, y , w, h } = this.state;
    const layout = {
        x: parseFloat(x),
        y: parseFloat(y),
        h: parseFloat(h),
        w: parseFloat(w)
      }
    if(choice === 'add') {
      this.props.addObject({layout});
    } else {
      this.props.editObject(layout)
    }
  }

  private deletePageObject = () => {
    this.props.deleteObject()
  }

  private handleChange = (key: string) => (event: any) => {
    this.setState({ ...this.state, [key]: event.target.value})
  }

  private handleClick = (id:string) => (event: any) => {
    console.log(id)
    this.props.setCurrentObject((id as string));
  }
}

export const mapStateToProps = (state: IRootState) => {
  const { page: { objects, currentObject } } = state;
  return {
    currentObject,
    objects
  }
}

const mapDispatchToProps: IActions = {
  addObject, deleteObject, editObject, setCurrentObject
}

export default connect(mapStateToProps, mapDispatchToProps)(PageContainer)
