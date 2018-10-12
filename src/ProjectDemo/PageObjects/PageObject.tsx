import * as React from 'react';
import { IPageObjectProps } from './Page';

import './styles.scss';

const PageObject: React.StatelessComponent<IPageObjectProps> = (props) => (
  <div className="page-object" style={props.style} />
);

export default PageObject;
