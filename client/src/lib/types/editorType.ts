export default interface MyEditorConfig {
  readonly?: boolean;
  placeholder?: string;
  height?: string;
  width?: string;
  buttonsXS?: { size?: string };
  buttons?: string[];
  toolbarAdaptive?: boolean;
  toolbar?: boolean;
  toolbarSticky?: boolean;
  toolbarStickyOffset?: number;
  style?: Record<string, Record<string, string>>;
  removeButtons?: string[];
  disablePlugins?: string[];
  spellcheck?: boolean;
};