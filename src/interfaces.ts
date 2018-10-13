export interface IPageState {
  objects: IPageObjectHash;
  currentObject?: string;
}

export interface IPageObjectHash {
  [key: string]: IPageObjectProps;
}
export interface IPageObjectProps {
  layout?: ILayout;
  style?: React.CSSProperties;
  id?: string;
  clickHandler?: (event: any) => void;
  selected?: boolean;
}

export interface ILayout {
  x: number,
  y: number,
  h: number,
  w: number
}
