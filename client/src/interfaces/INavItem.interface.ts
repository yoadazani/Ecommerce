import {IconType} from "react-icons";
import {ReactNode} from "react";

export interface INavItem {
    icon?: IconType;
    path: string;
    children: ReactNode;
}