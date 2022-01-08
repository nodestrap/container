// react:
import { default as React, } from 'react'; // base technology of our nodestrap components
import { 
// styles:
createSheet, 
// compositions:
composition, mainComposition, globalDef, imports, 
// layouts:
layout, vars, children, nextSiblings, 
// rules:
rules, variants, rule, noRule, atRoot, } from '@cssfn/cssfn'; // cssfn core
import { 
// hooks:
createUseSheet, } from '@cssfn/react-cssfn'; // cssfn for react
import { createCssVar, } from '@cssfn/css-var'; // Declares & retrieves *css variables* (css custom properties).
import { createCssConfig, 
// utilities:
usesGeneralProps, usesSuffixedProps, overwriteProps, } from '@cssfn/css-config'; // Stores & retrieves configuration using *css custom properties* (css variables)
// nodestrap utilities:
import { breakpoints, isScreenWidthAtLeast, } from '@nodestrap/breakpoints';
// nodestrap components:
import { defaultBlockOrientationRuleOptions, normalizeOrientationRule, usesOrientationRule, usesBorderStroke, usesBorderRadius, expandBorderRadius, usesPadding, expandPadding, 
// styles:
usesBasicLayout, usesBasicVariants, Basic, } from '@nodestrap/basic';
// selectors:
// :where(...) => zero specificity => easy to overwrite
export const selectorIsVisibleChild = ':where(:not(.foreign):not(.overlay))';
export const selectorIsFirstVisibleChild = ':where(:not(.foreign):not(.overlay)):where(:first-child, .first-visible-child)';
export const selectorIsLastVisibleChild = ':where(:not(.foreign):not(.overlay)):where(:last-child , .last-visible-child )';
export const selectorNotfirstVisibleChild = ':where(:not(.foreign):not(.overlay)):where(:not(:first-child):not(.first-visible-child))';
export const selectorNotLastVisibleChild = ':where(:not(.foreign):not(.overlay)):where(:not(:last-child):not(.last-visible-child))';
export const selectorNotSecondVisibleChild = ':where(:not(.foreign):not(.overlay)):where(:not(:nth-child(2)))';
// hooks:
// layouts:
export const defaultOrientationRuleOptions = defaultBlockOrientationRuleOptions;
const [containerRefs, containerDecls] = createCssVar();
/**
 * Uses container.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents container definitions.
 */
