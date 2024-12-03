import React, {InputHTMLAttributes} from "react";
import {Props} from "@geist-ui/core/esm/input/input-props";
import ModalTitle from "@geist-ui/core/esm/modal/modal-title";
import ModalSubtitle from "@geist-ui/core/esm/modal/modal-subtitle";
import ModalContent from "@geist-ui/core/esm/modal/modal-content";

type NativeAttrs = Omit<React.ButtonHTMLAttributes<any>, keyof Props>;
type ButtonProps = Props & NativeAttrs;

// @geist-ui/core 타입 확장
declare module "@geist-ui/core" {

    declare const Button:React.ForwardRefExoticComponent<Pick<Props & NativeAttrs & React.RefAttributes<HTMLButtonElement>>>
    declare const Input : React.ForwardRefExoticComponent<Pick<Props & NativeAttrs & React.RefAttributes<HTMLInputElement>>>
    declare const ModalAction: React.ForwardRefExoticComponent<Pick<Props & Omit<ButtonProps, keyof Props> & React.RefAttributes<HTMLButtonElement>>>
    declare type ModalComponentType = typeof Modal & {
        Title: typeof ModalTitle;
        Subtitle: typeof ModalSubtitle;
        Content: typeof ModalContent;
        Action: typeof ModalAction;
    };
    declare const Modal:ModalComponentType
    declare const Link: React.ForwardRefExoticComponent<Pick<Props & NativeAttrs & React.RefAttributes<HTMLAnchorElement>>>

}