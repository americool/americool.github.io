import * as React from 'react';
import { connect } from 'react-redux';
import { IRootState } from '../../store';
import { addObject, deleteObject, editObject, setCurrentObject } from '../../store/Page/actions';
import { ILayout, IPageObjectProps } from '../../interfaces';
import TextField from '@material-ui/core/TextField';

import { debounce } from 'lodash';

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
      x: '0',
      y: '0',
      h: '0',
      w: '0'
    }
    this.editPageObject = debounce(this.editPageObject, 200);
  }

  public componentWillReceiveProps(nextProps: IProps){
    const { currentObject, objects } = nextProps;
    if (nextProps.currentObject) {
      const {x, y, h, w} = (objects[currentObject].layout as ILayout);
      this.setState({ x: x.toString(), y: y.toString(), h: h.toString(), w: w.toString()})
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
          <Button onClick={this.addPageObject}>Add Object</Button>
          <Button style={{ display }} onClick={this.deletePageObject}>Delete Object</Button>
          </div>
          <TextField
            label="X"
            value={this.state.x}
            onChange={this.handleChange('x')}
            type="number"
          />
          <TextField
            label="Y"
            value={this.state.y}
            onChange={this.handleChange('y')}
            type="number"
          />
          <TextField
            label="H"
            value={this.state.h}
            onChange={this.handleChange('h')}
            type="number"
          />
          <TextField
            label="W"
            value={this.state.w}
            onChange={this.handleChange('w')}
            type="number"
          />
        </div>
      </div>
    )
  }

  private addPageObject = () => {
    const { x, y , w, h } = this.state;
    const layout = {
        x: parseFloat(x),
        y: parseFloat(y),
        h: parseFloat(h),
        w: parseFloat(w)
      }
      this.props.addObject({layout});
  }

  private editPageObject = () => {
    const { x, y , w, h } = this.state;
    const layout = {
        x: parseFloat(x),
        y: parseFloat(y),
        h: parseFloat(h),
        w: parseFloat(w)
      }
      this.props.editObject(layout);
  }

  private deletePageObject = () => {
    this.props.deleteObject()
  }

  private handleChange = (key: string) => (event: any) =>
  {
    if(this.preventBadValues(key, event.target.value)){
      this.setState({ ...this.state, [key]: event.target.value})
      if(this.props.currentObject) {
        this.editPageObject();
      }
    }
  }

  private handleClick = (id:string) => (event: any) => {
    console.log(id)
    this.props.setCurrentObject((id as string));
  }

  private preventBadValues = (type: string, newValue: string) => {
      if (newValue === '') {
        return true;
      }
      const { x = '0', y = '0', h = '0', w = '0' } = this.state;
      const value = parseFloat(newValue);
      console.log(w)
      if (value < 0) {
        return false;
      }
      switch (type) {
        case 'x':
          return value + parseFloat(w) <= 34 ? true : false;
        case 'y':
          return value + parseFloat(h) <= 44 ? true : false;
        case 'w':
          return value + parseFloat(x) <= 34 ? true : false;
        case 'h':
          return value + parseFloat(y) <= 44 ? true : false;
        default:
          return false;
      }
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
