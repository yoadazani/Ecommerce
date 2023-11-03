import {ReactNode} from "react";
import {IconType} from "react-icons";

export interface ILinkItem {
    id: number,
    name: string | ReactNode,
    path: string,
    icon: IconType,
}