export interface SideBarProps {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
  }
  export interface menuItems {
    to:string,
    icon:string,
    label :string
  }