export const usesContainer = () => {
    // dependencies:
    // borders:
    const [, borderStrokeRefs] = usesBorderStroke();
    const [, borderRadiusRefs] = usesBorderRadius();
    // spacings:
    const [, paddingRefs] = usesPadding();
    return [
        () => composition([
            vars({
                // borders:
                [containerDecls.borderWidth]: borderStrokeRefs.borderWidth,
                [containerDecls.borderStartStartRadius]: borderRadiusRefs.borderStartStartRadius,
                [containerDecls.borderStartEndRadius]: borderRadiusRefs.borderStartEndRadius,
                [containerDecls.borderEndStartRadius]: borderRadiusRefs.borderEndStartRadius,
                [containerDecls.borderEndEndRadius]: borderRadiusRefs.borderEndEndRadius,
                // spacings:
                [containerDecls.paddingInline]: paddingRefs.paddingInline,
                [containerDecls.paddingBlock]: paddingRefs.paddingBlock,
            }),
        ]),
        containerRefs,
        containerDecls,
    ];
};
export const usesBorderAsContainer = (options) => {
    // options:
    options = normalizeOrientationRule(options, defaultOrientationRuleOptions);
    const [orientationBlockSelector, orientationInlineSelector] = usesOrientationRule(options);
    const { itemsSelector = '*', } = options;
    // dependencies:
    // layouts:
    const [container, containerRefs, containerDecls] = usesContainer();
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    return composition([
        imports([
            // layouts:
            container(),
        ]),
        // layout({
        //     // borders:
        //     overflow : 'hidden', // clip the children at the rounded corners // bad idea, causing child's focus boxShadow to be clipped off
        // }),
        variants([
            !!orientationBlockSelector && rule(orientationBlockSelector, [
                layout({
                    // children:
                    ...children(itemsSelector, [
                        variants([
                            rule(selectorIsFirstVisibleChild, [
                                vars({
                                    /*
                                        if the_current_element is a_child_of_container and also a_separator,
                                        the deleted `containerDecls.borderWidth` in separator must be pointed to container,
                                        so we can calculate the correct inner_borderRadius.
                                        
                                        that's why we set `!important` to the `containerDecls.borderWidth`.
                                    */
                                    [containerDecls.borderWidth]: 'inherit !important',
                                    [containerDecls.borderStartStartRadius]: 'inherit',
                                    [containerDecls.borderStartEndRadius]: 'inherit', // reads parent's prop
                                }),
                                layout({
                                    // borders:
                                    // add rounded corners on top:
                                    [borderRadiusDecls.borderStartStartRadius]: `calc(${containerRefs.borderStartStartRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    [borderRadiusDecls.borderStartEndRadius]: `calc(${containerRefs.borderStartEndRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    /* recursive calculation of borderRadius is not supported yet */
                                }),
                            ]),
                            rule(selectorIsLastVisibleChild, [
                                vars({
                                    /*
                                        if the_current_element is a_child_of_container and also a_separator,
                                        the deleted `containerDecls.borderWidth` in separator must be pointed to container,
                                        so we can calculate the correct inner_borderRadius.
                                        
                                        that's why we set `!important` to the `containerDecls.borderWidth`.
                                    */
                                    [containerDecls.borderWidth]: 'inherit !important',
                                    [containerDecls.borderEndStartRadius]: 'inherit',
                                    [containerDecls.borderEndEndRadius]: 'inherit', // reads parent's prop
                                }),
                                layout({
                                    // borders:
                                    // add rounded corners on bottom:
                                    [borderRadiusDecls.borderEndStartRadius]: `calc(${containerRefs.borderEndStartRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    [borderRadiusDecls.borderEndEndRadius]: `calc(${containerRefs.borderEndEndRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    /* recursive calculation of borderRadius is not supported yet */
                                }),
                            ]),
                        ]),
                    ]),
                }),
            ]),
            !!orientationInlineSelector && rule(orientationInlineSelector, [
                layout({
                    // children:
                    ...children(itemsSelector, [
                        variants([
                            rule(selectorIsFirstVisibleChild, [
                                vars({
                                    /*
                                        if the_current_element is a_child_of_container and also a_separator,
                                        the deleted `containerDecls.borderWidth` in separator must be pointed to container,
                                        so we can calculate the correct inner_borderRadius.
                                        
                                        that's why we set `!important` to the `containerDecls.borderWidth`.
                                    */
                                    [containerDecls.borderWidth]: 'inherit !important',
                                    [containerDecls.borderStartStartRadius]: 'inherit',
                                    [containerDecls.borderEndStartRadius]: 'inherit', // reads parent's prop
                                }),
                                layout({
                                    // borders:
                                    // add rounded corners on left:
                                    [borderRadiusDecls.borderStartStartRadius]: `calc(${containerRefs.borderStartStartRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    [borderRadiusDecls.borderEndStartRadius]: `calc(${containerRefs.borderEndStartRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    /* recursive calculation of borderRadius is not supported yet */
                                }),
                            ]),
                            rule(selectorIsLastVisibleChild, [
                                vars({
                                    /*
                                        if the_current_element is a_child_of_container and also a_separator,
                                        the deleted `containerDecls.borderWidth` in separator must be pointed to container,
                                        so we can calculate the correct inner_borderRadius.
                                        
                                        that's why we set `!important` to the `containerDecls.borderWidth`.
                                    */
                                    [containerDecls.borderWidth]: 'inherit !important',
                                    [containerDecls.borderStartEndRadius]: 'inherit',
                                    [containerDecls.borderEndEndRadius]: 'inherit', // reads parent's prop
                                }),
                                layout({
                                    // borders:
                                    // add rounded corners on right:
                                    [borderRadiusDecls.borderStartEndRadius]: `calc(${containerRefs.borderStartEndRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    [borderRadiusDecls.borderEndEndRadius]: `calc(${containerRefs.borderEndEndRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    /* recursive calculation of borderRadius is not supported yet */
                                }),
                            ]),
                        ]),
                    ]),
                }),
            ]),
            (!orientationBlockSelector && !orientationInlineSelector) && noRule([
                layout({
                    // children:
                    ...children(itemsSelector, [
                        variants([
                            rule(selectorIsVisibleChild, [
                                vars({
                                    /*
                                        if the_current_element is a_child_of_container and also a_separator,
                                        the deleted `containerDecls.borderWidth` in separator must be pointed to container,
                                        so we can calculate the correct inner_borderRadius.
                                        
                                        that's why we set `!important` to the `containerDecls.borderWidth`.
                                    */
                                    [containerDecls.borderWidth]: 'inherit !important',
                                    [containerDecls.borderStartStartRadius]: 'inherit',
                                    [containerDecls.borderStartEndRadius]: 'inherit',
                                    [containerDecls.borderEndStartRadius]: 'inherit',
                                    [containerDecls.borderEndEndRadius]: 'inherit', // reads parent's prop
                                }),
                                layout({
                                    // borders:
                                    // add rounded corners on top:
                                    [borderRadiusDecls.borderStartStartRadius]: `calc(${containerRefs.borderStartStartRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    [borderRadiusDecls.borderStartEndRadius]: `calc(${containerRefs.borderStartEndRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    // add rounded corners on bottom:
                                    [borderRadiusDecls.borderEndStartRadius]: `calc(${containerRefs.borderEndStartRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    [borderRadiusDecls.borderEndEndRadius]: `calc(${containerRefs.borderEndEndRadius} - ${containerRefs.borderWidth} - min(${containerRefs.borderWidth}, 0.5px))`,
                                    /* recursive calculation of borderRadius is not supported yet */
                                }),
                            ]),
                        ]),
                    ]),
                }),
            ]),
        ]),
    ]);
};
const usesBorderAsSeparator = (block, options = {}) => {
    // options:
    const { itemsSelector = '*', swapFirstItem = false, } = options;
    // dependencies:
    // borders:
    const [, , borderRadiusDecls] = usesBorderRadius();
    // layouts:
    const [, , containerDecls] = usesContainer();
    return composition([
        vars({
            /*
                if the_current_element is a container,
                the `containerDecls.borderWidth` will be deleted (not follows `borderWidth`),
                because the_current_element becomes a separator.
                
                use `0px` instead of 0,
                because the value will be calculated in `calc()` expression.
            */
            [containerDecls.borderWidth]: '0px',
        }),
        layout({
            // shadows:
            boxShadow: undefined, // remove shadow
        }),
        // removes unecessary border stroke:
        layout({
            // borders:
            [`border${block ? 'Inline' : 'Block'}Width`]: 0,
            // children:
            // remove double border by removing top-border at the subsequent sibling(s)
            ...nextSiblings(`${itemsSelector}${selectorIsVisibleChild}`, [
                variants([
                    rule((swapFirstItem ? selectorNotSecondVisibleChild : '&'), [
                        layout({
                            // borders:
                            [`border${block ? 'Block' : 'Inline'}StartWidth`]: 0, // remove top-border
                        }),
                    ]),
                ]),
            ]),
        }),
        variants([
            // remove top-border at the first-child, so that it wouldn't collide with the container's top-border
            rule(selectorIsFirstVisibleChild, [
                layout({
                    // borders:
                    [`border${block ? 'Block' : 'Inline'}StartWidth`]: 0, // remove top-border
                }),
            ]),
            // remove bottom-border at the last-child, so that it wouldn't collide with the container's bottom-border
            // *note : `:first-child` => move the first separator to the second child
            rule([selectorIsLastVisibleChild, (swapFirstItem && selectorIsFirstVisibleChild)], [
                layout({
                    // borders:
                    [`border${block ? 'Block' : 'Inline'}EndWidth`]: 0, // remove top-border
                }),
            ]),
        ]),
        // removes unecessary border radius:
        // although the border stroke was/not removed, it *affects* the children's border radius
        // do not remove border radius at the parent's corners (:first-child & :last-child)
        variants([
            rule(selectorNotfirstVisibleChild, [
                (block
                    ?
                        layout({
                            // borders:
                            // remove rounded corners on top:
                            [borderRadiusDecls.borderStartStartRadius]: '0px',
                            [borderRadiusDecls.borderStartEndRadius]: '0px',
                        })
                    :
                        layout({
                            // borders:
                            // remove rounded corners on left:
                            [borderRadiusDecls.borderStartStartRadius]: '0px',
                            [borderRadiusDecls.borderEndStartRadius]: '0px',
                        })),
            ]),
            rule(selectorNotLastVisibleChild, [
                (block
                    ?
                        layout({
                            // borders:
                            // remove rounded corners on bottom:
                            [borderRadiusDecls.borderEndStartRadius]: '0px',
                            [borderRadiusDecls.borderEndEndRadius]: '0px',
                        })
                    :
                        layout({
                            // borders:
                            // remove rounded corners on right:
                            [borderRadiusDecls.borderStartEndRadius]: '0px',
                            [borderRadiusDecls.borderEndEndRadius]: '0px',
                        })),
            ]),
        ]),
    ]);
};
export const usesBorderAsSeparatorBlock = (options = {}) => usesBorderAsSeparator(true, options);
export const usesBorderAsSeparatorInline = (options = {}) => usesBorderAsSeparator(false, options);
// styles:
/**
 * Applies a responsive container layout.
 * @returns A `Style` represents a responsive container layout.
 */
export const usesResponsiveContainerLayout = () => {
    return composition([
        layout({
            // borders:
            ...expandBorderRadius(cssProps),
            // spacings:
            ...expandPadding(cssProps), // expand padding css vars
        }),
    ]);
};
/**
 * Applies a responsive container using grid layout.
 * @returns A `Style` represents a responsive container using grid layout.
 */
export const usesResponsiveContainerGridLayout = () => {
    // dependencies:
    // spacings:
    const [, paddingRefs] = usesPadding();
    return composition([
        layout({
            // layouts:
            display: 'grid',
            // define our logical paddings:
            gridTemplateRows: [[paddingRefs.paddingBlock, 'auto', paddingRefs.paddingBlock]],
            gridTemplateColumns: [[paddingRefs.paddingInline, 'auto', paddingRefs.paddingInline]],
            gridTemplateAreas: [[
                    '"........... blockStart ........."',
                    '"inlineStart  content   inlineEnd"',
                    '"...........  blockEnd  ........."',
                ]],
            // borders:
            ...expandBorderRadius(cssProps),
            // spacings:
            ...expandPadding(cssProps),
            // since we use grid as paddings, so the css paddings are no longer needed:
            paddingInline: undefined,
            paddingBlock: undefined, // turn off physical padding, use logical padding we've set above
        }),
    ]);
};
export const usesContainerChildrenFill = (options = {}) => {
    // options:
    const { fillSelector = '.fill', fillSelfSelector = '.fill-self', } = options;
    // dependencies:
    // spacings:
    const [, containerRefs] = usesContainer();
    const positivePaddingInline = containerRefs.paddingInline;
    const positivePaddingBlock = containerRefs.paddingBlock;
    const negativePaddingInline = `calc(0px - ${positivePaddingInline})`;
    const negativePaddingBlock = `calc(0px - ${positivePaddingBlock})`;
    const fillSelectorAndSelf = [fillSelector, fillSelfSelector];
    return composition([
        imports([
            // borders:
            usesBorderAsContainer({ itemsSelector: fillSelectorAndSelf }), // make a nicely rounded corners
        ]),
        layout({
            // children:
            ...children(fillSelectorAndSelf, [
                layout({
                    // sizes:
                    // span to maximum width including parent's paddings:
                    boxSizing: 'border-box',
                    inlineSize: 'fill-available',
                    fallbacks: {
                        inlineSize: `calc(100% + (${positivePaddingInline} * 2))`,
                    },
                    // spacings:
                    marginInline: negativePaddingInline, // cancel out parent's padding with negative margin
                }),
                variants([
                    rule(selectorIsFirstVisibleChild, [
                        layout({
                            // spacings:
                            marginBlockStart: negativePaddingBlock, // cancel out parent's padding with negative margin
                        }),
                    ]),
                    rule(selectorIsLastVisibleChild, [
                        layout({
                            // spacings:
                            marginBlockEnd: negativePaddingBlock, // cancel out parent's padding with negative margin
                        }),
                    ]),
                ]),
            ]),
            ...children(fillSelfSelector, [
                layout({
                    ...children('*', [
                        layout({
                            // spacings:
                            paddingInline: positivePaddingInline, // restore parent's padding with positive margin
                        }),
                    ]),
                }),
                variants([
                    rule(selectorIsFirstVisibleChild, [
                        layout({
                            // spacings:
                            paddingBlockStart: positivePaddingBlock, // restore parent's padding with positive margin
                        }),
                    ]),
                    rule(selectorIsLastVisibleChild, [
                        layout({
                            // spacings:
                            paddingBlockEnd: positivePaddingBlock, // restore parent's padding with positive margin
                        }),
                    ]),
                ]),
            ]),
        }),
    ]);
};
export const usesContainerChildren = (options = {}) => {
    return composition([
        imports([
            // spacings:
            usesContainerChildrenFill(options), // must be placed at the last
        ]),
    ]);
};
export const usesContainerLayout = () => {
    return composition([
        imports([
            // layouts:
            usesBasicLayout(),
        ]),
        layout({
            // layouts:
            display: 'block',
            // customize:
            ...usesGeneralProps(cssProps), // apply general cssProps
        }),
        imports([
            // layouts:
            usesResponsiveContainerLayout(),
        ]),
    ]);
};
export const usesContainerVariants = () => {
    return composition([
        imports([
            // variants:
            usesBasicVariants(),
        ]),
    ]);
};
export const useContainerSheet = createUseSheet(() => [
    mainComposition([
        imports([
            // layouts:
            usesContainerLayout(),
            // variants:
            usesContainerVariants(),
            // children:
            usesContainerChildren(),
        ]),
    ]),
], /*sheetId :*/ 'dmgepbofol'); // an unique salt for SSR support, ensures the server-side & client-side have the same generated class names
// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    return {
        //#region borders
        borderWidth: 0,
        borderRadius: 0,
        //#endregion borders
        //#region spacings
        paddingInline: '12px',
        paddingBlock: '9px',
        paddingInlineSm: '24px',
        paddingBlockSm: '18px',
        paddingInlineMd: '36px',
        paddingBlockMd: '27px',
        paddingInlineLg: '48px',
        paddingBlockLg: '36px',
        paddingInlineXl: '60px',
        paddingBlockXl: '45px',
        paddingInlineXxl: '72px',
        paddingBlockXxl: '54px',
        //#endregion spacings
    };
}, { prefix: 'con' });
// create a new styleSheet & attach:
createSheet(() => [
    globalDef([
        // the container size is determined by screen width:
        Object.keys(breakpoints)
            .map((breakpointName) => isScreenWidthAtLeast(breakpointName, [
            rules([
                atRoot([
                    layout({
                        // overwrites propName = propName{BreakpointName}:
                        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, breakpointName)),
                    }),
                ]),
            ], { minSpecificityWeight: 2 }),
        ])),
    ]),
])
    .attach();
export function Container(props) {
    // styles:
    const sheet = useContainerSheet();
    // jsx:
    return (React.createElement(Basic, { ...props, 
        // variants:
        mild: props.mild ?? true, 
        // classes:
        mainClass: props.mainClass ?? sheet.main }));
}
export { Container as default };
