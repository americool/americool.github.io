import * as React from 'react';
import { IPageObjectProps } from '../../interfaces';


import './styles.scss';

const PageObject: React.StatelessComponent<IPageObjectProps> = (props) => (
  <div className={props.selected ? 'page-object selected' : 'page-object' } style={props.style} onClick={props.clickHandler} />
);

export default PageObject;
