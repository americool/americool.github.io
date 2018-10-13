import * as React from 'react';
import ReactResizeDetector from 'react-resize-detector';
import { IPageObjectProps } from '../../interfaces';

// import { Column, PageObjectProps, PageProps } from 'interfaces';
import './styles.scss';


interface IPageProps {
  children?: React.ReactElement<IPageObjectProps> | Array<React.ReactElement<IPageObjectProps>>;
  style?: React.CSSProperties;
}

interface IPageState {
  pageWidth?: number;
}

export default class Page extends React.Component<IPageProps, IPageState> {
  constructor(props: IPageProps) {
    super(props);
  }

  public componentWillMount() {
    this.onResize();
  }

  public componentWillReceiveProps(nextProps: IPageProps) {
    this.buildLayout((nextProps.children as React.ReactElement<IPageObjectProps> |
      Array<React.ReactElement<IPageObjectProps>>));
  }

  public buildLayout(children: React.ReactElement<IPageObjectProps> |
    Array<React.ReactElement<IPageObjectProps>>) {
    const { pageWidth = 100 } = this.state;
    const cellSize = pageWidth / 34;
    return React.Children.map(children, (child: React.ReactElement<IPageObjectProps>) => {
      const { layout = { x: 3, y: 3,  h: 3, w: 3 } } = child.props;
      const layoutStyle: React.CSSProperties = {
        height: cellSize * (layout.h as number),
        left: cellSize * (layout.x as number),
        position: 'absolute',
        top: cellSize * (layout.y as number),
        width: cellSize * (layout.w as number)

        //Triangle
        // borderTop: `${cellSize * (layout.h as number)}px solid transparent`,
        // borderLeft: `${cellSize * (layout.w as number)}px solid transparent`,
        // borderBottom: `${cellSize * (layout.h as number)}px solid black`,
        // borderRight: `${cellSize * (layout.w as number)}px solid transparent`,
        // left: cellSize * (layout.x as number),
        // position: 'absolute',
        // top: cellSize * (layout.y as number),
        // width: 0,
        // height: 0
      };
      const style: React.CSSProperties = child.props.style ? { ...child.props.style, ...layoutStyle } : layoutStyle;
      const addedProps: IPageObjectProps = { style };
      return React.cloneElement(child, addedProps);
    });
  }

  public onResize = () => {
    const page = document.getElementById('page');
    const width = page ? parseInt((getComputedStyle(page).width as string), 10) : 0;
    this.setState({ pageWidth: width });
  }

  public render() {
    const { children = [] } = this.props;
    return(
      <div
        id="page"
        className="page"
      >
        <div className="content" style={this.props.style}>
          <ReactResizeDetector handleWidth={true} onResize={this.onResize} />
          {this.buildLayout(children)}
        </div>
      </div>
    );
  }
}
