import { default as React } from 'react';
import type { PropEx } from '@cssfn/css-types';
import { SelectorCollection } from '@cssfn/cssfn';
import { OrientationRuleOptions, BasicProps } from '@nodestrap/basic';
export declare const selectorIsVisibleChild: SelectorCollection;
export declare const selectorIsFirstVisibleChild: SelectorCollection;
export declare const selectorIsLastVisibleChild: SelectorCollection;
export declare const selectorNotfirstVisibleChild: SelectorCollection;
export declare const selectorNotLastVisibleChild: SelectorCollection;
export declare const selectorNotSecondVisibleChild: SelectorCollection;
export declare const defaultOrientationRuleOptions: OrientationRuleOptions;
export interface ContainerVars {
    borderWidth: any;
    borderStartStartRadius: any;
    borderStartEndRadius: any;
    borderEndStartRadius: any;
    borderEndEndRadius: any;
    paddingInline: any;
    paddingBlock: any;
}
/**
 * Uses container.
 * @returns A `[Factory<Rule>, ReadonlyRefs, ReadonlyDecls]` represents container definitions.
 */
export declare const usesContainer: () => readonly [() => import("@cssfn/cssfn").Rule, import("@cssfn/css-var").ReadonlyRefs<ContainerVars>, import("@cssfn/css-var").ReadonlyDecls<ContainerVars>];
export interface BorderContainerOptions extends OrientationRuleOptions {
    itemsSelector?: SelectorCollection;
}
export declare const usesBorderAsContainer: (options?: BorderContainerOptions | undefined) => import("@cssfn/cssfn").Rule;
export interface BorderSeparatorOptions {
    itemsSelector?: SelectorCollection;
    swapFirstItem?: boolean;
}
export declare const usesBorderAsSeparatorBlock: (options?: BorderSeparatorOptions) => import("@cssfn/cssfn").Rule;
export declare const usesBorderAsSeparatorInline: (options?: BorderSeparatorOptions) => import("@cssfn/cssfn").Rule;
/**
 * Applies a responsive container layout.
 * @returns A `Rule` represents a responsive container layout.
 */
export declare const usesResponsiveContainerLayout: () => import("@cssfn/cssfn").Rule;
/**
 * Applies a responsive container using grid layout.
 * @returns A `Rule` represents a responsive container using grid layout.
 */
export declare const usesResponsiveContainerGridLayout: () => import("@cssfn/cssfn").Rule;
export interface ContainerChildrenOptions {
    fillSelector?: SelectorCollection;
    fillSelfSelector?: SelectorCollection;
}
export declare const usesContainerChildrenFill: (options?: ContainerChildrenOptions) => import("@cssfn/cssfn").Rule;
export declare const usesContainerChildren: (options?: ContainerChildrenOptions) => import("@cssfn/cssfn").Rule;
export declare const usesContainerLayout: () => import("@cssfn/cssfn").Rule;
export declare const usesContainerVariants: () => import("@cssfn/cssfn").Rule;
export declare const useContainerSheet: import("@cssfn/types").Factory<import("jss").Classes<"main">>;
export declare const cssProps: import("@cssfn/css-config").Refs<{
    borderWidth: number;
    borderRadius: number;
    paddingInline: PropEx.Length;
    paddingBlock: PropEx.Length;
    paddingInlineSm: PropEx.Length;
    paddingBlockSm: PropEx.Length;
    paddingInlineMd: PropEx.Length;
    paddingBlockMd: PropEx.Length;
    paddingInlineLg: PropEx.Length;
    paddingBlockLg: PropEx.Length;
    paddingInlineXl: PropEx.Length;
    paddingBlockXl: PropEx.Length;
    paddingInlineXxl: PropEx.Length;
    paddingBlockXxl: PropEx.Length;
}>, cssDecls: import("@cssfn/css-config").Decls<{
    borderWidth: number;
    borderRadius: number;
    paddingInline: PropEx.Length;
    paddingBlock: PropEx.Length;
    paddingInlineSm: PropEx.Length;
    paddingBlockSm: PropEx.Length;
    paddingInlineMd: PropEx.Length;
    paddingBlockMd: PropEx.Length;
    paddingInlineLg: PropEx.Length;
    paddingBlockLg: PropEx.Length;
    paddingInlineXl: PropEx.Length;
    paddingBlockXl: PropEx.Length;
    paddingInlineXxl: PropEx.Length;
    paddingBlockXxl: PropEx.Length;
}>, cssVals: import("@cssfn/css-config").Vals<{
    borderWidth: number;
    borderRadius: number;
    paddingInline: PropEx.Length;
    paddingBlock: PropEx.Length;
    paddingInlineSm: PropEx.Length;
    paddingBlockSm: PropEx.Length;
    paddingInlineMd: PropEx.Length;
    paddingBlockMd: PropEx.Length;
    paddingInlineLg: PropEx.Length;
    paddingBlockLg: PropEx.Length;
    paddingInlineXl: PropEx.Length;
    paddingBlockXl: PropEx.Length;
    paddingInlineXxl: PropEx.Length;
    paddingBlockXxl: PropEx.Length;
}>, cssConfig: import("@cssfn/css-config").CssConfigSettings;
export interface ContainerProps<TElement extends HTMLElement = HTMLElement> extends BasicProps<TElement> {
    children?: React.ReactNode;
}
export declare function Container<TElement extends HTMLElement = HTMLElement>(props: ContainerProps<TElement>): JSX.Element;
export { Container as default };
